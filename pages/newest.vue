<template>
  <h1 class="font-semibold text-4xl py-8 mb-10 text-center bg-emerald-200 dark:bg-emerald-950 rounded-lg">
    <UIcon
      name="i-heroicons-star"
      class="align-[-4px]"
    />
    Newest Images
  </h1>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :variables="{ start: 0, count: 20 }"
  />

</template>