const SOME = Symbol('some');

export interface ISome<T> {
  [SOME]: true;
  value: T;
}

export type Maybe<T> = ISome<T> | null | undefined;

export const Some = <T>(value: T): ISome<T> => ({
  [SOME]: true,
  value,
});

export const None = () => null;

export function or<T>(maybe: Maybe<T>, def: () => T) {
  return maybe ? maybe.value : def();
}

export function isSome<T>(maybe: Maybe<T>): maybe is ISome<T> {
  return !!maybe;
}

export function get<T>(some: ISome<T>) {
  return some.value;
}
