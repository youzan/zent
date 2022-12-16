import TimeFooter from './TimeFooter';
import TimePickerBody from './TimeBody';
import { ITimePanelProps } from '../../types';
import { FC, PropsWithChildren } from 'react';

const TimePickerPanel: FC<PropsWithChildren<ITimePanelProps>> = ({
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
