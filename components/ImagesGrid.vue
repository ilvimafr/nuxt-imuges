<script setup lang="ts">
defineProps<{
  images: [],
}>();
</script>

<template>
  <div class="flex flex-wrap items-start gap-6 mb-10">
    <div
      v-for="image in images"
      class="
        bg-zinc-200 dark:bg-zinc-800 hover:bg-emerald-500 dark:hover:bg-emerald-900 min-w-[300px]
        relative overflow-hidden rounded-lg w-auto grow cursor-pointer
      "
      @click="() => navigateTo(`/image/${image.id}`)"
    >
      <div class="bg-zinc-950">
        <img
          class="block m-auto min-h-[100px] max-h-[400px] bg-zinc-200 dark:bg-zinc-700 mb-[80px] w-full"
          :srcset="`${$config.public.supabaseStorage}preview_${image.previewID}.jpeg 1.5x`"
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
        <div class="flex justify-between w-full opacity-50">
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

    <div class="h-[1px] grow w-10"></div>
    <div class="h-[1px] grow w-10"></div>
    <div class="h-[1px] grow w-10"></div>

  </div>
</template>