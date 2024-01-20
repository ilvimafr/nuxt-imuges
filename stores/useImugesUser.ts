// Imuges User using lazy load
export const useImugesUser = defineStore('imugesUser', () => {
  const user = useSupabaseUser();
  const userName = ref('');

  async function refresh() {
    const data = await GqlGetUser({ id: user.value!.id });
    userName.value = data.getUser?.name || userName.value;
  }

  async function changeUserName(name: string) {
    await GqlChangeUserName({ name: name });
    userName.value = name;
  }

  refresh();

  return {
    userName,
    changeUserName,
    refresh,
  };
});
