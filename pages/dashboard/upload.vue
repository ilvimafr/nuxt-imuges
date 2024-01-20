<script setup lang="ts">
import { type GraphQLError } from 'graphql';
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'dashboard',
});
const isLoading = ref(false);
const preview = ref('');
const name = ref('');
const description = ref('');
const uploadErrorMessage = ref('');

function fileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files;
  if (file) {
    const fileReader = new FileReader();
    fileReader.onloadend = (e: ProgressEvent) => {
      name.value = file[0].name;
      preview.value = fileReader.result as string;
    };
    fileReader.readAsDataURL(file[0]);
  }
}

function goBack() {
  preview.value = '';
  isLoading.value = false;
}

function load(e: Event) {
  if (!preview.value || isLoading.value) {
    return;
  }
  isLoading.value = true;

  GqlCreateImage({
    name: name.value,
    description: description.value,
    data: preview.value,
  })
    .then((result) => {
      if (result.createImage?.id) {
        navigateTo(`/image/${result.createImage.id}`);
      }
    })
    .catch((error) => {
      uploadErrorMessage.value = (error.gqlErrors[0] as GraphQLError).message;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <div
    v-if="!preview"
    class="
      relative w-full h-full flex flex-col justify-center items-center rounded-md transition-colors duration-300 text-3xl
      bg-zinc-200 hover:bg-teal-200 dark:bg-zinc-800 dark:hover:bg-teal-950 text-zinc-600 dark:text-zinc-400 
      outline-dashed outline-4 outline-zinc-400 dark:outline-zinc-600 -outline-offset-[30px] cursor-pointer
    "
  >
    <UIcon
      name="i-heroicons-photo"
      class="text-[100px] mb-10 opacity-30"
    />
    Drag and drop or click here
    <input
      type="file"
      @change="fileChange"
      class="appearance-none opacity-0 absolute w-full h-full cursor-pointer"
      accept="image/png, image/jpeg, image/avif, image/webp"
    />
  </div>

  <div
    class="flex flex-col md:flex-row gap-6 max-w-full"
    v-if="preview"
  >
    <img
      :src="preview"
      alt=""
      class="w-full rounded-md block min-w-0 object-contain"
    />

    <form
      @submit.prevent="load"
      class="w-3/6"
    >
      <UButton
        color="gray"
        class="text-md"
        icon="i-heroicons-arrow-left"
        label="Back"
        @click="goBack"
      />

      <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-2"/>

      <label
        for="upload-name"
        class="w-full block cursor-pointer font-semibold text-lg"
      >
        Name
      </label>
      <UInput
        id="upload-name"
        size="xl"
        class="w-full mt-1 text-xl"
        v-model="name"
      />

      <label
        for="upload-description"
        class="w-full block mt-4 cursor-pointer font-semibold text-lg"
      >
        Description
      </label>
      <UTextarea
        id="upload-description"
        size="xl"
        class="w-full mt-1 text-xl"
        v-model="description"
      />

      <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-2"/>

      <UButton
        color="emerald"
        type="submit"
        class="text-lg"
        icon="i-heroicons-arrow-down-tray"
        :loading="isLoading"
        :label="isLoading ? 'Loading...' : 'Load'"
      />

      <div v-if="uploadErrorMessage" class="py-3 text-lg text-rose-600">
        {{ uploadErrorMessage }}
      </div>

    </form>
  </div>

</template>