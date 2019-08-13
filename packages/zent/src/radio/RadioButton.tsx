import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';

import { getRadioState, useRadioHandler, IRadioProps } from './AbstractRadio';
import { DisabledContext } from '../disabled';
import GroupContext from './GroupContext';

export function RadioButton<Value>(props: IRadioProps<Value>) {
  const {
    className,
    style,
    children,

    // value 不要放到 input 上去
    value,
    width,
    ...others
  } = props;
  const disabledCx = React.useContext(DisabledContext);
  const groupCx = React.useContext(GroupContext);
  if (!groupCx) {
    throw new Error('Radio.Button must be nested within Radio.Group');
  }
  const { checked, disabled, readOnly } = getRadioState(
    disabledCx,
    groupCx,
    props
  );
  const onChange = useRadioHandler(groupCx, props);

  const classString = cx(className, 'zent-radio-button', {
    'zent-radio-button--checked': !!checked,
    'zent-radio-button--disabled': disabled || readOnly,
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
        onChange={onChange}
      />
      <span className="zent-radio-button__content">{children}</span>
    </label>
  );
}

export default RadioButton;
