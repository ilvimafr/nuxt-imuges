<script setup lang="ts">
import type appConfig from '~/app.config';

const images = reactive([]);

onMounted(() => {
  GqlGetNewestImages({ start: 0, count: 20 })
    .then((result) => {
      console.log(result.getNewestImages);
      images.push(...result.getNewestImages);
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

  <div class="w-full h-full bg-rose-900">

  </div>

  <div class="flex flex-wrap gap-5 mb-10">
    <div
      v-for="image in images"
      class="
        bg-zinc-800 hover:bg-emerald-900
        overflow-hidden rounded-lg min-w-[100px] max-w-[400px] w-full cursor-pointer
      "
      @click="() => navigateTo(`/image/${image.id}`)"
    >
      <img
        class="block w-full bg-zinc-700"
        :src="`${$config.public.supabaseStorage}preview_${image.previewID}.jpeg`"
        :style="{
          'aspect-ratio': image.aspect || 1,
        }"
        alt=""
      />

      <div class="py-3 px-3">
        <h2 class="font-semibold mb-2 text-lg">{{ image.name }}</h2>
        <div class="flex justify-between w-full">
          <div class="text-zinc-400 rounded-sm text-sm">
            <UIcon
              name="i-heroicons-user"
              class="align-[-1px] -ml-1 mr-1"
            />
            <b>{{ image.author?.name }}</b>
          </div>
          <div class="text-zinc-400 rounded-sm text-sm">
            <UIcon
              name="i-heroicons-calendar"
              class="align-[-1px] -ml-1"
            />
            {{ image.createdAt }}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>