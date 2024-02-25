import { map, merge, NEVER, Observable, scan, share, startWith, Subject } from 'rxjs';
import { Modification, Modificator } from './types.ts';

export const add: Modification = (item) => (arr) => [...arr, item];
export const remove: Modification =  (item) => (arr) => arr.filter(x => x !== item)

export const getResourceArr = <T,>(stream: Observable<T[]> = NEVER, ...streams: Observable<T[]>[]) => {
  const addItem = new Subject<T>();
  const deleteItem = new Subject<T>();
  const allStreams$ = merge(...[stream, ...streams]).pipe(
    map((x) => () => x)
  );
  const items$ =
    merge(
      allStreams$,
      addItem.pipe(
        map(add)
      ),
      deleteItem.pipe(
        map(remove)
      ),
    ).pipe(
      scan((users, fun) =>
          (fun as Modificator<T>)(users)
        , [] as T[]),
      startWith([] as T[]),
      share()
  )
  return {
    items$,
    addItem,
    deleteItem,
  }
}