<script setup lang="ts">
</script>

<template>
  <h1 class="font-semibold text-4xl py-8 mb-10 text-center bg-rose-200 dark:bg-rose-950 rounded-lg">
    <UIcon
      name="i-fontisto-random"
      class="align-[-4px]"
    />
    Random Images
  </h1>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :variables="{ start: 0, count: 20 }"
  />
</template>