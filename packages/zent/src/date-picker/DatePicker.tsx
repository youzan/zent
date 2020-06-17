import WithSinglePicker from './components/WithSinglePicker';
import DatePickerPanel from './panels/date-panel';
import { IDatePickerCommonProps } from './types';

interface IDatePickerProps extends IDatePickerCommonProps {
  placeholder?: string;
  showTime?: boolean;
}

const DefaultDatePickerProps = {
  format: 'YYYY-MM-DD',
};

export const DatePicker = WithSinglePicker<IDatePickerProps>(
  DatePickerPanel,
  DefaultDatePickerProps,
  'date'
);
export default DatePicker;
