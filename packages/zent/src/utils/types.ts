import { Omit } from 'utility-types';

export type PartialRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
