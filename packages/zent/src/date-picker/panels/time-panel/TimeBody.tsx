import * as React from 'react';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import TimeUnitColumn from './TimeUnitColumn';

import { useTimePanelValue } from '../../hooks/useTimePanelValue';
import { ITimePanelProps, ITimeUnitType } from '../../types';
import { formatDate } from '../../utils/index';
const setTimeMap = {
  hour: setHours,
  minute: setMinutes,
  second: setSeconds,
};

interface IUnitColumn {
  type: ITimeUnitType;
  format: string;
  value: number;
  disabledUnits: number[];
  max: number;
  step: number;
}

const TimePickerBody: React.FC<ITimePanelProps> = ({
  selected,
  format,
  disabledTimesOption,
  hourStep,
  minuteStep,
  secondStep,
  onSelected,
  defaultTime,
}) => {
  const { panelTime, setPanelTime } = useTimePanelValue(
    selected,
    defaultTime,
    format
  );

  const unitColumns: IUnitColumn[] = React.useMemo(() => {
    const {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    } = disabledTimesOption;
    // HH:mm:ss 对应的unitColumn
    const UnitColumnConfig: IUnitColumn[] = [
      {
        type: 'hour',
        format: 'HH',
        value: panelTime?.getHours(),
        disabledUnits: disabledHours?.() || [],
        max: 23,
        step: hourStep,
      },
      {
        type: 'minute',
        format: 'mm',
        value: panelTime?.getMinutes(),
        disabledUnits: disabledMinutes?.(panelTime?.getHours()) || [],
        max: 59,
        step: minuteStep,
      },
      {
        type: 'second',
        format: 'ss',
        value: panelTime?.getSeconds(),
        disabledUnits:
          disabledSeconds?.(panelTime?.getHours(), panelTime?.getMinutes()) ||
          [],
        max: 59,
        step: secondStep,
      },
    ];

    return UnitColumnConfig.filter(item => format.indexOf(item.format) !== -1);
  }, [
    panelTime,
    format,
    disabledTimesOption,
    hourStep,
    minuteStep,
    secondStep,
  ]);

  const setItemTime = React.useCallback(
    (val: number, type: string) => {
      const time = setTimeMap[type](panelTime, val);
      setPanelTime(time);
      onSelected(formatDate(time, format));
    },
    [panelTime, format, onSelected, setPanelTime]
  );

  return (
    <div className="zent-datepicker-time-panel-body">
      {unitColumns.map(({ type, value, step, disabledUnits }) => (
        <TimeUnitColumn
          key={type}
          type={type}
          step={step}
          selected={value}
          setting={val => setItemTime(val, type)}
          disabledUnits={disabledUnits}
        />
      ))}
    </div>
  );
};
export default TimePickerBody;
