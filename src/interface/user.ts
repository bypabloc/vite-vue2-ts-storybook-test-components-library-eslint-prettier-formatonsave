export interface User {
  uuid?: string
  name: string
  age: number
}

export interface UserState {
  user: User | null
  userList: User[]
}
