<script setup lang="ts">
import { type Image as TImage } from '../types';
import { type GraphQLError } from 'graphql';
import { onMounted } from 'vue';

const route = useRoute();
const image = ref<TImage | null>(null);

onMounted(() => {
  GqlGetImage({ id: route.params.id })
    .then((result) => {
      image.value = result.getImage;
    })
    .catch((error) => {

    });
});
</script>

<template>
  <div class="flex gap-10">
    <img
      class="rounded-lg w-1/2"
      :src="`${$config.public.supabaseStorage}${image?.id}.jpeg`"
      alt=""
    />
    <div class="w-1/2">
      <h1 class="text-4xl font-semibold">
        {{ image?.name }}
      </h1>
      <p class="text-xl text-zinc-700 dark:text-zinc-300 mt-4">
        {{ image?.description }}
      </p>

      <div class="flex justify-between w-full mt-6 opacity-60">
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-user"
            class="align-[-1px] -ml-1 mr-1"
          />
          <b>{{ image?.author?.name }}</b>
        </div>
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-calendar"
            class="align-[-1px] -ml-1"
          />
          {{ image?.createdAt }}
        </div>
      </div>

      <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-2"/>

    </div>
  </div>

</template>