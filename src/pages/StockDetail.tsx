import Header from "@/components/Header";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";
import { useParams } from "react-router";

const StockDetail = () => {
  const { symbol: rawSymbol } = useParams();
  const symbol = (rawSymbol || "AAPL").toUpperCase();

  const scriptBase =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <main>
      <Header />
      <div className="container min-h-screen py-6">
        {/* 2-column responsive grid: left and right sections */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* Left column */}
          <section className="space-y-6">
            <TradingViewWidget
              key={`${symbol}-symbol-info`}
              scriptUrl={`${scriptBase}symbol-info.js`}
              config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-candle`}
              scriptUrl={`${scriptBase}advanced-chart.js`}
              config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
              className="custom-chart"
            />

            <TradingViewWidget
              key={`${symbol}-baseline`}
              scriptUrl={`${scriptBase}advanced-chart.js`}
              config={BASELINE_WIDGET_CONFIG(symbol)}
              className="custom-chart"
            />
          </section>

          {/* Right column */}
          <section className="space-y-6">
            <TradingViewWidget
              key={`${symbol}-technical-analysis`}
              scriptUrl={`${scriptBase}technical-analysis.js`}
              config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-company-profile`}
              scriptUrl={`${scriptBase}symbol-profile.js`}
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-company-financials`}
              scriptUrl={`${scriptBase}financials.js`}
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default StockDetail;
