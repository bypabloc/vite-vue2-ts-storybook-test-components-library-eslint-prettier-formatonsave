import { onMounted } from 'vue'

import { User } from '@/interface/user.ts'
import { useUserStore } from '@/util/userStore.ts'

export const useUser = () => {
  const userStore = useUserStore()
  const { user, userList } = userStore
  const {
    add: addUserStore,
    getUserList: getUserListStore,
    removeUser: removeUserStore,
  } = userStore

  const addUser = (user: User): User => {
    return addUserStore(user)
  }

  const getUserList = async (): Promise<User[]> => {
    return await getUserListStore()
  }

  const removeUser = (uuid: User['uuid']): void => {
    removeUserStore(uuid)
  }

  onMounted(async () => {
    await getUserList()
  })

  return {
    addUser,
    getUserList,
    removeUser,
    user,
    userList,
  }
}
