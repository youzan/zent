import * as React from 'react';
import * as keycode from 'keycode';
import {
  ISelectProps,
  ISelectSingleValueProps,
  ISelectMultiValueProps,
  ISelectChildren,
} from './shared';
import { Popover } from '../popover';
import { SelectContext } from './context';
import { SelectOption } from './Option';
import { SelectTrigger } from './Trigger';
import { ISelectOptionProps } from './Option';
import { isElement } from 'react-is';
import { OPTION, GROUP } from './symbol';

type ChildArray<Value> = Array<
  React.ReactElement<ISelectOptionProps<Value>, SelectOption>
>;

function traverseOptions<Value>(
  children: ChildArray<Value>
): Array<[number] | [number, number]> {
  let index = 0;
  const optionIndexes: Array<[number] | [number, number]> = [];
  for (let i = 0; i <= children.length; i += 1) {
    const child = children[i];
    // console.log(child, children)
    if (!isElement(child)) {
      continue;
    }
    if ((child.type as any).selectOption === OPTION) {
      optionIndexes.push([index]);
      index += 1;
    } else if ((child.type as any).selectOptionGroup === GROUP) {
    }
  }
  return optionIndexes;
}

function inc<Value>(state: ISelectState<Value>) {
  if (state.optionIndexes.length === 0) {
    return {
      active: null,
    };
  }
  if (state.active === null || state.active >= state.optionIndexes.length - 1) {
    return {
      active: 0,
    };
  }
  return {
    active: state.active + 1,
  };
}

function dec<Value>(state: ISelectState<Value>) {
  if (state.children.length === 0) {
    return {
      active: null,
    };
  }
  if (state.active === null || state.active === 0) {
    return {
      active: state.optionIndexes.length - 1,
    };
  }
  return {
    active: state.active - 1,
  };
}

export interface ISelectState<Value> {
  search: string;
  visible: boolean;
  value: null | Value | Value[];
  active: null | number;
  prevChildren: React.ReactNode;
  children: ChildArray<Value>;
  optionIndexes: Array<[number] | [number, number]>;
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

  private popoverRef = React.createRef<Popover>();

  state: ISelectState<Value> = {
    search: '',
    visible: false,
    value: this.props.multi ? [] : null,
    active: null,
    prevChildren: null,
    children: [],
    optionIndexes: [],
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

  onSelect = (selected: unknown) => {
    const { props } = this;
    if (props.multi) {
      const { isEqual, onChange } = props;
      const value = this.state.value as Value[];
      if (value.findIndex(v => isEqual(v, selected as Value)) !== -1) {
        return;
      }
      const nextValue = value.slice();
      nextValue.push(selected as Value);
      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
        });
      }
    } else {
      const { onChange } = props;
      if (onChange) {
        onChange(selected as Value);
      } else {
        this.setState({
          value: selected as Value,
        });
      }
    }
    this.setState({
      visible: false,
    });
  };

  selectByCurrentIndex() {
    const { optionIndexes, active, children } = this.state;
    if (active === null) {
      return;
    }
    const index = optionIndexes[active];
    if (index.length === 1) {
      const i = index[0];
      const value = children[i].props.value;
      this.onSelect(value);
    }
  }

  onSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    switch (keycode(e.nativeEvent)) {
      case 'up':
        this.setState(dec);
        break;
      case 'down':
        this.setState(inc);
        break;
      case 'enter':
        this.selectByCurrentIndex();
        break;
      default:
        break;
    }
  };

  onMouseEnterOption = () => {
    this.setState({
      active: null,
    });
  };

  static getDerivedStateFromProps<Value>(
    props: ISelectProps<Value>,
    prevState: ISelectState<Value>
  ): Partial<ISelectState<Value>> | null {
    const state: Partial<ISelectState<Value>> = {};
    if (props.value !== undefined) {
      state.value = props.value;
    }
    if (typeof props.search === 'string') {
      state.search = props.search;
    }
    if (prevState.prevChildren !== props.children) {
      state.prevChildren = props.children;
      const children = React.Children.toArray<
        React.ReactElement<ISelectOptionProps<Value>, SelectOption>
      >(props.children as ISelectChildren<Value>);
      state.children = children;
      state.optionIndexes = traverseOptions(children);
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
    } = this.props;
    const { value, search, visible, active, optionIndexes } = this.state;
    let children = this.state.children;
    if (active !== null) {
      children = children.slice();
      const index = optionIndexes[active];
      if (index.length === 1) {
        const i = index[0];
        children[i] = React.cloneElement(
          children[i] as React.ReactElement<
            ISelectOptionProps<Value>,
            SelectOption
          >,
          {
            active: true,
          }
        );
      }
    }

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
          isEqual,
          onMouseEnterOption: this.onMouseEnterOption,
          ...valueProps,
        }}
      >
        <Popover
          ref={this.popoverRef}
          className="zent-select-pop"
          position={Popover.Position.AutoBottomLeft}
          visible={visible}
          onVisibleChange={this.onVisibleChange}
          cushion={5}
        >
          <SelectTrigger
            className={className}
            search={search}
            onSearchChange={this.onSearchChange}
            placeholder={placeholder}
            renderSelectedValue={renderSelectedValue}
            onDelete={this.onDelete}
            onSearchKeyDown={this.onSearchKeyDown}
            {...valueProps}
          />
          <Popover.Content>{children}</Popover.Content>
        </Popover>
      </SelectContext.Provider>
    );
  }
}

export default Select;
