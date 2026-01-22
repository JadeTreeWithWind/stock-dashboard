import Header from "@/components/Header";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  TRADINGVIEW_SCRIPT_URL_BASE,
  DEFAULT_STOCK_SYMBOL,
} from "@/lib/constants";
import { useParams } from "react-router";

/**
 * 股票詳情頁組件
 * 展示特定股票的詳細資訊、圖表與財務數據
 */
const StockDetail = () => {
  const { symbol: rawSymbol } = useParams();
  const symbol = (rawSymbol || DEFAULT_STOCK_SYMBOL).toUpperCase();

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
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}symbol-info.js`}
              config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-candle`}
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}advanced-chart.js`}
              config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
              className="custom-chart"
            />

            <TradingViewWidget
              key={`${symbol}-baseline`}
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}advanced-chart.js`}
              config={BASELINE_WIDGET_CONFIG(symbol)}
              className="custom-chart"
            />
          </section>

          {/* Right column */}
          <section className="space-y-6">
            <TradingViewWidget
              key={`${symbol}-technical-analysis`}
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}technical-analysis.js`}
              config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-company-profile`}
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}symbol-profile.js`}
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            />

            <TradingViewWidget
              key={`${symbol}-company-financials`}
              scriptUrl={`${TRADINGVIEW_SCRIPT_URL_BASE}financials.js`}
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default StockDetail;
