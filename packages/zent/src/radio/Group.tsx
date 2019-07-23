import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import noop from 'lodash-es/noop';

import memoize from '../utils/memorize-one';
import GroupContext from './GroupContext';
import { IRadioEvent } from './AbstractRadio';
import { DisabledContext, IDisabledContext } from '../disabled';

const GroupContextProvider = GroupContext.Provider;

export interface IRadioGroupProps<Value> {
  value: Value;
  disabled?: boolean;
  readOnly: boolean;
  onChange: (e: IRadioEvent<Value>) => void;
  isValueEqual: (value1: Value, value2: Value) => boolean;
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
}

export class RadioGroup<Value> extends Component<IRadioGroupProps<Value>> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    readOnly: false,
    isValueEqual: Object.is,
    onChange: noop,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  getGroupContext = memoize(
    (
      value: unknown,
      disabled: boolean | undefined,
      readOnly: boolean,
      isValueEqual: (value1: Value, value2: Value) => boolean
    ) => ({
      value,
      disabled,
      readOnly,
      isValueEqual,
      onRadioChange: this.onRadioChange,
    })
  );

  onRadioChange = (e: IRadioEvent<Value>) => {
    this.props.onChange(e);
  };

  render() {
    const {
      value,
      disabled = this.context.value,
      readOnly,
      isValueEqual,
      className,
      prefix,
      style,
      children,
    } = this.props;

    const classString = classNames(
      {
        [`${prefix}-radio-group`]: true,
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

export default RadioGroup;
