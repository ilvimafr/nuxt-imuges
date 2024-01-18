<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'centered',
});

useSupabaseClient().auth.signOut().then(() => {
  navigateTo('/');
});
</script>

<template>
  <h1 class="font-semibold text-4xl mb-8">Logging out...</h1>
</template>