<template>
  <header class="header sticky top-0">
    <div class="header-wrapper container">
      <NuxtLink to="/">
        <img
          src="/icons/logo.svg"
          alt="logo"
          width="140"
          height="32"
          class="h-8 w-auto cursor-pointer"
        />
      </NuxtLink>
      <nav class="hidden sm:block">
        <NavItems />
      </nav>
      <UserDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
import NavItems from "./NavItems.vue";
import UserDropdown from "./UserDropdown.vue";
</script>

<style scoped></style>
