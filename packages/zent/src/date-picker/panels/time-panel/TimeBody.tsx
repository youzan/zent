import * as React from 'react';
import TimeUnitColumn from './TimeUnitColumn';

import { useTimePanelValue } from '../../hooks/useTimePanelValue';
import { ITimePanelProps, ITimeUnitType } from '../../types';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import { formatDate } from '../../utils/index';

interface IUnitColumn {
  type: ITimeUnitType;
  setValue: (Data, number) => Date;
  value: number;
  disabledUnits: number[];
  max: number;
  step: number;
}

const TimePickerBody: React.FC<ITimePanelProps> = ({
  selected,
  showSecond,
  onSelected,
  disabledTimes,
}) => {
  const format = React.useMemo(() => (showSecond ? 'HH:mm:ss' : 'HH:mm'), [
    showSecond,
  ]);
  const { panelTime, setPanelTime } = useTimePanelValue(selected, format);

  const unitColumns: IUnitColumn[] = React.useMemo(() => {
    const { disabledHours, disabledMinutes, disabledSeconds } = disabledTimes;

    const UnitColumnConfig = [
      {
        type: 'hour' as ITimeUnitType,
        value: panelTime.getHours(),
        disabledUnits: disabledHours(),
        max: 23,
        step: 1,
        setValue: setHours,
      },
      {
        type: 'minute' as ITimeUnitType,
        value: panelTime.getMinutes(),
        disabledUnits: disabledMinutes(panelTime.getHours()),
        max: 59,
        step: 1,
        setValue: setMinutes,
      },
      {
        type: 'second' as ITimeUnitType,
        value: panelTime.getSeconds(),
        disabledUnits: disabledSeconds(
          panelTime.getHours(),
          panelTime.getMinutes()
        ),
        max: 59,
        step: 1,
        setValue: setSeconds,
      },
    ];
    return showSecond
      ? UnitColumnConfig
      : (UnitColumnConfig.splice(0, 2) as IUnitColumn[]);
  }, [panelTime, showSecond, disabledTimes]);

  React.useEffect(() => {
    onSelected(formatDate(panelTime, format));
  }, [panelTime, format, onSelected]);

  return (
    <div className="zent-datepicker-time-panel-body">
      {unitColumns.map(({ type, value, setValue, disabledUnits }) => (
        <TimeUnitColumn
          key={type}
          type={type}
          selected={value}
          setting={val => setPanelTime(setValue(panelTime, val))}
          disabledUnits={disabledUnits}
        />
      ))}
    </div>
  );
};
export default TimePickerBody;
