import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';

import AbstractRadio from './AbstractRadio';

export class RadioButton extends AbstractRadio {
  render() {
    const { onRadioChange } = this.context;
    if (!onRadioChange) {
      throw new Error('Radio.Button must be nested within Radio.Group');
    }

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

    const classString = cx(className, `${prefix}-radio-button`, {
      [`${prefix}-radio-button--checked`]: !!checked,
      [`${prefix}-radio-button--disabled`]: disabled || readOnly,
    });

    const widthStyle = getWidth(width);
    const wrapStyle = {
      ...style,
      ...widthStyle,
    };

    return (
      <label className={classString} style={wrapStyle}>
        <input
          {...others}
          type="radio"
          checked={!!checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={this.handleChange}
        />
        <span className={`${prefix}-radio-button__content`}>{children}</span>
      </label>
    );
  }
}

export default RadioButton;
