<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  }
});

const inactiveClass = `
  hover:bg-zinc-200 text-zinc-600 hover:text-zinc-800
  dark:hover:bg-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100
`;
const activeClass = `
  bg-emerald-600 font-semibold text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]
`;
const isActive = computed(() => useRoute().path === props.href);
</script>

<template>
  <NuxtLink
    :href="href"
    class="
      px-3 py-2 mx-2 rounded-lg 
      transition-colors duration-150 hover:transition-none
    "
    :class="{
      [inactiveClass]: !isActive,
      [activeClass]: isActive,
    }"
  >
    <UIcon :name="iconName" class="align-[-3px] mr-1"/>
    {{ title }}
  </NuxtLink>
</template>