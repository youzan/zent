import WithSinglePicker from './components/WithSinglePicker';
import { IDatePickerCommonProps } from './types';

interface IQuarterPickerProps extends IDatePickerCommonProps {
  placeholder?: string;
}

const DefaultQuarterPickerProps = {
  format: 'YYYY-MM',
};
export const QuarterPicker = WithSinglePicker<IQuarterPickerProps>(
  DefaultQuarterPickerProps,
  'quarter'
);
export default QuarterPicker;
