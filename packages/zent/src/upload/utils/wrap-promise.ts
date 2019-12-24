import isPromise from '../../utils/isPromise';

export function wrapPromise(condition: boolean | Promise<any>) {
  if (isPromise(condition)) {
    return condition;
  }
  return condition ? Promise.resolve() : Promise.reject();
}
