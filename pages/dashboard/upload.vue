<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'dashboard',
});
</script>

<template>
  Upload New Image
</template>