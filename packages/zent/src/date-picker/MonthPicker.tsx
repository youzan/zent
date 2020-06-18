import WithSinglePicker from './components/WithSinglePicker';
import { IDatePickerCommonProps } from './types';

interface IMonthPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultMonthPickerProps = {
  format: 'YYYY-MM',
};
export const MonthPicker = WithSinglePicker<IMonthPickerProps>(
  DefaultMonthPickerProps,
  'month'
);
export default MonthPicker;
