<script setup="">
definePageMeta({
  // middleware: [
  //   'redirect-if-logged-in',
  // ],
  layout: 'centered',
});

const user = useSupabaseUser();
watch(user, () => {
  if (user.value) {
    return navigateTo('/');
  }
}, {
  immediate: true,
});
</script>

<template>
  <h1 class="font-semibold text-4xl mb-8">Waiting for login...</h1>
</template>