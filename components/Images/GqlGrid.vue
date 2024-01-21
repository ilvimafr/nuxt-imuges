<script setup lang="ts">
const props = defineProps<{
  operation: GqlOps,
  name: string,
  variables: {[key: string]: any},
}>();

const { data, pending } = useAsyncGql(props.operation, props.variables, { lazy: true });
console.log(data.value?.[props.name]);
</script>

<template>
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