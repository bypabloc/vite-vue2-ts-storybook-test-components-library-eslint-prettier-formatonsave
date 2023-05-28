import { computed, reactive } from 'vue'
import { User, UserState } from '@/interface/user'
import userData from '@/data/users.json'
import { v4 as uuid } from '@/util/uuid'

export const useUserStore = () => {
  const state: UserState = reactive({
    user: null,
    userList: [],
  })

  const user = computed(() => state.user)
  const userList = computed(() => state.userList)

  const add = (user: User): User => {
    if (!user.uuid) user.uuid = uuid()
    state.userList.push({
      ...user,
    })
    state.user = {
      ...user,
    }
    resetUser(user)
    return user
  }

  const getUserList = async (): Promise<User[]> => {
    state.userList = userData.userList as User[]
    return state.userList
  }

  const removeUser = (uuid: User['uuid']): void => {
    state.userList = state.userList.filter((user) => user.uuid !== uuid)
  }

  const resetUser = (user: User) => {
    user.uuid = ''
    user.name = ''
    user.age = 0
  }

  return {
    add,
    getUserList,
    removeUser,
    user,
    userList,
  }
}
