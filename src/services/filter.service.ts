import {
  combineLatestWith,
  debounceTime,
  map,
  merge,
  scan,
  startWith,
  Subject,
} from 'rxjs';

export type Filterable = (x: { age: number; name: string }) => boolean;
export const ageFilter: Record<string, Filterable> = {
  adult: (item) => item.age >= 18,
  kids: (item) => item.age < 18,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  all: (_item) => true,
};

export type AgeFilter = keyof typeof ageFilter;
export const labelToFn = (label: AgeFilter) => ageFilter[label];

export const getFilterService = () => {
  const setNameFilterValue = new Subject<string>();
  const nameFilterValue$ = setNameFilterValue.pipe(
    startWith(''),
    map(
      (value: string): Filterable =>
        (item) =>
          item.name.includes(value),
    ),
  );

  const setAgeFilter = new Subject<AgeFilter>();
  const removeAgeFilter = new Subject<AgeFilter>();
  const ageFilterLabel$ = setAgeFilter.pipe(startWith('all' as AgeFilter));

  const ageFilter$ = merge(
    setAgeFilter.pipe(map(labelToFn)),
    removeAgeFilter.pipe(map(() => ageFilter.all)),
  ).pipe(startWith(ageFilter.all));

  const filters$ = ageFilter$.pipe(combineLatestWith(nameFilterValue$));

  const filterHistory$ = merge(
    setAgeFilter,
    removeAgeFilter.pipe(map(() => 'remove age filter')),
    setNameFilterValue.pipe(debounceTime(1000)),
  ).pipe(
    scan(
      (acc: string[], curr, i) =>
        [...acc, `${i + 1}: ${curr || 'filter removed'}`].slice(-3),
      [],
    ),
  );

  return {
    filters$,
    ageFilterLabel$,
    filterHistory$,
    removeAgeFilter,
    setAgeFilter,
    setNameFilterValue,
  };
};

export type FilterService = ReturnType<typeof getFilterService>;
