<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'dashboard',
});
const user = useSupabaseUser();
</script>

<template>

  <div class="flex gap-8 items-stretch">
    <img :src="user?.user_metadata?.avatar_url" class="rounded-lg h-full w-32 min-w-32 block mb-10"/>

    <div class="grow">
      <label for="settings-email" class="w-full block cursor-pointer font-semibold text-lg focus:outline-2">
        Your Email:
      </label>
      <input
        type="text"
        id="settings-email"
        class="w-full mt-1 px-3 py-2 rounded-md bg-zinc-800 text-stone-400"
        :value="user?.email"
        disabled
      />

      <label for="settings-provider" class="w-full block mt-3 cursor-pointer font-semibold  text-lg focus:outline-2">
        Provider:
      </label>
      <input
        type="text"
        id="settings-provider"
        class="w-full mt-1 px-3 py-2 rounded-md bg-zinc-800 text-stone-400"
        :value="user?.app_metadata?.provider"
        disabled
      />
    </div>
  </div>

  <hr class="my-8 border-zinc-800 border-2"/>

  <label for="settings-name" class="w-full block cursor-pointer font-semibold text-lg focus:outline-2 focus:outline-emerald-600">
    Your Name:
  </label>
  <input
    type="text"
    id="settings-name"
    class="w-full mt-1 px-3 py-2 rounded-md bg-zinc-700 text-lg"
    value="Name"
  />

  <hr class="mt-10 mb-6 border-zinc-800 border-2"/>

  <button class="bg-emerald-600 px-4 py-1 text-lg rounded-md">Save</button>

</template>