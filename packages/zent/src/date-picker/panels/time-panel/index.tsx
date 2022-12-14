import TimeFooter from './TimeFooter';
import TimePickerBody from './TimeBody';
import { ITimePanelProps } from '../../types';

const TimePickerPanel: React.FC<React.PropsWithChildren<ITimePanelProps>> = ({
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
