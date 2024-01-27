<template>

  <TitlePlate>
    <UIcon
      name="i-heroicons-star"
      class="text-6xl align-[-14px] bg-gradient-to-r from-violet-600 to-blue-400"
    />
    Newest Images
  </TitlePlate>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :count="20"
  />

</template>