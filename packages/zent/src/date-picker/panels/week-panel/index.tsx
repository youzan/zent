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
  const { generateDate, i18n } = React.useContext(PickerContext);
  const options = React.useMemo(
    () => ({ weekStartsOn: WeekStartsOnMap[weekStartsOn] }),
    [weekStartsOn]
  );
  // special handler on week-picker
  const hoverRangeDate = useWeekRange(hoverDate, generateDate, options);
  const rangeDate = useWeekRange(selected, generateDate, options);

  return (
    <DatePickerPanel
      {...resetProps}
      footerText={i18n.current.week}
      selected={selected}
      hoverDate={hoverDate}
      rangeDate={rangeDate}
      hoverRangeDate={hoverRangeDate}
    />
  );
};
export default WeekPickerPanel;
