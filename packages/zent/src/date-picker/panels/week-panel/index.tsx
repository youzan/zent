import * as React from 'react';
import DatePickerPanel from '../date-panel';

import { ISingleDatePanelProps } from '../../types';

const WeekPickerPanel: React.FC<ISingleDatePanelProps> = props => {
  return <DatePickerPanel {...props} />;
};
export default WeekPickerPanel;
