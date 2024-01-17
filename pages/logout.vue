<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out']
});

useSupabaseClient().auth.signOut();
navigateTo('/');
</script>

<template>
  Logging out...
</template>