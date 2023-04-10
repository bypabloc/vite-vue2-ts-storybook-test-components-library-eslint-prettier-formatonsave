import { ref, reactive, computed } from "vue";

import { User, UserState } from "@/interface/user";

import userData from "@/data/users.json";

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  // reactive state as UserState
  const state: UserState = reactive({
    user: null,
    userList: [],
  });

  // computed state
  const user = computed(() => state.user);
  const userList = computed(() => state.userList);

  // actions
  const addUser = (user: User): User => {
    if (!user.uuid) user.uuid = Math.random().toString(36).substr(2, 9);
    console.log("user", user);
    state.userList.push(user);
    return user;
  };

  const getUserList = async (): Promise<User[]> => {
    state.userList = userData.userList as User[];
    return state.userList;
  };

  const removeUser = (uuid: User["uuid"]): void => {
    state.userList = state.userList.filter((user) => user.uuid !== uuid);
  };

  return {
    user,
    addUser,
    userList,
    getUserList,
    removeUser,
  };
});
