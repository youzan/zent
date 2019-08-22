import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import memoize from '../utils/memorize-one';

import GroupContext from './GroupContext';
import { DisabledContext, IDisabledContext } from '../disabled';

const GroupContextProvider = GroupContext.Provider;

export interface ICheckboxGroupProps<Value> {
  value: Value[];
  isValueEqual: (value1: Value, value2: Value) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (values: Value[]) => void;
  className?: string;
  style?: React.CSSProperties;
  prefix: string;
}

export class CheckboxGroup<Value> extends Component<
  ICheckboxGroupProps<Value>
> {
  static defaultProps = {
    prefix: 'zent',
    isValueEqual: Object.is,
    value: [],
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  getGroupContext = memoize(
    (
      maybeValue: Value[] | unknown,
      disabled: boolean,
      readOnly: boolean,
      isValueEqual: (value1: Value, value2: Value) => boolean
    ) => {
      let value;
      if (Array.isArray(maybeValue)) {
        value = maybeValue;
      } else {
        value = [];
      }
      return {
        value,
        disabled,
        readOnly,
        isValueEqual,
        onChange: this.onCheckboxChange,
      };
    }
  );

  onCheckboxChange = (child: Value) => {
    const { isValueEqual, onChange, value: prevValue } = this.props;
    if (!onChange) {
      return;
    }
    const value = prevValue ? prevValue.slice() : [];
    const index = value.findIndex(it => isValueEqual(it, child));
    if (index !== -1) {
      value.splice(index, 1);
    } else {
      value.push(child);
    }
    onChange(value);
  };

  render() {
    const {
      className,
      prefix,
      style,
      children,
      value,
      disabled = this.context.value,
      readOnly = false,
      isValueEqual,
    } = this.props;

    const classString = classNames(
      {
        [`${prefix}-checkbox-group`]: true,
      },
      className
    );

    return (
      <GroupContextProvider
        value={this.getGroupContext(value, disabled, readOnly, isValueEqual)}
      >
        <div className={classString} style={style}>
          {children}
        </div>
      </GroupContextProvider>
    );
  }
}

export default CheckboxGroup;
