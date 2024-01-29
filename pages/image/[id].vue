<script setup lang="ts">
const route = useRoute();

const { data } = useAsyncGql('GetImage', {
  id: route.params.id as string,
}, {
  lazy: true,
  transform: (result) => {
    return result?.getImage;
  },
});
</script>

<template>
  <div class="grid md:grid-cols-2 gap-10 items-start my-4">

    <!-- Image -->
    <img
      v-if="data"
      class="md:sticky w-full top-8 rounded-lg bg-zinc-800"
      :src="`${$config.public.supabaseStorage}${data?.id}.jpeg`"
      :style="{
        'aspect-ratio': data.aspect || 1,
      }"
      alt=""
    />
    <div
      v-else
      class="bg-zinc-800 w-full pb-[100%] rounded-lg"
    ></div>

    <!-- Description -->
    <div>
      <h1 v-if="data" class="text-4xl font-semibold">
        {{ data?.name }}
      </h1>
      <div v-else class="width-1/2 h-10 bg-zinc-800 rounded-lg"></div>

      <p v-if="data" class="text-xl text-zinc-700 dark:text-zinc-300 mt-4">
        {{ data?.description }}
      </p>
      <div v-else class="width-1/2 h-40 bg-zinc-800 rounded-lg mt-4"></div>

      <div class="flex justify-between w-full mt-6">
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-user"
            class="align-[-1px] -ml-1 mr-1"
          />
          <b>{{ data?.author?.name }}</b>
        </div>
        <div class="rounded-sm text-md">
          {{ data?.createdAt }}
        </div>
      </div>

      <hr class="my-3 border-zinc-200 dark:border-zinc-800 border-1"/>

      <!-- Comments -->
      <h3 class="text-center text-lg font-semibold">Comments (5)</h3>
      <hr class="my-3 border-zinc-200 dark:border-zinc-800 border-1"/>

      <Comments />

    </div>


  </div>
</template>