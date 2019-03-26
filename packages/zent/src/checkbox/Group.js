import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import findIndex from './findIndex';

export default class Group extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    isValueEqual: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    value: [],
    prefix: 'zent',
    disabled: false,
    readOnly: false,
    className: '',
    style: {},
    onChange() {},
    isValueEqual(a, b) {
      return a === b;
    },
  };

  static childContextTypes = {
    checkboxGroup: PropTypes.any,
  };

  getChildContext() {
    const { value, disabled, readOnly, isValueEqual } = this.props;
    return {
      checkboxGroup: {
        value,
        disabled,
        readOnly,
        isValueEqual,
        onCheckboxChange: this.onCheckboxChange,
      },
    };
  }

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
    const { className, prefix, style, children } = this.props;

    const classString = classNames({
      [`${prefix}-checkbox-group`]: true,
      [className]: !!className,
    });

    return (
      <div className={classString} style={style}>
        {children}
      </div>
    );
  }
}
