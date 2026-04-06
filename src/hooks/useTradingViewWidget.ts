import { useEffect, useRef } from "react";

/**
 * TradingView Widget Hook
 * 負責動態載入 TradingView 的 script 並掛載到 DOM
 *
 * @param scriptUrl - TradingView script URL
 * @param config - Widget 設定參數
 * @param height - Widget 高度 (預設 600)
 */
const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // 在 cleanup 中直接讀取 ref.current 是安全的：
      // React 在 cleanup 執行完成後才會將 ref 設為 null
      const container = containerRef.current;
      if (container) {
        container.innerHTML = "";
        delete container.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};
export default useTradingViewWidget;
