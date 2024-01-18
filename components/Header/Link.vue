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
  },
});

const activeClass = `
  relative font-semibold text-emerald-500 cursor-default
  after:absolute after:w-[10px] after:h-[5px] after:left-[55%] after:-bottom-2
  after:-translate-x-1/2 after:bg-emerald-500 after:rounded-lg
`;
const isActive = computed(() => {
  const path = useRoute().path;
  if (props.href === '/') {
    return path === props.href;
  }
  return path.startsWith(props.href);
});
</script>

<template>
  <NuxtLink
    :href="href"
    class="transition-colors duration-150 hover:transition-none hover:text-emerald-500"
    :class="{ [activeClass]: isActive }"
  >
    <UIcon :name="iconName" class="align-[-2px]"/>
    {{ title }}
  </NuxtLink>
</template>
