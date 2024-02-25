import { UserService } from '../services';
import { concatMap, share, Subject, tap, withLatestFrom } from 'rxjs';
import { getUsers, postUsers as post } from './users.api.ts';
import { nextify, useSubscriptions } from '../core';

export const getUsersServiceModel = (usersService: UserService) => {
  const fetchUsers = new Subject<unknown>();
  const postUsers = new Subject<unknown>();
  const serverPostResponse$ = postUsers.pipe(
    withLatestFrom(usersService.users$),
    concatMap(([,users]) => post(users)),
    share())

  const serverFetchResponse$ = fetchUsers.pipe(
    concatMap(getUsers),
    tap(users => usersService.setUsers.next(users)),
    share()
  )

  return function useServiceModel() {
    const [serverPostResponse, serverFetchResponse] = useSubscriptions(serverPostResponse$, serverFetchResponse$);
    return {
      serverPostResponse, serverFetchResponse,
      ...nextify({
                fetchUsers, postUsers
              })
    }
  }
}