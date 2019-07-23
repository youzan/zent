import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';

import AbstractRadio from './AbstractRadio';
import { IDisabledContext } from '../disabled';

export class RadioButton<Value> extends AbstractRadio<Value> {
  renderImpl(disabledCtx: IDisabledContext) {
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
    const { checked, disabled, readOnly } = this.getRadioState(disabledCtx);

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
