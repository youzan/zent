import * as React from 'react';

import TimePickerFooter from './TimeFooter';
import TimePickerBody from './TimeBody';
import { ITimePanelProps } from '../../types';

const TimePickerPanel: React.FC<ITimePanelProps> = props => {
  return (
    <div className="zent-datepicker-panel">
      <TimePickerBody {...props} />
      <TimePickerFooter {...props} />
    </div>
  );
};
export default TimePickerPanel;
