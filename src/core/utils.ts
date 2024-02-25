import { Observable, Subject } from 'rxjs';
import { useEffect, useState } from 'react';
import { ObservedType } from './types.ts';

export const subjectToChange = <T,>(subject: Subject<T>) => (event: {target: {value: T}}) => subject.next(event.target.value as T)
export const nextify = <T,U extends string>(obj: Record<U, Subject<T>>):  { [K in U]: (x: ObservedType<typeof obj[K]>) => void } => Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k as U, (v as Subject<T>).next.bind(v)])
) as { [K in U]: (x: ObservedType<typeof obj[K]>) => void }

export function useSubscriptions<T extends Observable<unknown>[]>(...streams: T): Array<unknown> & { [K in keyof T]: ObservedType<T[K]> } {
  const [values, setValues] = useState<Array<unknown> & { [K in keyof T]: ObservedType<T[K]> }>(
    streams.map(() => undefined) as { [K in keyof T]: ObservedType<T[K]> }
  );

  useEffect(() => {
    const subscriptions = streams.map((stream, index) =>
      stream.subscribe(value =>
        setValues(prev => prev.with(index, value) as Array<unknown> & { [K in keyof T]: ObservedType<T[K]> })))

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  return values;
}