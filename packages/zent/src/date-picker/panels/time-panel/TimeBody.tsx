import * as React from 'react';
import { useState } from 'react';
import ScrollPanel from './ScrollPanel';
import PanelContext from '../../context/PanelContext';
import { ITimePanelProps } from '../../types';

function usePanelTime(selected: string) {
  const [panelTime, setPanelTime] = useState<string[]>([]);
  React.useEffect(() => {
    setPanelTime(selected?.split(':') || []);
  }, [selected]);

  return { panelTime, setPanelTime };
}

const TimePickerBody: React.FC<ITimePanelProps> = ({
  selected,
  onSelected,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
}) => {
  const { panelTime, setPanelTime } = usePanelTime(selected);
  const { visibleChange } = React.useContext(PanelContext);
  const setTimes = (val, index) => {
    panelTime[index] = val;
    setPanelTime(panelTime);
    panelTime.length &&
      onSelected(
        `${panelTime[0] || 0}:${panelTime[1] || 0}:${panelTime[2] || 0}`
      );
  };

  return (
    <div className="zent-date-picker-time-panel-body">
      <ScrollPanel
        type="hour"
        selected={+panelTime[0]}
        setting={val => {
          setTimes(val, 0);
        }}
        visibleChange={visibleChange}
        disabledUnits={disabledHours()}
      />
      <ScrollPanel
        type="minute"
        selected={+panelTime[1]}
        visibleChange={visibleChange}
        setting={val => setTimes(val, 1)}
        disabledUnits={disabledMinutes(+panelTime[0])}
      />
      <ScrollPanel
        type="second"
        visibleChange={visibleChange}
        selected={+panelTime[2]}
        setting={val => setTimes(val, 2)}
        disabledUnits={disabledSeconds(+panelTime[0], +panelTime[1])}
      />
    </div>
  );
};
export default TimePickerBody;
