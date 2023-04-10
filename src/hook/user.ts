import { onMounted } from "vue";

import { User } from "@/interface/user.ts";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

export const useUser = () => {
  const { user, userList } = storeToRefs(userStore);
  const { setUser: setUserStore, getUserList: getUserListStore } = userStore;

  const setUser = (user: User): User => {
    return setUserStore(user);
  };

  const getUserList = async (): Promise<User[]> => {
    return await getUserListStore();
  };

  onMounted(async () => {
    await getUserList();
  });

  return {
    user,
    setUser,
    userList,
    getUserList,
  };
};
