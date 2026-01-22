import Header from "@/components/Header";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  TRADINGVIEW_SCRIPT_URL_BASE,
} from "@/lib/constants";

/**
 * 首頁組件
 * 展示市場概覽、熱圖、新聞與行情
 */
const Home = () => {
  return (
    <main className="relative min-h-screen">
      <Header />

      <div className="container flex flex-col gap-10 py-10 pb-20">
        {/* Hero Section */}
        <section className="animate-fade-in-up flex w-full flex-col gap-4 py-4 md:py-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              掌握全球 <span className="text-gradient-gold">市場脈動</span>
            </h1>
            <p className="max-w-2xl text-lg font-medium text-gray-400 md:text-xl">
              即時追蹤股票行情、熱門新聞與深度分析，助您與市場零距離，精準掌握每一個投資機會。
            </p>
          </div>
        </section>

        <section className="home-section grid w-full gap-8">
          <div className="animate-fade-in-up delay-100 md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="股市趨勢"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              className="glass-card min-h-[600px] overflow-hidden rounded-xl p-1"
              height={600}
            />
          </div>
          <div className="animate-fade-in-up delay-200 md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="股票熱圖"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              className="glass-card min-h-[600px] overflow-hidden rounded-xl p-1"
              height={600}
            />
          </div>
        </section>

        <section className="home-section grid w-full gap-8">
          <div className="animate-fade-in-up h-full delay-200 md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="股市新聞"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              className="glass-card min-h-[600px] overflow-hidden rounded-xl p-1"
              height={600}
            />
          </div>
          <div className="animate-fade-in-up h-full delay-300 md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="股票行情"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              className="glass-card min-h-[600px] overflow-hidden rounded-xl p-1"
              height={600}
            />
          </div>
        </section>
      </div>
    </main>
  );
};
export default Home;
