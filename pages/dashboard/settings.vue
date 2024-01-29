<script setup lang="ts">
import { type GraphQLError } from 'graphql';

useHead({
  title: 'Settings',
});
definePageMeta({
  middleware: ['redirect-if-logged-out'],
  layout: 'dashboard',
});

const user = useSupabaseUser();
const imugesUser = useImugesUser();
const { userName } = storeToRefs(imugesUser);
const userNameError = ref('');
const successMessage = ref('');
const isSaving = ref(false);

function saveSettings() {
  if (isSaving.value) {
    return;
  }

  isSaving.value = true;
  userNameError.value = '';
  successMessage.value = '';

  imugesUser.changeUserName(userName.value)
    .then(() => {
      successMessage.value = 'Your settings have been successfully saved!';
    })
    .catch((error) => {
      userNameError.value = (error.gqlErrors as GraphQLError[])[0].message;
    })
    .finally(() => {
      isSaving.value = false;
    });
}
</script>


<template>

  <form @submit.prevent="saveSettings">

    <div class="flex gap-8 items-center">
      <img
        :src="user?.user_metadata?.avatar_url"
        class="rounded-lg h-full mt-1 w-32 min-w-32 block"
        alt="Profile Image"
      />

      <div class="grow">
        <DashboardSettingsInput
          id="name"
          type="text"
          title="Your Email"
          :value="user?.email"
          disabled
        />
        <div class="h-4"></div>
        <DashboardSettingsInput
          id="name"
          type="text"
          title="Provider"
          :value="user?.app_metadata?.provider"
          disabled
        />
      </div>
    </div>

    <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-1"/>

    <DashboardSettingsInput
      id="name"
      type="text"
      title="Your Name"
      :error="userNameError"
      v-model="userName"
    />

    <hr class="my-6 border-zinc-200 dark:border-zinc-800 border-1"/>

    <UButton
      type="submit"
      class="text-lg"
      color="emerald"
      :loading="isSaving"
      :label="isSaving ? 'Saving' : 'Save'"
    />

    <div v-if="successMessage" class="py-3 text-lg text-emerald-600">
      {{ successMessage }}
    </div>

  </form>

</template>