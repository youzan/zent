import DatePicker from './DatePicker';

import { IDatePickerCommonProps } from './types';
import WithRangePicker from './components/WithRangePicker';

interface IDateRangePickerProps extends IDatePickerCommonProps {
  placeholder?: string[];
  showTime?: boolean;
}

const DefaultDateRangeProps = {
  format: 'YYYY-MM-DD',
};
export const DateRangePicker = WithRangePicker<IDateRangePickerProps>(
  DatePicker,
  DefaultDateRangeProps,
  'date'
);
export default DateRangePicker;
