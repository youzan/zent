import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Group extends PureComponent {
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
    onChange() {},
  };

  static childContextTypes = {
    radioGroup: PropTypes.any,
  };

  getChildContext() {
    const { value, isValueEqual, disabled, readOnly } = this.props;
    return {
      radioGroup: {
        value,
        disabled,
        readOnly,
        isValueEqual,
        onRadioChange: this.onRadioChange,
      },
    };
  }

  onRadioChange = e => {
    this.props.onChange(e);
  };

  render() {
    const { className, prefix, style, children } = this.props;

    const classString = classNames({
      [`${prefix}-radio-group`]: true,
      [className]: !!className,
    });

    return (
      <div className={classString} style={style}>
        {children}
      </div>
    );
  }
}
