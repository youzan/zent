import * as React from 'react';
import {
  ISelectProps,
  ISelectSingleValueProps,
  ISelectMultiValueProps,
} from './type';
import { Popover } from '../popover';
import { SelectContext } from './context';
import { SelectOption } from './Option';
import { SelectTrigger } from './Trigger';
import { SelectEmpty } from './Empty';

export interface ISelectState<Value> {
  search: string;
  visible: boolean;
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
    renderSelectedValue(value: unknown) {
      return '' + value;
    },
  };

  static Option = SelectOption;
  static Empty = SelectEmpty;

  private popoverRef = React.createRef<Popover>();

  state: ISelectState<Value> = {
    search: '',
    visible: false,
    value: this.props.multi ? [] : null,
    active: null,
  };

  onDelete = (value: Value) => {};

  onVisibleChange = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  onSearchChange = (search: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchChange } = this.props;
    if (onSearchChange) {
      onSearchChange(search, e);
    } else {
      this.setState({
        search,
      });
    }
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
    const {
      multi,
      isEqual,
      placeholder,
      renderSelectedValue,
      className,
      children,
    } = this.props;
    const { value, search, active, visible } = this.state;

    /**
     * makes TypeScript happy
     */
    const valueProps = {
      multi,
      value,
    } as Required<
      ISelectSingleValueProps<Value> | ISelectMultiValueProps<Value>
    >;

    return (
      <SelectContext.Provider
        value={{
          onSelect: this.onSelect,
          search,
          active,
          isEqual,
          ...valueProps,
        }}
      >
        <Popover
          ref={this.popoverRef}
          className="zent-select-pop"
          position={Popover.Position.AutoBottomLeft}
          visible={visible}
          onVisibleChange={this.onVisibleChange}
        >
          <SelectTrigger
            className={className}
            search={search}
            onSearchChange={this.onSearchChange}
            placeholder={placeholder}
            renderSelectedValue={renderSelectedValue}
            onDelete={this.onDelete}
            {...valueProps}
          />
          <Popover.Content>{children}</Popover.Content>
        </Popover>
      </SelectContext.Provider>
    );
  }
}

export default Select;
