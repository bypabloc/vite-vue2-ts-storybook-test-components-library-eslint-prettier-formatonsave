import { User, UserState } from "@/interface/user";

import userData from "@/data/users.json";

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    userList: [],
  }),
  getters: {
    getUser:
      (state: UserState) =>
      (id: number): User | null => {
        return state.userList.find((user) => user.id === id) || null;
      },
  },
  actions: {
    setUser(user: User): User {
      this.user = user;
      return user;
    },
    async getUserList(): Promise<User[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userListData = userData.userList as User[];
          this.userList = userListData;
          resolve(userListData);
        });
      });
    },
  },
});
