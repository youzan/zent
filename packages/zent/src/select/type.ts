import * as React from 'react';

export interface ISelectCommonProps<Value> {
  isEqual(a: Value, b: Value): boolean;
  className?: string;
  search?: string;
  placeholder?: string;
  onSearchChange?: (
    search: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  renderSelectedValue: (value: Value) => React.ReactNode;
}

export interface ISelectSingleValueProps<Value> {
  multi: false;
  value?: Value | null;
}

export interface ISelectSingleProps<Value>
  extends ISelectSingleValueProps<Value> {
  onChange?: (value: Value) => void;
}

export interface ISelectMultiValueProps<Value> {
  multi: true;
  value?: Value[];
}

export interface ISelectMultiProps<Value>
  extends ISelectMultiValueProps<Value> {
  onChange?: (value: Value[]) => void;
}

export type ISelectProps<Value> = ISelectCommonProps<Value> &
  (ISelectSingleProps<Value> | ISelectMultiProps<Value>);
