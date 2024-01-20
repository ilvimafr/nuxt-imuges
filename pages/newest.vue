<script setup lang="ts">
import type appConfig from '~/app.config';

const images = reactive([]);
const isLoading = ref(true); 

onMounted(() => {
  GqlGetNewestImages({ start: 0, count: 20 })
    .then((result) => {
      images.push(...result.getNewestImages);
      isLoading.value = false;
    })
    .catch(() => {
  
    });
});
</script>

<template>
  <h1 class="font-semibold text-4xl mt-4 mb-10 text-center">
    <UIcon
      name="i-heroicons-star"
      class="align-[-4px]"
    />
    Newest Images
  </h1>

  <div
    v-if="isLoading"
    class="
      w-full h-60 font-semibold text-4xl text-center flex flex-col items-center justify-center
      text-zinc-200 opacity-20
    "
  >
    <UIcon
      name="i-heroicons-arrow-path"
      class="mb-4 text-8xl animate-spin"
    />
    Loading
  </div>

  <ImagesGrid :images="images" />

</template>