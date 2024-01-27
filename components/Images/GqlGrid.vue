<script setup lang="ts">
const nuxt = useNuxtApp();
const props = defineProps<{
  operation: GqlOps,
  name: string,
  count: number,
  variables?: {[key: string]: unknown}
}>();

// Request images if there no images loaded, otherwise get previous images
const { data, pending, error } = useAsyncGql(props.operation, {
  start: 0,
  count: props.count,
  ...props.variables,
}, {
  lazy: true,
  getCachedData: (key): Record<string, any> => {
    return nuxt.payload.data[key];
  }
});

const loadingElement = ref<HTMLElement | null>(null);
const isLoading = ref(!data.value);
const hasImagesToLoad = ref(true);

// Lazy loading observer
let observer: IntersectionObserver | null = null;
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    // If visible & loading not started
    if (entries[0].isIntersecting && !isLoading.value) {
      const images = data.value![props.name];
      isLoading.value = true;

      const variables = {
        start: images.length,
        count: props.count,
        ...props.variables,
      };
      useAsyncGql(props.operation, variables).then((result) => {
        const newImages = result.data.value![props.name];
        isLoading.value = false;
        hasImagesToLoad.value = newImages.length >= props.count;
        images.push(...newImages);
      });
    }
  });
  observer.observe(loadingElement.value!);
});
onBeforeUnmount(() => {
  if (loadingElement.value) {
    observer?.unobserve(loadingElement.value);
  }
});
</script>

<template>
  <div v-if="error" class="w-full text-3xl text-rose-500">
    {{ error }}
  </div>

  <ImagesGrid :images="data?.[name] || []" />

  <div
    ref="loadingElement"
    v-if="hasImagesToLoad"
    class="
      w-full py-6 pb-8 font-semibold text-4xl text-center flex flex-col items-center justify-center
      text-zinc-400 dark:text-zinc-600
    "
  >
    <UIcon
      name="i-heroicons-arrow-path"
      class="mb-4 text-6xl animate-spin"
    />
    Loading
  </div>

</template>