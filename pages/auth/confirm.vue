<script setup lang="ts">
definePageMeta({
  // middleware: [
  //   'redirect-if-logged-in',
  // ],
  layout: 'centered',
});

const apollo = useApollo();
const user = useSupabaseUser();

watch(user, () => {
  if (user.value) {
    // Append new user in Prisma table after confirmation if it's not already there
    apollo.clients!.default.mutate({
      mutation: gql`
        mutation AddUserMutation($id: ID!, $email: String!) {
          addUser(id: $id, email: $email)
        }
      `,
      variables: {
        id: user.value.id,
        email: user.value.email || '',
      },
    }).then((result) => {
      navigateTo('/dashboard/');
    }).catch((err) => {
      navigateTo('/auth/logout/');
    });
  }
}, {
  immediate: true,
});
</script>

<template>
  <h1 class="font-semibold text-4xl mb-8">Waiting for login...</h1>
</template>