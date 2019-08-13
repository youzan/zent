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
  const disabledCtx = React.useContext(DisabledContext);
  const groupCtx = React.useContext(GroupContext);
  if (!groupCtx) {
    throw new Error('Radio.Button must be nested within Radio.Group');
  }
  const { checked, disabled, readOnly } = getRadioState(
    disabledCtx,
    groupCtx,
    props
  );
  const onChange = useRadioHandler(groupCtx, props);

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
