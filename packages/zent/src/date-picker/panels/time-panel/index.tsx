import TimeFooter from './TimeFooter';
import TimePickerBody from './TimeBody';
import { ITimePanelProps } from '../../types';

const TimePickerPanel: React.FC<ITimePanelProps> = ({
  hideFooter,
  ...restprops
}) => {
  return (
    <>
      <TimePickerBody {...restprops} />
      {!hideFooter && <TimeFooter {...restprops} />}
    </>
  );
};
export default TimePickerPanel;
