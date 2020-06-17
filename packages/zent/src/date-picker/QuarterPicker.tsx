import WithSinglePicker from './components/WithSinglePicker';

import QuarterPickerPanel from './panels/quarter-panel';
import { IDatePickerCommonProps } from './types';

interface IQuarterPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultQuarterPickerProps = {
  format: 'YYYY-MM',
};
export const QuarterPicker = WithSinglePicker<IQuarterPickerProps>(
  QuarterPickerPanel,
  DefaultQuarterPickerProps,
  'quarter'
);
export default QuarterPicker;
