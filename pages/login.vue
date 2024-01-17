<script setup lang="ts">
import LogoSvg from '../assets/logo.svg?component';
import {type Provider} from '@supabase/gotrue-js/src/index';
const supabaseClient = useSupabaseClient();

definePageMeta({
  middleware: [
    'redirect-if-logged-in',
  ],
  layout: 'centered',
});

function signin(provider: Provider) {
  supabaseClient.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: '/',
    },
  });
}
</script>

<template layout="centered">
  <h1 class="font-semibold text-4xl mb-8">
    Log in to
    <LogoSvg
      height="40"
      class="inline-block fill-current align-[-9px] -mr-2"
    />
    !
  </h1>
  <div class="flex flex-col gap-5 text-center">
    <div
      class="
        px-5 py-2 border-2 border-zinc-400 rounded-xl text-lg cursor-pointer transition-colors duration-150
        hover:bg-zinc-900 hover:border-zinc-900 hover:text-zinc-100 hover:transition-none
        dark:border-zinc-400 dark:hover:bg-white dark:hover:border-white dark:hover:text-zinc-900
      "
      @click="() => signin('github')"
    >
      <UIcon name="i-fontisto-github" class="align-[-1px] mr-1"/>
      Continue with <b>GitHub</b>
    </div>
    <!-- <div class="
      px-5 py-2 border-2 border-zinc-400 rounded-xl text-lg cursor-pointer transition-colors duration-150
      hover:bg-zinc-900 hover:border-zinc-900 hover:text-zinc-100 hover:transition-none
      dark:border-zinc-400 dark:hover:bg-white dark:hover:border-white dark:hover:text-zinc-900
    ">
      <UIcon name="i-fontisto-bitbucket" class="align-[-1px] mr-1"/>
      Continue with <b>Bitbucket</b>
    </div>
    <div class="
      px-5 py-2 border-2 border-zinc-400 rounded-xl text-lg cursor-pointer transition-colors duration-150
      hover:bg-zinc-900 hover:border-zinc-900 hover:text-zinc-100 hover:transition-none
      dark:border-zinc-400 dark:hover:bg-white dark:hover:border-white dark:hover:text-zinc-900
    ">
      <UIcon name="i-fontisto-google" class="align-[-1px] mr-1"/>
      Continue with <b>Google</b>
    </div>
    <div class="
      px-5 py-2 border-2 border-zinc-400 rounded-xl text-lg cursor-pointer transition-colors duration-150
      hover:bg-zinc-900 hover:border-zinc-900 hover:text-zinc-100 hover:transition-none
      dark:border-zinc-400 dark:hover:bg-white dark:hover:border-white dark:hover:text-zinc-900
    ">
      <UIcon name="i-fontisto-facebook" class="align-[-1px] mr-1"/>
      Continue with <b>Facebook</b>
    </div> -->
  </div>
</template>