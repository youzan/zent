import * as React from 'react';
import cx from 'classnames';
import { ISelectProps } from './type';
import { Popover } from '../popover';
import { SelectContext, ISelectContext } from './context';
import { SelectOption } from './Option';

export interface ISelectState<Value> {
  search: string;
  searchFocus: boolean;
  value: null | Value | Value[];
  active: null | Value;
}

export class Select<Value> extends React.Component<
  ISelectProps<Value>,
  ISelectState<Value>
> {
  static defaultProps = {
    multi: false,
    isEqual: Object.is,
  };

  static Option = SelectOption;

  state: ISelectState<Value> = {
    search: '',
    searchFocus: false,
    value: this.props.multi ? [] : null,
    active: null,
  };

  onSelect = (value: unknown) => {};

  static getDerivedStateFromProps<Value>({
    value,
    search,
  }: ISelectProps<Value>): Partial<ISelectState<Value>> | null {
    const state: Partial<ISelectState<Value>> = {};
    if (value !== undefined) {
      state.value = value;
    }
    if (typeof search === 'string') {
      state.search = search;
    }
    return state;
  }

  render() {
    const { multi, isEqual } = this.props;
    const { value, search, active } = this.state;
    return (
      <SelectContext.Provider
        value={
          {
            multi,
            value,
            onSelect: this.onSelect,
            search,
            active,
            isEqual,
          } as ISelectContext
        }
      />
    );
  }
}

export default Select;
