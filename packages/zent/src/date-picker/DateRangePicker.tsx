import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { dateConfig } from './utils/dateUtils';
import {
  IGenerateDateConfig,
  IRangeProps,
  IShowTime,
  IDisabledTime,
  StringArray,
  DateNullArray,
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
export interface IDateRangePickerProps extends IRangeProps {
  showTime?: IShowTime<StringArray>;
  disabledTime?: IDisabledTime;
}
const DefaultDateRangeProps = {
  format: DATE_FORMAT,
};

export const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const disabledContext = React.useContext(DisabledContext);
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

  const getCallbackRangeValue = React.useCallback(
    (val: DateNullArray) => getRangeValuesWithValueType(valueType, format, val),
    [valueType, format]
  );

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
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
