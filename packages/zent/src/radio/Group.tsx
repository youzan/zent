import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'memoize-one';
import noop from 'lodash-es/noop';

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

export default class Group extends Component<IGroupProps> {
  static propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    isValueEqual: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    isValueEqual(a, b) {
      return a === b;
    },
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
