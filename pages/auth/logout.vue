<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out']
});

useSupabaseClient().auth.signOut().then(() => {
  navigateTo('/');
});
</script>

<template>
  Logging out...
</template>