import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import findIndex from 'lodash-es/findIndex';
import eq from 'lodash-es/eq';
import memoize from '../utils/memorize-one';

import GroupContext from './GroupContext';

const GroupContextProvider = GroupContext.Provider;

export interface ICheckboxGroupProps {
  value: Array<any>;
  isValueEqual?: (value1: any, value2: any) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (values: Array<any>) => void;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export class CheckboxGroup extends Component<ICheckboxGroupProps> {
  static defaultProps = {
    value: [],
    prefix: 'zent',
    disabled: false,
    readOnly: false,
    className: '',
    style: {},
    onChange() {},
    isValueEqual: eq,
  };

  getGroupContext = memoize((value, disabled, readOnly, isValueEqual) => ({
    value,
    disabled,
    readOnly,
    isValueEqual,
    onCheckboxChange: this.onCheckboxChange,
  }));

  onCheckboxChange = e => {
    const changedValue = e.target.value;
    const groupValue = this.props.value.slice();
    const { isValueEqual } = this.props;
    const index = findIndex(groupValue, val => isValueEqual(val, changedValue));

    if (index !== -1) {
      groupValue.splice(index, 1);
    } else {
      groupValue.push(changedValue);
    }

    this.props.onChange(groupValue);
  };

  render() {
    const {
      className,
      prefix,
      style,
      children,
      value,
      disabled,
      readOnly,
      isValueEqual,
    } = this.props;

    const classString = classNames({
      [`${prefix}-checkbox-group`]: true,
      [className]: !!className,
    });

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
