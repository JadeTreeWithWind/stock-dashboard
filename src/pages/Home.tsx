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
    <main>
      <Header />

      <div className="home-wrapper container flex min-h-screen py-6">
        <section className="home-section grid w-full gap-8">
          <div className="md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="股市趨勢"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
          <div className="md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="股票熱圖"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>
        <section className="home-section grid w-full gap-8">
          <div className="h-full md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="股市新聞"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              height={600}
            />
          </div>
          <div className="h-full md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="股票行情"
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>
      </div>
    </main>
  );
};
export default Home;
