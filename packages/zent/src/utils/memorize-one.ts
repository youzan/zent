/**
 * copied from https://github.com/alexreardon/memoize-one
 */

export type EqualityFn = (newArgs: unknown[], lastArgs: unknown[]) => boolean;

const shallowEqual = (newValue: unknown, oldValue: unknown): boolean =>
  newValue === oldValue;

const simpleIsEqual: EqualityFn = (
  newArgs: unknown[],
  lastArgs: unknown[]
): boolean =>
  newArgs.length === lastArgs.length &&
  newArgs.every((newArg: unknown, index: number): boolean =>
    shallowEqual(newArg, lastArgs[index])
  );

// <ResultFn: (...Array<any>) => mixed>
// The purpose of this typing is to ensure that the returned memoized
// function has the same type as the provided function (`resultFn`).
// ResultFn:        Generic type (which is the same as the resultFn).
// (...Array<any>): Accepts any length of arguments - and they are not checked
// mixed:           The result can be anything but needs to be checked before usage
export default function<F extends Function>(
  resultFn: F,
  isEqual: EqualityFn = simpleIsEqual
): F {
  let lastThis: unknown;
  let lastArgs: unknown[] = [];
  let lastResult: unknown;
  let calledOnce = false;

  // breaking cache when context (this) or arguments change
  const result = function(...newArgs: unknown[]) {
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
    // Doing the lastResult assignment first so that if it throws
    // nothing will be overwritten
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  };

  return (result as unknown) as F;
}
