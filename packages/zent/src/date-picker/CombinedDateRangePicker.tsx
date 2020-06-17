import RangePickerPanel from './panels/combined-date-range-panel';
import WithCombinedPicker from './components/WithCombinedPicker';
import { IDatePickerCommonProps, SingleDate } from './types';

interface ICombinedDateRangeProps
  extends IDatePickerCommonProps<[SingleDate, SingleDate]> {
  placeholder?: string[];
  showTime?: boolean;
  width?: number;
}
const DefaultCombinedDateRangeProps = {
  format: 'YYYY-MM-DD',
};
export const CombinedDateRangePicker = WithCombinedPicker<
  ICombinedDateRangeProps
>(RangePickerPanel, DefaultCombinedDateRangeProps, 'date');

export default CombinedDateRangePicker;
