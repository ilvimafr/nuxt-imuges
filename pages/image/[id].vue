<script setup lang="ts">
import { type GraphQLError } from 'graphql';
import { onMounted } from 'vue';
const route = useRoute();

onMounted(() => {
  // route.params.id
});
</script>

<template>
  <h1 class="font-semibold text-4xl mt-4 mb-10 text-center">
    <UIcon
      name="i-heroicons-star"
      class="align-[-4px]"
    />
    Image
  </h1>

</template>