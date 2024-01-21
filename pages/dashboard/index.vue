<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'dashboard',
});
const user = useSupabaseUser();
</script>

<template>
  <ImagesGqlGrid
    operation="GetUserNewestImages"
    name="getUserNewestImages"
    :variables="{ id: user?.id, start: 0, count: 20 }"
  />
</template>