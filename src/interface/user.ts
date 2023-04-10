export interface User {
  id?: number;
  name: string;
  age: number;
}

export interface UserState {
  user: User | null;
  userList: User[];
}
