import { useContext, useMemo } from 'react';

import DatePickerPanel from '../date-panel';
import useWeekRange from '../../hooks/useWeekRange';
import { ISinglePanelProps } from '../../types';
import { IWeekPickerProps } from '../../WeekPicker';
import PickerContext from '../../context/PickerContext';

const WeekPickerPanel: React.FC<
  ISinglePanelProps & Pick<IWeekPickerProps, 'weekStartsOn'>
> = ({ selected, hoverDate, weekStartsOn, ...restProps }) => {
  const { generateDate, i18n } = useContext(PickerContext);
  const options = useMemo(() => ({ weekStartsOn }), [weekStartsOn]);
  // special handler on week-picker
  const hoverRangeDate = useWeekRange(generateDate, hoverDate, options);
  const rangeDate = useWeekRange(generateDate, selected, options);

  return (
    <DatePickerPanel
      {...restProps}
      footerText={i18n.current.week}
      selected={selected}
      rangeDate={rangeDate}
      hoverRangeDate={hoverRangeDate}
    />
  );
};
export default WeekPickerPanel;
