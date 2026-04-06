// Supabase Edge Function: finnhub-proxy
// Proxies requests to Finnhub API, keeping the API key server-side.
//
// Query params:
//   apiPath  - Finnhub API path, e.g. /stock/profile2 or /search
//   ...rest  - forwarded to Finnhub as-is (e.g. symbol=AAPL, q=apple)
//
// Required secret (set via `supabase secrets set FINNHUB_API_KEY=...`):
//   FINNHUB_API_KEY

const FINNHUB_BASE = "https://finnhub.io/api/v1";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const apiKey = Deno.env.get("FINNHUB_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "FINNHUB_API_KEY secret is not set" }),
        { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    const { searchParams } = new URL(req.url);
    const apiPath = searchParams.get("apiPath");

    if (!apiPath) {
      return new Response(
        JSON.stringify({ error: "Missing required query param: apiPath" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    // Forward all params except apiPath to Finnhub, and append the token
    const forwardParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key !== "apiPath") {
        forwardParams.set(key, value);
      }
    }
    forwardParams.set("token", apiKey);

    const finnhubUrl = `${FINNHUB_BASE}${apiPath}?${forwardParams.toString()}`;

    const finnhubRes = await fetch(finnhubUrl, {
      headers: { "X-Finnhub-Token": apiKey },
    });

    const data = await finnhubRes.json();

    return new Response(JSON.stringify(data), {
      status: finnhubRes.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("finnhub-proxy error:", err);
    return new Response(
      JSON.stringify({ error: "Internal proxy error", detail: String(err) }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }
});
