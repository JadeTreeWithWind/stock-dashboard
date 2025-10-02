<script setup lang="ts">
import TradingViewWidget from "../components/TradingViewWidget.vue";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/consts";

const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";
</script>

<template>
  <div class="home-wrapper flex min-h-screen">
    <section class="home-section grid w-full gap-8">
      <div class="md:col-span-1 xl:col-span-1">
        <TradingViewWidget
          title="市場概覽"
          :script-url="`${scriptUrl}market-overview.js`"
          :config="MARKET_OVERVIEW_WIDGET_CONFIG"
          class-name="custom-chart"
          :height="600"
        />
      </div>
      <div class="md:col-span-1 xl:col-span-2">
        <TradingViewWidget
          title="股票熱圖"
          :script-url="`${scriptUrl}stock-heatmap.js`"
          :config="HEATMAP_WIDGET_CONFIG"
          :height="600"
        />
      </div>
    </section>

    <section class="home-section grid w-full gap-8">
      <div class="h-full md:col-span-1 xl:col-span-1">
        <TradingViewWidget
          :script-url="`${scriptUrl}timeline.js`"
          :config="TOP_STORIES_WIDGET_CONFIG"
          :height="600"
        />
      </div>
      <div class="h-full md:col-span-1 xl:col-span-2">
        <TradingViewWidget
          :script-url="`${scriptUrl}market-quotes.js`"
          :config="MARKET_DATA_WIDGET_CONFIG"
          :height="600"
        />
      </div>
    </section>
  </div>
</template>
