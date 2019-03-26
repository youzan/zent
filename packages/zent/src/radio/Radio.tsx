import * as React from 'react';
import classNames from 'classnames';

import getWidth from '../utils/getWidth';
import AbstractRadio from './AbstractRadio';
import Group from './Group';
import Button from './RadioButton';

export class Radio extends AbstractRadio {
  static Group = Group;
  static Button = Button;

  render() {
    const {
      className,
      style,
      prefix,
      children,

      // value 不要放到 input 上去
      value,
      width,
      ...others
    } = this.props;
    const { checked, disabled, readOnly } = this.getRadioState();

    const classString = classNames(className, `${prefix}-radio-wrap`, {
      [`${prefix}-radio-checked`]: !!checked,
      [`${prefix}-radio-disabled`]: disabled || readOnly,
    });

    const widthStyle = getWidth(width);
    const wrapStyle = {
      ...style,
      ...widthStyle,
    };

    return (
      <label className={classString} style={wrapStyle}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`} />
          <input
            {...others}
            type="radio"
            checked={!!checked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        </span>
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  }
}

export default Radio;
