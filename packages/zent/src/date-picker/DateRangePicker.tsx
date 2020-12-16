import { useContext, useCallback } from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { dateConfig } from './utils/dateUtils';
import {
  IGenerateDateConfig,
  IRangeProps,
  IShowTimeRange,
  IDisabledTime,
  DateNullTuple,
  IValueType,
  IRangeRelatedType,
} from './types';
import { getRangeValuesWithValueType } from './utils/getValueInRangePicker';
import {
  INPUT_WIDTH,
  SINGLE_INPUT_WIDTH,
  DATE_FORMAT,
  defaultDatePickerCommonProps,
} from './constants';

const generateDate: IGenerateDateConfig = dateConfig.date;
const PickerContextProvider = PickerContext.Provider;
export interface IDateRangePickerProps<T extends IValueType = 'string'>
  extends Omit<IRangeProps, 'valueType' | 'onChange'>,
    IRangeRelatedType<T> {
  showTime?: IShowTimeRange<string>;
  disabledTime?: IDisabledTime;
  hideFooter?: boolean;
}
const DefaultDateRangeProps = {
  format: DATE_FORMAT,
};

export const DateRangePicker = <T extends IValueType = 'string'>(
  props: IDateRangePickerProps<T>
) => {
  const disabledContext = useContext(DisabledContext);
  const propsRequired = {
    ...defaultDatePickerCommonProps,
    ...DefaultDateRangeProps,
    ...props,
  };

  const {
    placeholder,
    valueType,
    format,
    width,
    showTime,
    disabled = disabledContext.value,
  } = propsRequired;

  const getCallbackRangeValue = useCallback(
    (val: DateNullTuple) => getRangeValuesWithValueType(valueType, format, val),
    [valueType, format]
  );

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
            autoComplete: !!showTime,
            getCallbackRangeValue,
          }}
        >
          <RangePicker
            {...propsRequired}
            disabled={disabled}
            width={width ?? (!!showTime ? INPUT_WIDTH : SINGLE_INPUT_WIDTH)}
            generateDate={generateDate}
            seperator={i18n.to}
            placeholder={placeholder || [i18n.start, i18n.end]}
            PickerComponent={DatePicker}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default DateRangePicker;
