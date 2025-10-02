<script setup lang="ts">
import { computed } from "vue";
import { useTradingViewWidget } from "@/composables/useTradingViewWidget";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const props = withDefaults(defineProps<TradingViewWidgetProps>(), {
  height: 600,
  className: "",
});

const containerRef = useTradingViewWidget(
  props.scriptUrl,
  props.config,
  props.height,
);
</script>

<template>
  <div class="w-full">
    <h3 v-if="title" class="mb-5 text-2xl font-semibold text-gray-100">
      {{ title }}
    </h3>
    <div
      class="tradingview-widget-container"
      :class="props.className"
      ref="containerRef"
    >
      <div
        class="tradingview-widget-container__widget"
        :style="{ height: `${height}px`, width: '100%' }"
      />
    </div>
  </div>
</template>
