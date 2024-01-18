<script setup lang="ts">
import LogoSvg from '../assets/logo.svg?component';
const supabaseUser = useSupabaseUser();
</script>

<template>
  <header class="py-3 dark relative text-white">
    <!-- Background -->
    <div
      class="absolute bg-zinc-800 w-full md:w-[98%] h-[300px] md:-rotate-3 -top-[120px] md:left-[1%] rounded-3xl"
    ></div>

    <div class="container flex justify-between items-center gap-10 mt-6 relative z-10">
      <div class="">
        <NuxtLink href="/">
          <LogoSvg
            height="40"
            class="fill-white"
          />
        </NuxtLink>
      </div>

      <nav class="ml-auto flex gap-5">
        <HeaderLink
          href="/"
          title="Trending"
          iconName="i-heroicons-fire"
        />
        <HeaderLink
          href="/newest"
          title="Newest"
          iconName="i-heroicons-star"
        />
        <HeaderLink
          href="/random"
          title="Random"
          iconName="i-fontisto-random"
        />
        <HeaderLink
          v-if="!supabaseUser"
          href="/auth/login"
          title="Log In"
          iconName="i-heroicons-arrow-right-end-on-rectangle-20-solid"
        />
        <HeaderLink
          v-if="supabaseUser"
          href="/dashboard/"
          title="Dashboard"
          iconName="i-heroicons-user"
        />
        <HeaderLink
          v-if="supabaseUser"
          href="/auth/logout"
          title="Log Out"
          iconName="i-heroicons-arrow-left-start-on-rectangle-20-solid"
        />
      </nav>

      <ColorScheme placeholder="" class="w-11">
        <UToggle
          on-icon="i-heroicons-moon"
          off-icon="i-heroicons-sun"
          size="lg"
          color="emerald"
          :model-value="$colorMode.value === 'dark' ? true : false"
          @update:model-value="(enabled: boolean) => {
            $colorMode.preference = enabled ? 'dark' : 'light';
          }"
        />
      </ColorScheme>
    </div>
  </header>
</template>