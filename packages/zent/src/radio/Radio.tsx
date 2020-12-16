import cx from 'classnames';

import getWidth from '../utils/getWidth';
import { IRadioProps, getRadioState, useRadioHandler } from './AbstractRadio';
import RadioGroup from './Group';
import RadioButton from './RadioButton';
import { DisabledContext } from '../disabled';
import GroupContext from './GroupContext';
import { useContext } from 'react';

function Radio<Value>(
  props: IRadioProps<Value> & { labelStyle?: React.CSSProperties }
) {
  const {
    className,
    style,
    children,

    // value 不要放到 input 上去
    value,
    width,

    labelStyle,

    ...others
  } = props;
  const disabledCtx = useContext(DisabledContext);
  const groupCtx = useContext(GroupContext);
  const { checked, disabled, readOnly } = getRadioState(
    disabledCtx,
    groupCtx,
    props
  );
  const onChange = useRadioHandler(groupCtx, props);

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
      {children !== undefined && (
        <span className="zent-radio-label" style={labelStyle}>
          {children}
        </span>
      )}
    </label>
  );
}

Radio.Button = RadioButton;
Radio.Group = RadioGroup;

export { Radio };

export default Radio;
