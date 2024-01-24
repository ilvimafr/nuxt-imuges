<template>
  <h1 class="bg-pattern font-semibold text-4xl py-8 mb-4 text-center rounded-lg">
    <UIcon
      name="i-heroicons-fire"
      class="text-6xl align-[-14px] bg-gradient-to-r from-amber-500 to-rose-600"
    />
    Trending Images
  </h1>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :variables="{ start: 0, count: 20 }"
  />

</template>