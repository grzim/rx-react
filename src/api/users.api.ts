import { User } from '../services';

let serverUsers: User[] = [{
  name: 'user 1', age: 12,
},{
  name: 'user 2', age: 18,
},{
  name: 'user 2', age: 28,
}];

export const getUsers = () => new Promise<User[]>((r => setTimeout(() => r(serverUsers), 2000)))
export const postUsers = (users: User[]) => new Promise((r => setTimeout(() => {
  serverUsers = users;
  r('success')
}, 2000)))
