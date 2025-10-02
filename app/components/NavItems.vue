<template>
  <ul class="flex flex-col gap-3 p-2 font-medium sm:flex-row sm:gap-10">
    <li v-for="item in NAV_ITEMS" :key="item.href">
      <NuxtLink
        :to="item.href"
        class="nav-link transition-colors hover:text-yellow-500"
        :class="isActive(item.href) ? 'text-gray-100' : ''"
        >{{ item.label }}</NuxtLink
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from "../consts";

const currentRoute = useRoute();

const isActive = (href: string) => {
  return currentRoute.path === href;
};
</script>

<style scoped></style>
