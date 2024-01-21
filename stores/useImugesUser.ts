import type { GetUserQuery } from "#gql";

export const useImugesUser = defineStore('imugesUser', () => {
  const user = useSupabaseUser();
  const { data: userName, refresh: refreshUserName } = useAsyncGql('GetUser', {
    id: user.value!.id,
  }, {
    lazy: true,
    transform: (test) => {
      return test?.getUser?.name || '';
    },
  });

  async function changeUserName(name: string) {
    await GqlChangeUserName({ name });
    userName.value = name;
  }

  return {
    userName,
    refreshUserName,
    changeUserName,
  };
});
