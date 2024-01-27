<template>

  <TitlePlate>
    <UIcon
      name="i-fontisto-random"
      class="text-6xl align-[-17px] mr-2 bg-gradient-to-r from-rose-600 to-rose-400"
    />
    Random Images
  </TitlePlate>

  <ImagesGqlGrid
    operation="GetNewestImages"
    name="getNewestImages"
    :count="20"
  />
</template>