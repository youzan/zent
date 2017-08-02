import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Group extends (PureComponent || Component) {
  static propTypes = {
    value: PropTypes.any,
    isValueEqual: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    isValueEqual(a, b) {
      return a === b;
    },
    onChange() {}
  };

  onRadioChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { className, prefix, style, isValueEqual } = this.props;
    const children = React.Children.map(this.props.children, radio => {
      if (radio && radio.props) {
        return React.cloneElement(radio, {
          ...radio.props,
          onChange: this.onRadioChange.bind(this),
          checked: isValueEqual(this.props.value, radio.props.value),
          disabled:
            radio.props.disabled !== undefined
              ? radio.props.disabled
              : this.props.disabled,
          readOnly:
            radio.props.readOnly !== undefined
              ? radio.props.readOnly
              : this.props.readOnly
        });
      }
    });

    const classString = classNames({
      [`${prefix}-radio-group`]: true,
      [className]: !!className
    });

    return (
      <div className={classString} style={style}>
        {children}
      </div>
    );
  }
}
