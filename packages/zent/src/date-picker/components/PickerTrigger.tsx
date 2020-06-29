import * as React from 'react';
import cx from 'classnames';
import Input from '../../input';
import Icon from '../../icon';

import noop from '../../utils/noop';
import { formatDateRange, formatDate } from '../utils';
import { ISingleTriggerProps, IRangeTriggerProps } from '../types';

export const SingleInputTrigger: React.FC<ISingleTriggerProps> = ({
  canClear,
  disabled,
  width,
  value,
  format,
  placeholder,
  onClearInput,
  text,
  name,
}) => {
  return (
    <>
      {name && (
        <div className="zent-datepicker-name-input">
          <input
            name={name}
            readOnly
            value={value ? formatDate(value, format) : ''}
          />
        </div>
      )}
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

const COMBINED_PREFIXCLS = 'zent-datepicker-combined-trigger';
interface ICombinedInputTriggerProps extends IRangeTriggerProps {
  format: string;
  selected: [Date, Date];
}
export const CombinedInputTrigger: React.FC<ICombinedInputTriggerProps> = ({
  format,
  value,
  selected,
  seperator,
  placeholder,
  name,
  onClearInput,
}) => {
  const text = React.useMemo(() => {
    if (!selected) return [null, null];
    return formatDateRange(selected, format);
  }, [selected, format]);

  return (
    <>
      {name && (
        <div className="zent-datepicker-name-input">
          <input
            name={name[0]}
            readOnly
            value={value[0] ? formatDate(value[0], format) : ''}
          />
          <input
            readOnly
            name={name[1]}
            value={value[1] ? formatDate(value[1], format) : ''}
          />
        </div>
      )}
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
