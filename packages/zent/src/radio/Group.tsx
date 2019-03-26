import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import noop from 'lodash-es/noop';
import eq from 'lodash-es/eq';

import memoize from '../utils/memorize-one';
import GroupContext from './GroupContext';

const GroupContextProvider = GroupContext.Provider;

export interface IGroupProps {
  value: any;
  disabled?: boolean;
  readOnly?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isValueEqual?: (value1: any, value2: any) => boolean;
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
}

export class RadioGroup extends Component<IGroupProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    isValueEqual: eq,
    onChange: noop,
  };

  getGroupContext = memoize((value, disabled, readOnly, isValueEqual) => ({
    value,
    disabled,
    readOnly,
    isValueEqual,
    onRadioChange: this.onRadioChange,
  }));

  onRadioChange = e => {
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

    const classString = classNames({
      [`${prefix}-radio-group`]: true,
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

export default RadioGroup;
