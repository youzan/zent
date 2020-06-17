import * as React from 'react';
import { FC, useContext, useMemo } from 'react';
import Input from '../input';
import Icon from '../icon';
import noop from '../utils/noop';
import WithTimePicker from './components/WithTimePicker';
import { leftPad } from './utils/handler';
import I18nLocaleContext from './context/I18nLocaleContext';
import TimePickerPanel from './panels/time-panel';
import { ITimePickerProps } from './types';

interface ITimePickerTriggerProps extends ITimePickerProps {
  selected: string;
  onSelected: (value: string) => any;
}
export const TimePickerTrigger: FC<ITimePickerTriggerProps> = ({
  placeholder,
  width,
  hiddenIcon = false,
  canClear,
  disabled,
  selected,
  onSelected,
}) => {
  const { i18n } = useContext(I18nLocaleContext);
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
    onSelected('');
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

const DefaultTimePickerProps = {};
export const TimePicker = WithTimePicker(
  TimePickerTrigger,
  TimePickerPanel,
  DefaultTimePickerProps
);
export default TimePicker;
