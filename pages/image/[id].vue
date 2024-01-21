<script setup lang="ts">
const route = useRoute();

const { data, pending } = useAsyncGql('GetImage', {
  id: route.params.id as string,
}, { lazy: true });
</script>

<template>
  <div class="flex gap-10 items-start">
    <img
      v-if="data?.getImage"
      class="rounded-lg w-1/2 sticky top-8"
      :src="`${$config.public.supabaseStorage}${data?.getImage?.id}.jpeg`"
      alt=""
    />
    <div v-else class="w-1/2"></div>
    <div class="w-1/2">
      <h1 class="text-4xl font-semibold">
        {{ data?.getImage?.name }}
      </h1>
      <p class="text-xl text-zinc-700 dark:text-zinc-300 mt-4">
        {{ data?.getImage?.description }}
      </p>

      <div class="flex justify-between w-full mt-6 opacity-60">
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-user"
            class="align-[-1px] -ml-1 mr-1"
          />
          <b>{{ data?.getImage?.author?.name }}</b>
        </div>
        <div class="rounded-sm text-md">
          <UIcon
            name="i-heroicons-calendar"
            class="align-[-1px] -ml-1"
          />
          {{ data?.getImage?.createdAt }}
        </div>
      </div>

      <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-2"/>

    </div>
  </div>

</template>