<template>

  <Header />

  <main class="
    container py-6 mt-6 bg-white dark:bg-zinc-900 rounded-xl grow relative z-10
  ">
    <h1 class="font-semibold text-4xl mb-6">Dashboard</h1>
    <div class="flex flex-col md:flex-row gap-10">
      <div class="min-w-[250px]">
        <DashboardMenu />
      </div>
      <div class="w-full ">
        <slot />
      </div>
    </div>
  </main>

  <Footer />

</template>