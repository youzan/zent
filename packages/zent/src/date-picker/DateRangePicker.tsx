import * as React from 'react';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../i18n';
import DatePicker from './DatePicker';
import RangePicker from './components/RangePickerBase';

import PickerContext from './context/PickerContext';
import { generateDateConfig } from './utils/dateUtils';
import {
  IDatePickerCommonProps,
  IGenerateDateConfig,
  SingleDate,
  IShowTime,
  IValueType,
} from './types';

const generateDate: IGenerateDateConfig = generateDateConfig.date;
const PickerContextProvider = PickerContext.Provider;
interface IDateRangePickerProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: IShowTime<string[]>;
}

const DefaultDateRangeProps = {
  format: 'YYYY-MM-DD',
  valueType: 'string' as IValueType,
};
export const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const { placeholder } = props;
  return (
    <Receiver componentName="TimePicker">
      {(i18n: II18nLocaleTimePicker) => (
        <PickerContextProvider value={{ i18n }}>
          <RangePicker
            {...props}
            generateDate={generateDate}
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
