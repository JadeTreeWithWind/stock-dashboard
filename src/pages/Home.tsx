import Header from "@/components/Header";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  return (
    <main>
      <Header />

      <div className="home-wrapper container flex min-h-screen py-6">
        <section className="home-section grid w-full gap-8">
          <div className="md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="股市行情"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
          <div className="md-col-span xl:col-span-2">
            <TradingViewWidget
              title="股票熱圖"
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>
        <section className="home-section grid w-full gap-8">
          <div className="h-full md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="即時新聞"
              scriptUrl={`${scriptUrl}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              height={600}
            />
          </div>
          <div className="h-full md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="股票行情"
              scriptUrl={`${scriptUrl}market-quotes.js`}
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
