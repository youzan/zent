import * as React from 'react';
import cx from 'classnames';
import Input from '../../input';
import Icon from '../../icon';
import noop from '../../utils/noop';
import useInputText, { IUseInputTextParams } from '../hooks/useInputText';
import useInputRangeText from '../hooks/useInputRangeText';

import { ISingleTriggerProps, IRangeTriggerProps } from '../types';

export const SingleInputTrigger: React.FC<ISingleTriggerProps &
  IUseInputTextParams> = ({
  canClear,
  disabled,
  width,
  placeholder,
  onClearInput,
  selected,
  format,
  i18n,
  type,
  options,
}) => {
  const text = useInputText({ selected, format, i18n, type, options });
  return (
    <>
      <Input
        value={text}
        onChange={noop}
        width={width}
        disabled={disabled}
        placeholder={placeholder}
      />
      <Icon type="calendar-o" />
      {canClear && <Icon type="close-circle" onClick={onClearInput} />}
    </>
  );
};

const COMBINED_PREFIXCLS = 'zent-date-picker-combined-trigger';
interface ICombinedInputTriggerProps extends IRangeTriggerProps {
  format: string;
  selected: [Date, Date];
}
export const CombinedInputTrigger: React.FC<ICombinedInputTriggerProps> = ({
  format,
  selected,
  seperator,
  placeholder,
  onClearInput,
}) => {
  const text = useInputRangeText(selected, format);
  return (
    <>
      <span
        className={cx(`${COMBINED_PREFIXCLS}-input`, {
          [`${COMBINED_PREFIXCLS}-empty-input`]: !text[0],
        })}
      >
        {text[0] || placeholder[0]}
      </span>
      <span className={`${COMBINED_PREFIXCLS}-seperator`}>{seperator}</span>
      <span
        className={cx(`${COMBINED_PREFIXCLS}-input`, {
          [`${COMBINED_PREFIXCLS}-empty-input`]: !text[1],
        })}
      >
        {text[1] || placeholder[1]}
      </span>
      <Icon type="calendar-o" />
      <Icon type="close-circle" onClick={onClearInput} />
    </>
  );
};
