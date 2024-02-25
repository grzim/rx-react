import { combineLatestWith, map, share } from 'rxjs';
import { FilterService, UserService } from '../../services';
import { nextify, subjectToChange, useSubscriptions } from '../../core';

export const getUsersViewModel = (
  usersService: UserService,
  filersService: FilterService,
) => {
  const { addUser, deleteUser, users$ } = usersService;
  const { setAgeFilter, ageFilterLabel$, filters$, setNameFilterValue } =
    filersService;
  const [onSetAgeFilter, onSetNameFilter] = [
    setAgeFilter,
    setNameFilterValue,
  ].map(subjectToChange);

  const filteredUsers$ = users$.pipe(
    combineLatestWith(filters$),
    map(([users, filters]) => filters.reduce((u, f) => u.filter(f), users)),
    share(),
  );

  return function useViewModel() {
    const [users = [], filterLabel] = useSubscriptions(
      filteredUsers$,
      ageFilterLabel$,
    );
    return {
      ...nextify({
        addUser,
        deleteUser,
      }),
      onSetAgeFilter,
      onSetNameFilter,
      users,
      filterLabel,
    };
  };
};
