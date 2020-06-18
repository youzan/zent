import WithSinglePicker from './components/WithSinglePicker';
import { IDatePickerCommonProps } from './types';

interface IDatePickerProps extends IDatePickerCommonProps {
  placeholder?: string;
  showTime?: boolean;
}

const DefaultDatePickerProps = {
  format: 'YYYY-MM-DD',
};

export const DatePicker = WithSinglePicker<IDatePickerProps>(
  DefaultDatePickerProps,
  'date'
);
export default DatePicker;
