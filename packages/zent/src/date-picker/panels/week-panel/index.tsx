import * as React from 'react';
import DatePickerPanel from '../date-panel';
import useWeekRange from '../../hooks/useWeekRange';

import { ISingleDatePanelProps, WeekStartsOnMap } from '../../types';
import { IWeekPickerProps } from '../../WeekPicker';
import PickerContext from '../../context/PickerContext';

const WeekPickerPanel: React.FC<ISingleDatePanelProps &
  Pick<IWeekPickerProps, 'weekStartsOn'>> = ({
  selected,
  hoverDate,
  weekStartsOn,
  ...resetProps
}) => {
  const { generateDate } = React.useContext(PickerContext);
  const options = { weekStartsOn: WeekStartsOnMap[weekStartsOn] };
  // special handler on week-picker
  const hoverRangeDate = useWeekRange(hoverDate, generateDate, options);
  const rangeDate = useWeekRange(selected, generateDate, options);

  return (
    <DatePickerPanel
      {...resetProps}
      selected={selected}
      hoverDate={hoverDate}
      rangeDate={rangeDate}
      hoverRangeDate={hoverRangeDate}
    />
  );
};
export default WeekPickerPanel;
