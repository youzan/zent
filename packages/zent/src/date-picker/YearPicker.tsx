import WithSinglePicker from './components/WithSinglePicker';

import YearPickerPanel from './panels/year-panel';
import { IDatePickerCommonProps } from './types';

interface IYearPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultYearPickerProps = {
  format: 'YYYY',
};
export const YearPicker = WithSinglePicker<IYearPickerProps>(
  YearPickerPanel,
  DefaultYearPickerProps,
  'year'
);
export default YearPicker;
