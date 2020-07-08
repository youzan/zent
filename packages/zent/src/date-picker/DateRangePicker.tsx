import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import { DisabledContext } from '../disabled';
import PickerContext from './context/PickerContext';
import { generateDateConfig } from './utils/dateUtils';
import {
  ICommonProps,
  IGenerateDateConfig,
  RangeDate,
  IShowTime,
  IDisabledTimes,
} from './types';
import { getRangeValuesWithValueType } from './utils/getValueInRangePicker';
import { INPUT_WIDTH, SINGLE_INPUT_WIDTH, DATE_FORMAT } from './constants';

const generateDate: IGenerateDateConfig = generateDateConfig.date;
const PickerContextProvider = PickerContext.Provider;
export interface IDateRangePickerProps extends ICommonProps<RangeDate> {
  placeholder?: string[];
  showTime?: IShowTime<string[]>;
  disabledTimes?: IDisabledTimes;
}

const DefaultDateRangeProps: Partial<IDateRangePickerProps> = {
  format: DATE_FORMAT,
  valueType: 'string',
};
export const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const { placeholder, valueType, format, width, showTime, disabled } = props;
  const disabledContext = React.useContext(DisabledContext);

  const getCallbackValue = React.useCallback(
    val => getRangeValuesWithValueType(val, valueType, format),
    [valueType, format]
  );

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
            getCallbackValue,
          }}
        >
          <RangePicker
            {...props}
            disabled={disabledContext.value || disabled}
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
DateRangePicker.defaultProps = DefaultDateRangeProps;
export default DateRangePicker;
