<script setup lang="ts">
const model = defineModel();
const props = defineProps<{
  id: string,
  type: string,
  title: string,
  value?: string,
  error?: string,
  disabled?: boolean,
}>();
const inputModel = props.value || model;
</script>

<template>
  <label
    :for="id"
    class="w-full block cursor-pointer font-semibold text-lg"
  >
    {{ title }}:
  </label>

  <input
    class="w-full mt-1 px-3 py-2 rounded-md text-lg"
    :class="{
      'outline outline-4 focus:outline focus:outline-4 outline-rose-600': error,
      'bg-zinc-200 dark:bg-zinc-700': !disabled,
      'text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800': disabled,
    }"
    :type="type"
    :id="id"
    :disabled="disabled"
    v-model="inputModel"
  />

  <div
    v-if="error"
    class="text-rose-600 px-3 py-2"
  >
    {{ error }}
  </div>

</template>