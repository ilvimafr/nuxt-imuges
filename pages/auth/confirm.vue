<script setup lang="ts">
definePageMeta({
  layout: 'centered',
});

const user = useSupabaseUser();
watch(user, async () => {
  if (user.value) {
    await navigateTo('/dashboard/');
  }
}, {
  immediate: true,
});
</script>

<template>
  <h1 class="font-semibold text-4xl mb-8">Waiting for login...</h1>
</template>