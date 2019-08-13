import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';
import { IRadioProps, getRadioState, useRadioHandler } from './AbstractRadio';
import Group from './Group';
import Button from './RadioButton';
import { DisabledContext } from '../disabled';
import GroupContext from './GroupContext';

function Radio<Value>(props: IRadioProps<Value>) {
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
  const { checked, disabled, readOnly } = getRadioState(
    disabledCx,
    groupCx,
    props
  );
  const onChange = useRadioHandler(groupCx, props);

  const classString = cx(className, 'zent-radio-wrap', {
    'zent-radio-checked': !!checked,
    'zent-radio-disabled': disabled || readOnly,
  });

  const widthStyle = getWidth(width);
  const wrapStyle = {
    ...style,
    ...widthStyle,
  };

  return (
    <label className={classString} style={wrapStyle}>
      <span className="zent-radio">
        <span className="zent-radio-inner" />
        <input
          {...others}
          type="radio"
          checked={!!checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
        />
      </span>
      {children !== undefined && <span>{children}</span>}
    </label>
  );
}

Radio.Button = Button;
Radio.Group = Group;

export { Radio };

export default Radio;
