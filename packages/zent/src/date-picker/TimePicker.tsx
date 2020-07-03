import * as React from 'react';
import { FC, useContext, useMemo } from 'react';
import Input from '../input';
import Icon from '../icon';
import noop from '../utils/noop';
import Picker from './components/TimePickerBase';
import { leftPad } from './utils/handler';
import PickerContext from './context/PickerContext';
import TimePickerPanel from './panels/time-panel';
import { ITimePickerProps, ITimePickerTriggerProps } from './types';

export const TimePickerTrigger: FC<ITimePickerTriggerProps> = ({
  placeholder,
  width,
  hiddenIcon = false,
  canClear,
  disabled,
  selected,
  onSelected,
}) => {
  const { i18n } = useContext(PickerContext);
  const text = useMemo(() => {
    return selected
      ? selected
          .split(':')
          .map(item => leftPad(item))
          .join(':') || ''
      : '';
  }, [selected]);

  const onClearInput = evt => {
    evt.stopPropagation();
    onSelected('', true);
  };

  return (
    <>
      <Input
        value={text}
        disabled={disabled}
        onChange={noop}
        width={width}
        placeholder={placeholder || i18n.time}
      />

      {!hiddenIcon && (
        <>
          <Icon type="clock-o" />
          {canClear && <Icon type="close-circle" onClick={onClearInput} />}
        </>
      )}
    </>
  );
};

const DefaultTimePickerProps = {
  format: 'HH:mm:ss',
  selectedDate: null,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
};

export { ITimePickerProps };
export const TimePicker: React.FC<ITimePickerProps> = props => {
  return (
    <Picker
      {...DefaultTimePickerProps}
      {...props}
      TriggerComponent={TimePickerTrigger}
      ContentComponent={TimePickerPanel}
    />
  );
};
export default TimePicker;
