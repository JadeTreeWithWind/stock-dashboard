// Finnhub-backed search utilities
// Uses Vite env vars: VITE_FINNHUB_BASE_URL and VITE_FINNHUB_API_KEY
// Provides searchStocks(query?) that returns a minimal mapped list for UI consumption.

import { POPULAR_STOCK_SYMBOLS } from "@/lib/constants";

// Types
export type FinnhubSearchResult = {
  symbol: string; // e.g., "AAPL"
  description: string; // Company name or description
  displaySymbol?: string; // sometimes contains exchange-qualified symbol
  type?: string;
  // internal passthrough for exchange when built from profile2
  __exchange?: string;
};

export type FinnhubSearchResponse = {
  count?: number;
  result: FinnhubSearchResult[];
};

export type StockWithWatchlistStatus = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  isInWatchlist: boolean;
};

const FINNHUB_BASE_URL = (import.meta as any).env?.VITE_FINNHUB_BASE_URL as
  | string
  | undefined;
const FINNHUB_API_KEY = (import.meta as any).env?.VITE_FINNHUB_API_KEY as
  | string
  | undefined;

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

async function fetchJSON<T>(
  url: string,
  revalidateSeconds: number,
): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(url);
  if (cached && cached.expiry > now) {
    return cached.data as T;
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `HTTP ${res.status} ${res.statusText} for ${url} :: ${text}`,
      );
    }
    const data: T = await res.json();
    pruneCache();
    cacheStore.set(url, { expiry: now + revalidateSeconds * 1000, data });
    return data;
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      console.error("fetchJSON timeout:", url);
    } else {
      console.error("fetchJSON error:", e);
    }
    throw e;
  }
}

export async function searchStocks(
  query?: string,
): Promise<StockWithWatchlistStatus[]> {
  try {
    const token = FINNHUB_API_KEY;
    const baseUrl = FINNHUB_BASE_URL || "https://finnhub.io/api/v1";

    if (!token) {
      console.error(
        "Error in stock search:",
        new Error("FINNHUB API key is not configured"),
      );
      return [];
    }

    const trimmed = typeof query === "string" ? query.trim() : "";

    let results: FinnhubSearchResult[] = [];

    if (!trimmed) {
      // Fetch top 10 popular symbols' profiles
      const top = POPULAR_STOCK_SYMBOLS.slice(0, 10);
      const profiles = await Promise.all(
        top.map(async (sym) => {
          try {
            const url = `${baseUrl}/stock/profile2?symbol=${encodeURIComponent(sym)}&token=${token}`;
            const profile = await fetchJSON<any>(url, 3600); // 1h
            return { sym, profile } as { sym: string; profile: any };
          } catch (e) {
            console.error("Error fetching profile2 for", sym, e);
            return { sym, profile: null } as { sym: string; profile: any };
          }
        }),
      );

      results = profiles
        .map(({ sym, profile }) => {
          const symbol = sym.toUpperCase();
          const name: string | undefined =
            profile?.name || profile?.ticker || undefined;
          const exchange: string | undefined = profile?.exchange || undefined;
          if (!name)
            return undefined as unknown as FinnhubSearchResult | undefined;
          const r: FinnhubSearchResult = {
            symbol,
            description: name,
            displaySymbol: symbol,
            type: "Common Stock",
            __exchange: exchange,
          };
          return r;
        })
        .filter((x): x is FinnhubSearchResult => Boolean(x));
    } else {
      const url = `${baseUrl}/search?q=${encodeURIComponent(trimmed)}&token=${token}`;
      const data = await fetchJSON<FinnhubSearchResponse>(url, 1800); // 30m
      results = Array.isArray(data?.result) ? data.result : [];
    }

    const mapped: StockWithWatchlistStatus[] = results
      .map((r) => {
        const upper = (r.symbol || "").toUpperCase();
        const name = r.description || upper;
        const exchangeFromDisplay =
          (r.displaySymbol as string | undefined) || undefined;
        const exchangeFromProfile =
          (r.__exchange as string | undefined) || undefined;
        let exchange = "Unknown";
        if (exchangeFromDisplay && exchangeFromDisplay.includes(":")) {
          exchange = exchangeFromDisplay.split(":")[0];
        } else if (exchangeFromProfile) {
          exchange = exchangeFromProfile;
        } else if (r.type?.toLowerCase().includes("common stock")) {
          // Only default to US for common stocks when exchange is truly unknown
          exchange = "US";
        }
        const type = r.type || "Stock";
        const item: StockWithWatchlistStatus = {
          symbol: upper,
          name,
          exchange,
          type,
          isInWatchlist: false,
        };
        return item;
      })
      .slice(0, 15);

    return mapped;
  } catch (err) {
    console.error("Error in stock search:", err);
    return [];
  }
}
