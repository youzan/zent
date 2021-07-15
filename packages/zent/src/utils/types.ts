export type PartialRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type ListIterator<T, TResult> = (
  value: T,
  index: number,
  collection: ArrayLike<T>
) => TResult;

export interface ICancelable {
  cancel(): void;
}
