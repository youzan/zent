import * as React from 'react';
import cx from 'classnames';
import Icon from '../../icon';

import { formatDate, formatDateRange } from '../utils';
import {
  ISingleTriggerProps,
  IRangeTriggerProps,
  DateNullArray,
} from '../types';

const TriggerPrefixCls = 'zent-datepicker-trigger';

type ITriggerDivProps = Pick<
  ISingleTriggerProps,
  'disabled' | 'canClear' | 'panelVisible' | 'width'
>;
const TriggerDiv: React.FC<ITriggerDivProps> = ({
  disabled,
  canClear,
  panelVisible,
  width,
  children,
}) => {
  const triggerStyle: React.CSSProperties = {
    width,
  };
  return (
    <div
      className={cx(TriggerPrefixCls, {
        'zent-datepicker-can-clear': !disabled && canClear,
        'zent-datepicker-disabled': disabled,
        [`${TriggerPrefixCls}-focus`]: panelVisible,
      })}
      style={triggerStyle}
    >
      {children}
    </div>
  );
};
export const SingleInputTrigger: React.FC<ISingleTriggerProps> = ({
  value,
  format,
  seperator,
  placeholder,
  onClearInput,
  text,
  name,
  canClear,
  icon,
  hiddenIcon,
  ...restProps
}) => {
  const [startText, endText] = Array.isArray(text) ? text : [text];
  const { disabled } = restProps;
  const canClearMerge = canClear && !!value;

  return (
    <TriggerDiv {...restProps} canClear={canClearMerge}>
      {name && (
        <input
          type="hidden"
          name={name}
          readOnly
          value={formatDate(format, value)}
        />
      )}
      <span
        className={cx(`${TriggerPrefixCls}-input`, {
          [`${TriggerPrefixCls}-empty-input`]: !startText || disabled,
        })}
      >
        {startText || placeholder}
      </span>
      {endText && (
        <>
          <span className={`${TriggerPrefixCls}-seperator`}>{seperator}</span>
          <span
            className={cx(`${TriggerPrefixCls}-input`, {
              [`${TriggerPrefixCls}-empty-input`]: !endText,
            })}
          >
            {endText}
          </span>
        </>
      )}
      {!hiddenIcon && (
        <>
          <Icon type={icon || 'calendar-o'} />
          {canClearMerge && <Icon type="close-circle" onClick={onClearInput} />}
        </>
      )}
    </TriggerDiv>
  );
};

interface ICombinedInputTriggerProps extends IRangeTriggerProps {
  selected: DateNullArray;
}
export const CombinedInputTrigger: React.FC<ICombinedInputTriggerProps> = ({
  format,
  value,
  selected,
  seperator,
  placeholder: [startPlaceholder, endPlaceholder],
  name,
  canClear,
  icon,
  onClearInput,
  ...restProps
}) => {
  const [leftText, rightText] = React.useMemo(() => {
    if (!selected) return [null, null];
    return formatDateRange(selected, format);
  }, [selected, format]);

  return (
    <TriggerDiv
      {...restProps}
      canClear={canClear && (!!leftText || !!rightText)}
    >
      {name && (
        <>
          <input
            type="hidden"
            name={name?.[0]}
            readOnly
            value={formatDate(format, value?.[0])}
          />
          <input
            readOnly
            type="hidden"
            name={name?.[1]}
            value={formatDate(format, value?.[1])}
          />
        </>
      )}
      <span
        className={cx(`${TriggerPrefixCls}-input`, {
          [`${TriggerPrefixCls}-empty-input`]: !leftText,
        })}
      >
        {leftText || startPlaceholder}
      </span>
      <span className={`${TriggerPrefixCls}-seperator`}>{seperator}</span>
      <span
        className={cx(`${TriggerPrefixCls}-input`, {
          [`${TriggerPrefixCls}-empty-input`]: !rightText,
        })}
      >
        {rightText || endPlaceholder}
      </span>
      <Icon type={icon || 'calendar-o'} />
      <Icon type="close-circle" onClick={onClearInput} />
    </TriggerDiv>
  );
};
