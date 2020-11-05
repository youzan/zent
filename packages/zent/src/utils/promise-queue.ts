export function createPromiseQueue<T>(
  items: T[],
  pGenerator: (item: T) => Promise<void>
) {
  return () =>
    items.reduce((prevP, item) => {
      return prevP.then(() => pGenerator(item));
    }, Promise.resolve());
}

export function execPromiseQueue<T>(
  items: T[],
  pGenerator: (item: T) => Promise<void>
) {
  return createPromiseQueue(items, pGenerator)();
}
