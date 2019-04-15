import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import noop from 'lodash-es/noop';
import eq from 'lodash-es/eq';

import memoize from '../utils/memorize-one';
import GroupContext from './GroupContext';
import { IRadioEvent } from './AbstractRadio';

const GroupContextProvider = GroupContext.Provider;

export interface IRadioGroupProps {
  value: unknown;
  disabled: boolean;
  readOnly: boolean;
  onChange: (e: IRadioEvent) => void;
  isValueEqual: (value1: unknown, value2: unknown) => boolean;
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
}

export class RadioGroup extends Component<IRadioGroupProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    isValueEqual: eq,
    onChange: noop,
  };

  getGroupContext = memoize(
    (
      value: unknown,
      disabled: boolean,
      readOnly: boolean,
      isValueEqual: (value1: unknown, value2: unknown) => boolean
    ) => ({
      value,
      disabled,
      readOnly,
      isValueEqual,
      onRadioChange: this.onRadioChange,
    })
  );

  onRadioChange = (e: IRadioEvent) => {
    this.props.onChange(e);
  };

  render() {
    const {
      value,
      disabled,
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
