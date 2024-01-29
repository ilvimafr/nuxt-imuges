<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return `Imuges` + (title ? ` | ${title}` : '');
  }
});
</script>

<template>
  <Header />

  <main class="container py-6 mt-6 bg-white dark:bg-zinc-900 rounded-xl grow relative z-10">
    <slot />
  </main>

  <Footer />
</template>
