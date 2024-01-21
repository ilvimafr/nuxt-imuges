<script setup lang="ts">
import { type Image as TImage } from '../../types';
defineProps<{
  images: TImage[],
}>();
</script>

<template>
  <div class="flex flex-wrap items-stretch gap-6 mb-10">
    <div
      v-for="image in images"
      :key="image.id"
      class="
        bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-500 dark:hover:bg-emerald-900
        relative overflow-hidden rounded-lg w-full sm:w-auto grow cursor-pointer
      "
      :style="{
        'flex-grow': image.aspect || 1,
      }"
      @click="() => navigateTo(`/image/${image.id}`)"
    >
      <div class="bg-zinc-950 h-full">
        <img
          class="block min-h-[300px] h-auto w-full max-h-[500px] bg-zinc-200 dark:bg-zinc-700 mb-[75px]"
          :srcset="`${$config.public.supabaseStorage}preview_${image.previewID}.jpeg 1.25x`"
          :style="{
            'aspect-ratio': image.aspect || 1,
          }"
          alt=""
        />
      </div>

      <div class="py-3 px-3 absolute w-full bottom-0 bg-inherit">
        <h2 class="font-semibold mb-2 text-lg min-w-0 overflow-ellipsis max-w-[100%] whitespace-nowrap overflow-hidden">
          {{ image.name }}
        </h2>
        <div class="flex justify-between w-full opacity-50 whitespace-nowrap">
          <div class="rounded-sm text-sm">
            <UIcon
              name="i-heroicons-user"
              class="align-[-1px] -ml-1 mr-1"
            />
            <b>{{ image.author?.name }}</b>
          </div>
          <div class="rounded-sm text-sm">
            <UIcon
              name="i-heroicons-calendar"
              class="align-[-1px] -ml-1"
            />
            {{ image.createdAt }}
          </div>
        </div>
      </div>

    </div>

    <div class="grow-[10] h-1"></div>

  </div>
</template>