import WithSinglePicker from './components/WithSinglePicker';
import MonthPickerPanel from './panels/month-panel';
import { IDatePickerCommonProps } from './types';

interface IMonthPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultMonthPickerProps = {
  format: 'YYYY-MM',
};
export const MonthPicker = WithSinglePicker<IMonthPickerProps>(
  MonthPickerPanel,
  DefaultMonthPickerProps,
  'month'
);
export default MonthPicker;
