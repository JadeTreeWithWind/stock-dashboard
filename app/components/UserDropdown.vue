<template>
  <div class="card flex justify-center">
    <button
      type="button"
      :label="selectedMember ? selectedMember.name : 'Select Member'"
      @click="toggle"
      class="flex cursor-pointer items-center gap-3 rounded-lg text-gray-400 hover:text-yellow-100"
    >
      <Avatar :image="user.image" class="mr-1" shape="circle" />
      <span
        class="hidden items-start text-base font-medium text-gray-400 md:flex"
        >{{ user.name }}</span
      >
    </button>

    <Popover ref="op">
      <div class="flex min-w-fit flex-col gap-4">
        <ul class="m-0 flex list-none flex-col p-0">
          <li class="flex items-center gap-2">
            <Avatar :image="user.image" class="mr-1" shape="circle" />
            <span
              class="flex flex-col items-start text-base font-medium text-gray-400"
            >
              <div>
                {{ user.name }}
              </div>
              <div>
                {{ user.email }}
              </div>
            </span>
          </li>
          <Divider />
          <li class="" v-for="(item, index) in NAV_ITEMS" :key="item.href">
            <NuxtLink
              :to="item.href"
              class="text-md flex items-center gap-2 px-2 py-1 font-medium text-gray-100 transition-colors focus:bg-transparent focus:text-yellow-500"
              :class="isActive(item.href) ? 'text-yellow-500' : ''"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li
            class="hover:bg-emphasis rounded-border hidden cursor-pointer items-center gap-2 px-2 py-1 sm:block"
          >
            <NuxtLink
              to="/signin"
              class="text-md flex items-center gap-1 font-medium text-gray-100 transition-colors focus:text-yellow-500"
            >
              <NuxtImg
                name="log-out"
                alt="log-out"
                class="h-4 w-4"
                src="/icons/IcRoundLogOut.svg"
              />
              登出
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
import Divider from "primevue/divider";
import Popover from "primevue/popover";
import { NAV_ITEMS } from "../consts";

const currentRoute = useRoute();

const isActive = (href: string) => {
  return currentRoute.path === href;
};

const op = ref();
const selectedMember = ref(null);
const user = ref({
  name: "王小明",
  image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
  email: "amy@email.com",
  role: "Owner",
});

const toggle = (event) => {
  op.value.toggle(event);
};

const selectMember = (member) => {
  selectedMember.value = member;
  op.value.hide();
};
</script>
