<template>
  <Header />

  <main class="container py-6 mt-6 bg-white dark:bg-zinc-900 rounded-xl grow relative z-10">
    <slot />
  </main>

  <Footer />
</template>

<style lang="scss">
#__nuxt {
  @apply bg-zinc-100 dark:bg-black;
  @apply min-h-screen min-h-lvh flex flex-col items-stretch;
}
</style>