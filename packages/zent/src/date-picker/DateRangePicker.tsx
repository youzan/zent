import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import PickerContext from './context/PickerContext';
import {
  setDate,
  getDate,
  addDays,
  isSameDay,
  startOfDay,
  endOfDay,
  endOfMonth,
} from 'date-fns';
import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  SingleDate,
  IShowTime,
} from './types';

const generateDateConfig: IGenerateDateConfig = {
  set: setDate,
  get: getDate,
  offsetDate: addDays,
  isSame: isSameDay,
  startDate: startOfDay,
  endDate: endOfDay,
  circleEndDate: endOfMonth,
};
const PickerContextProvider = PickerContext.Provider;
interface IDateRangePickerProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: IShowTime<string[]>;
}

const DefaultDateRangeProps = {
  format: 'YYYY-MM-DD',
};
export const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const { placeholder } = props;
  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider value={{ i18n }}>
          <RangePicker
            {...DefaultDateRangeProps}
            {...props}
            generateDateConfig={generateDateConfig}
            placeholder={placeholder || [i18n.start, i18n.end]}
            PickerComponent={DatePicker}
          />
        </PickerContextProvider>
      )}
    </Receiver>
  );
};
export default DateRangePicker;
