import { Subject } from 'rxjs';

export const getSortingService = <T extends Record<string, unknown>>() => {
  const setSortBy = new Subject<keyof T>();
  const sortBy$ = setSortBy.asObservable();
  return {
    sortBy$,
    setSortBy
  }
}