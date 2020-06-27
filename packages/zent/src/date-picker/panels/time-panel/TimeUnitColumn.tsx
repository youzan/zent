import * as React from 'react';
import cx from 'classnames';
import PanelContext from '../../context/PanelContext';

import { leftPad } from '../../utils/handler';
import scroll from '../../../utils/scroll';
const prefixCls = 'zent-datepicker-time-panel-body';
interface IUnit {
  label: React.ReactText;
  value: number;
  disabled?: boolean;
}

function generateUnits(start: number, end: number, disabledUnits: number[]) {
  const units: IUnit[] = [];
  for (let i = start; i <= end; i++) {
    units.push({
      label: leftPad(i, 2),
      value: i,
      disabled: disabledUnits.includes(i),
    });
  }
  return units;
}
type IUnitType = 'hour' | 'minute' | 'second';

const UNIT_MAP: Record<IUnitType, number> = {
  hour: 23,
  minute: 59,
  second: 59,
};

interface ITimeUnitColumnProps {
  type: IUnitType;
  selected: number;
  setting: (val: number) => void;
  disabledUnits?: number[];
}
const TimeUnitColumn: React.FC<ITimeUnitColumnProps> = ({
  type,
  selected,
  setting,
  disabledUnits = [],
}) => {
  const ulRef = React.createRef<HTMLDivElement>();
  const { visibleChange } = React.useContext(PanelContext);

  const units = generateUnits(0, UNIT_MAP[type], disabledUnits);

  React.useLayoutEffect(() => {
    // first scroll without duration
    visibleChange && scroll(ulRef.current, 0, selected * 32, 0);
    // scroll item when `selected` changed
    selected && !visibleChange && scroll(ulRef.current, 0, selected * 32, 160);
  }, [selected, visibleChange, ulRef]);

  return (
    <div className={`${prefixCls}_scroll`} ref={ulRef}>
      {units.map(({ value, label, disabled }) => {
        return (
          <div
            className={cx(`${prefixCls}-unit`, {
              [`${prefixCls}-unit_selected`]: value === selected,
              [`${prefixCls}-unit_disabled`]: disabled,
            })}
            key={value}
            onClick={() => setting(value)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default TimeUnitColumn;
