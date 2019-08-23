import { Omit } from 'utility-types';

export type ParticalRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
