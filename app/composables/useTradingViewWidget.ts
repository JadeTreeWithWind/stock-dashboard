import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600,
) => {
  const containerRef = ref<HTMLDivElement | null>(null);
  let isLoaded = false;

  const loadWidget = () => {
    if (!containerRef.value || isLoaded) return;

    containerRef.value.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRef.value.appendChild(script);
    isLoaded = true;
  };

  const cleanup = () => {
    if (containerRef.value) {
      containerRef.value.innerHTML = "";
      isLoaded = false;
    }
  };

  onMounted(() => {
    loadWidget();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  // 監聽 props 變化時重新載入
  watch([() => scriptUrl, () => config, () => height], () => {
    cleanup();
    loadWidget();
  });

  return containerRef;
};
