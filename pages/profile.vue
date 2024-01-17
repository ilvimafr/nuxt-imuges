<script setup lang="ts">
definePageMeta({
  middleware: [
    'redirect-if-logged-out',
  ],
});
</script>

<template layout="centered">
  <h1 class="font-semibold text-4xl">Profile</h1>
</template>