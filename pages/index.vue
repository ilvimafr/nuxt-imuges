<template>
  <h1 class="bg-pattern font-semibold text-4xl py-8 mb-10 text-center bg-blue-200 dark:bg-blue-950 rounded-lg">
    <UIcon
      name="i-heroicons-fire"
      class="align-[-4px]"
    />
    Trending Images
  </h1>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :variables="{ start: 0, count: 20 }"
  />

</template>