import * as React from 'react';
import { ISelectOptionProps } from './Option';
import { SelectOption } from './Option';

export type ISelectChildren<Value> =
  | React.ReactElement<ISelectOptionProps<Value>, SelectOption>
  | Array<React.ReactElement<ISelectOptionProps<Value>, SelectOption>>;

export interface ISelectCommonProps<Value> {
  isEqual(a: Value, b: Value): boolean;
  className?: string;
  search?: string;
  placeholder?: React.ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (
    search: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  renderSelectedValue: (value: Value) => React.ReactNode;
  autoAlignWidth?: boolean;
  children?: ISelectChildren<Value>;
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
  getValueKey?: (value: Value) => string;
}

export type ISelectProps<Value> = ISelectCommonProps<Value> &
  (ISelectSingleProps<Value> | ISelectMultiProps<Value>);
