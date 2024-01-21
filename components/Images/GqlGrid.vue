<script setup lang="ts">
const props = defineProps<{
  operation: GqlOps,
  name: string,
  variables: {[key: string]: any},
}>();

const { data, pending, error } = useAsyncGql(props.operation, props.variables, { lazy: true });
</script>

<template>
  <div v-if="error" class="w-full text-3xl text-rose-500">
    {{ error }}
  </div>

  <div
    v-if="pending"
    class="
      w-full h-60 font-semibold text-4xl text-center flex flex-col items-center justify-center
      text-zinc-200 opacity-20
    "
  >
    <UIcon
      name="i-heroicons-arrow-path"
      class="mb-4 text-8xl animate-spin"
    />
    Loading
  </div>

  <ImagesGrid :images="data?.[name] || []" />

</template>