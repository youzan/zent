import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import PickerContext from './context/PickerContext';
import { generateDateConfig } from './utils/dateUtils';
import {
  ICommonProps,
  IGenerateDateConfig,
  SingleDate,
  IShowTime,
  IDisabledTimes,
  RangeTypeMap,
} from './types';
import { getRangeValuesWithValueType } from './utils/getValueInRangePicker';
import getRangeDisabledTimes from './utils/getRangeDisabledTimes';

const generateDate: IGenerateDateConfig = generateDateConfig.date;
const PickerContextProvider = PickerContext.Provider;
interface IDateRangePickerProps extends ICommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: IShowTime<string[]>;
  disabledTimes?: IDisabledTimes;
}

const DefaultDateRangeProps: Partial<IDateRangePickerProps> = {
  format: 'YYYY-MM-DD',
  valueType: 'string',
};
export const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const { placeholder, valueType, format, disabledTimes } = props;
  const getCallbackValue = React.useCallback(
    val => getRangeValuesWithValueType(val, valueType, format),
    [valueType, format]
  );

  const getStartCustomProps = (
    val: [Date, Date]
  ): { disabledTimes: IDisabledTimes } => {
    const { disabledStartTimes } = getRangeDisabledTimes({
      selected: val,
      disabledTimes,
    });
    return { disabledTimes: disabledStartTimes(RangeTypeMap.START) };
  };
  const getEndCustomProps = (
    val: [Date, Date]
  ): { disabledTimes: IDisabledTimes } => {
    const { disabledEndTimes } = getRangeDisabledTimes({
      selected: val,
      disabledTimes,
    });
    return { disabledTimes: disabledEndTimes(RangeTypeMap.END) };
  };

  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider
          value={{
            i18n,
            getCallbackValue,
            getStartCustomProps,
            getEndCustomProps,
          }}
        >
          <RangePicker
            {...props}
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
