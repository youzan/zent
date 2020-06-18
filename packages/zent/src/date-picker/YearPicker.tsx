import WithSinglePicker from './components/WithSinglePicker';

import { IDatePickerCommonProps } from './types';

interface IYearPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultYearPickerProps = {
  format: 'YYYY',
};
export const YearPicker = WithSinglePicker<IYearPickerProps>(
  DefaultYearPickerProps,
  'year'
);
export default YearPicker;
