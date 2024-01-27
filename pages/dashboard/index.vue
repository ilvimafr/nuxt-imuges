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
    :count="20"
    :variables="{ id: user?.id }"
  />
</template>