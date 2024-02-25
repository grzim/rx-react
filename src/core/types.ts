import { Observable } from 'rxjs';

export type ObservedType<T> = T extends Observable<infer U> ? U : never;
export type Modificator<T> = (arr: T[]) => T[];
export type Modification = <T>(item: T) => Modificator<T>;
