// Finnhub-backed search utilities via Supabase Edge Function proxy.
// Provides searchStocks(query?) that returns a minimal mapped list for UI consumption.

import { CACHE_REVALIDATE_DURATION, POPULAR_STOCK_SYMBOLS } from "@/lib/constants";

// Types
export type FinnhubSearchResult = {
  symbol: string;
  description: string;
  displaySymbol?: string;
  type?: string;
  /** Internal passthrough for exchange when built from profile2 */
  __exchange?: string;
};

export type FinnhubSearchResponse = {
  count?: number;
  result: FinnhubSearchResult[];
};

/** Minimal stock profile returned by /stock/profile2 */
type FinnhubProfile = {
  name?: string;
  ticker?: string;
  exchange?: string;
};

export type StockWithWatchlistStatus = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  isInWatchlist: boolean;
};

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type CacheEntry<T = unknown> = { expiry: number; data: T };
const MAX_CACHE_SIZE = 100;

const cacheStore = new Map<string, CacheEntry>();

function pruneCache() {
  if (cacheStore.size > MAX_CACHE_SIZE) {
    const entries = Array.from(cacheStore.entries());
    entries.sort((a, b) => a[1].expiry - b[1].expiry);
    const toDelete = entries.slice(0, Math.floor(MAX_CACHE_SIZE / 2));
    toDelete.forEach(([key]) => cacheStore.delete(key));
  }
}

/**
 * Fetch JSON with proxy and caching
 * @param apiPath The API path to call
 * @param params Query parameters
 * @param revalidateSeconds Cache duration in seconds
 * @returns Parsed JSON response
 */
async function fetchProxyJSON<T>(
  apiPath: string,
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<T> {
  const allParams = { ...params, apiPath: apiPath };

  const url = `${SUPABASE_FUNCTION_URL}?${new URLSearchParams(allParams).toString()}`;

  const now = Date.now();
  const cached = cacheStore.get(url);
  if (cached && cached.expiry > now) {
    return cached.data as T;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 401) {
        throw new Error(
          `Supabase Auth Error: Function denied access. Check your Anon Key. :: ${text}`,
        );
      }
      throw new Error(
        `HTTP ${res.status} ${res.statusText} for ${url} :: ${text}`,
      );
    }

    const data: T = await res.json();
    pruneCache();
    cacheStore.set(url, {
      expiry: Date.now() + revalidateSeconds * 1000,
      data,
    });
    return data;
  } catch (e) {
    throw e;
  }
}

/**
 * Search for stocks or get popular ones
 * @param query Search query string
 * @returns List of stocks with watchlist status
 */
export async function searchStocks(
  query?: string,
): Promise<StockWithWatchlistStatus[]> {
  try {
    const trimmed = typeof query === "string" ? query.trim() : "";

    let results: FinnhubSearchResult[] = [];

    if (!trimmed) {
      // Fetch top 10 popular symbols' profiles
      const top = POPULAR_STOCK_SYMBOLS.slice(0, 10);
      const profiles = await Promise.all(
        top.map(async (sym) => {
          try {
            const profile = await fetchProxyJSON<FinnhubProfile>(
              "/stock/profile2",
              { symbol: sym },
              CACHE_REVALIDATE_DURATION * 2, // profiles change rarely
            );
            return { sym, profile };
          } catch (e) {
            console.error("Error fetching profile2 for", sym, e);
            return { sym, profile: null as FinnhubProfile | null };
          }
        }),
      );

      results = profiles
        .map(({ sym, profile }) => {
          const symbol = sym.toUpperCase();
          const name = profile?.name ?? profile?.ticker;
          if (!name) return null;
          const r: FinnhubSearchResult = {
            symbol,
            description: name,
            displaySymbol: symbol,
            type: "Common Stock",
            __exchange: profile?.exchange,
          };
          return r;
        })
        .filter((x): x is FinnhubSearchResult => x !== null);
    } else {
      const params = { q: trimmed };
      const data = await fetchProxyJSON<FinnhubSearchResponse>(
        "/search",
        params,
        CACHE_REVALIDATE_DURATION,
      );
      results = Array.isArray(data?.result) ? data.result : [];
    }

    const mapped: StockWithWatchlistStatus[] = results
      .map((r) => {
        const symbol = (r.symbol || "").toUpperCase();
        const name = r.description || symbol;
        let exchange = "Unknown";
        if (r.displaySymbol?.includes(":")) {
          exchange = r.displaySymbol.split(":")[0];
        } else if (r.__exchange) {
          exchange = r.__exchange;
        } else if (r.type?.toLowerCase().includes("common stock")) {
          // 無法從 API 取得交易所時，Common Stock 預設為美股
          exchange = "US";
        }
        return {
          symbol,
          name,
          exchange,
          type: r.type ?? "Stock",
          isInWatchlist: false,
        };
      })
      .slice(0, 15);

    return mapped;
  } catch (err) {
    console.error("Error in stock search:", err);
    return [];
  }
}
