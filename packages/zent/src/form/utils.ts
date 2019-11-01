export type $MergeParams<T> = (T extends any
  ? (t: T) => void
  : never) extends ((t: infer V) => void)
  ? V
  : never;
