<template>
  <h1 class="title-plate-bg font-semibold text-4xl py-8 mb-4 text-center rounded-lg">
    <slot />
  </h1>
</template>

<style lang="scss">
.title-plate-bg {
  background-image: url('../assets/images/bg-pattern.webp');
  background-size: cover;
  background-position: 50% 50%;
}
</style>