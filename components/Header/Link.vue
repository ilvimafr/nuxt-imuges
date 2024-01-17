<script setup lang="ts">
defineProps({
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
  },
});
</script>

<template>
  <NuxtLink
    :href="href"
    class="transition-colors duration-150 hover:transition-none hover:text-emerald-500"
    activeClass="font-semibold text-emerald-500 cursor-default"
  >
    <UIcon :name="iconName" class="align-[-2px]"/>
    {{ title }}
  </NuxtLink>
</template>
