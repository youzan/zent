export function wrapPromise(condition: boolean | Promise<any>) {
  if (typeof condition === 'boolean') {
    return condition ? Promise.resolve() : Promise.reject();
  }
  return condition;
}
