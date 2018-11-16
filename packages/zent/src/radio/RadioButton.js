import React from 'react';
import cx from 'classnames';
import assign from 'lodash/assign';
import getWidth from 'utils/getWidth';

import Radio from './Radio';

export default class RadioButton extends Radio {
  render() {
    const {
      className,
      style,
      prefix,
      children,

      // value不要放到input上去
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
    const wrapStyle = assign({}, style, widthStyle);

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
