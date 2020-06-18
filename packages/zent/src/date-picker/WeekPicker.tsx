import WithSinglePicker from './components/WithSinglePicker';
import { IDatePickerCommonProps } from './types';

interface IWeekPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
  showTime?: boolean;
  weekStartsOn?: number;
}

const DefaultWeekPickerProps = {
  format: 'YYYY-MM-DD',
  weekStartsOn: 1,
};
export const WeekPicker = WithSinglePicker<IWeekPickerProps>(
  DefaultWeekPickerProps,
  'week'
);
export default WeekPicker;
