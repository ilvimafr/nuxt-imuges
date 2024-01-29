<script setup langs="ts">
useHead({
  title: 'Trending'
});
</script>

<template>

  <TitlePlate>
    <UIcon
      name="i-heroicons-fire"
      class="text-6xl align-[-14px] bg-gradient-to-r from-amber-500 to-rose-600"
    />
    Trending Images
  </TitlePlate>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :count="20"
  />

</template>