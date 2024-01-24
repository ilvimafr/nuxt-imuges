<script setup lang="ts">
import { type Image as TImage } from '../../types';
defineProps<{
  images: TImage[],
}>();
</script>

<template>
  <div class="flex flex-wrap items-stretch gap-2 mb-5">
    <div
      v-for="image in images"
      :key="image.id"
      class="
        bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-500 dark:hover:bg-emerald-900
        transition-colors duration-100
        relative overflow-hidden rounded-sm w-full sm:w-auto grow cursor-pointer
      "
      :style="{
        'flex-grow': image.aspect || 1,
      }"
      @click="() => navigateTo(`/image/${image.id}`)"
    >
      <div class="bg-zinc-950 h-full">
        <img
          class="block min-h-[200px] h-auto w-full max-h-[500px] bg-zinc-200 dark:bg-zinc-700 mb-[70px]"
          :srcset="`${$config.public.supabaseStorage}preview_${image.previewID}.jpeg 1.25x`"
          :style="{
            'aspect-ratio': image.aspect || 1,
          }"
          :width="`${Math.round(image.aspect * 300 / 1.25)}`"
        :height="`${300 / 1.25}`"
          alt=""
        />
      </div>

      <div class="py-2 px-3 absolute w-full bottom-0 bg-inherit">
        <h2 class="font-semibold mb-2 text-lg min-w-0 overflow-ellipsis max-w-[100%] whitespace-nowrap overflow-hidden">
          {{ image.name }}
        </h2>
        <div class="flex w-full gap-2 opacity-50 whitespace-nowrap">
          <div class="rounded-sm text-sm">
            <UIcon
              name="i-heroicons-user"
              class="align-[-1px]"
            />
            {{ image.author?.name }}
          </div>
          <div class="rounded-sm text-sm ml-auto">
            <UIcon
              name="i-heroicons-chat-bubble-oval-left-ellipsis"
              class="align-[-2px]"
            />
            50
          </div>
          <div class="rounded-sm text-sm">
            <UIcon
              name="i-heroicons-eye"
              class="align-[-2px]"
            />
            50K
          </div>
        </div>
      </div>

    </div>

    <div class="grow-[10] h-1"></div>

  </div>
</template>