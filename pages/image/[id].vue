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
  <div class="flex flex-col md:flex-row gap-10 items-start my-4">
    <img
      v-if="data"
      class="rounded-lg md:w-1/2 md:sticky top-8"
      :src="`${$config.public.supabaseStorage}${data?.id}.jpeg`"
      alt=""
    />
    <div v-else class="md:w-1/2"></div>
    <div class="md:w-1/2">
      <h1 class="text-4xl font-semibold">
        {{ data?.name }}
      </h1>
      <p class="text-xl text-zinc-700 dark:text-zinc-300 mt-4">
        {{ data?.description }}
      </p>

      <div class="flex justify-between w-full mt-6 opacity-60">
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-user"
            class="align-[-1px] -ml-1 mr-1"
          />
          <b>{{ data?.author?.name }}</b>
        </div>
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-calendar"
            class="align-[-1px] -ml-1"
          />
          {{ data?.createdAt }}
        </div>
      </div>

      <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-2"/>

    </div>
  </div>

</template>