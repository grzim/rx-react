import { Subject } from 'rxjs';
import { getResourceArr } from '../core';

export type User = { name: string; age: number };

export const getUsersService = () => {
  const setUsers = new Subject<User[]>();
  const {
    items$: users$,
    addItem: addUser,
    deleteItem: deleteUser,
  } = getResourceArr<User>(setUsers);
  return {
    users$,
    addUser,
    deleteUser,
    setUsers,
  };
};

export type UserService = ReturnType<typeof getUsersService>;
