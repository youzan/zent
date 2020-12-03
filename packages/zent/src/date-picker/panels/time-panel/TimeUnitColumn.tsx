import { createRef, useContext, useLayoutEffect } from 'react';
import cx from 'classnames';

import PanelContext from '../../context/PanelContext';
import { smoothScroll } from '../../../utils/scroll';

const prefixCls = 'zent-datepicker-time-panel-body';
interface IUnit {
  label: React.ReactText;
  value: number;
  disabled?: boolean;
}

function generateUnits(
  start: number,
  end: number,
  step: number,
  disabledUnits: number[]
) {
  const units: IUnit[] = [];
  for (let i = start; i <= end; i += step) {
    units.push({
      label: i.toString().padStart(2, '0'),
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
  step?: number;
  setting: (val: number) => void;
  disabledUnits?: number[];
}
const TimeUnitColumn: React.FC<ITimeUnitColumnProps> = ({
  type,
  step = 1,
  selected,
  setting,
  disabledUnits = [],
}) => {
  const ulRef = createRef<HTMLDivElement>();
  const { visibleChange } = useContext(PanelContext);

  const units = generateUnits(0, UNIT_MAP[type], step, disabledUnits);

  useLayoutEffect(() => {
    // first scroll without duration
    visibleChange &&
      ulRef.current &&
      smoothScroll(ulRef.current, 0, (selected * 32) / step, 1);

    // scroll item when `selected` changed
    selected &&
      !visibleChange &&
      ulRef.current &&
      smoothScroll(ulRef.current, 0, (selected * 32) / step, 160);
  }, [selected, visibleChange, ulRef, step]);

  return (
    <div className={`${prefixCls}_scroll`} ref={ulRef}>
      {units.map(({ value, label, disabled }) => {
        return (
          <div
            className={cx(`${prefixCls}-unit`, {
              [`${prefixCls}-unit_selected`]: value === selected,
              [`${prefixCls}-unit_disabled`]: disabled,
              [`${prefixCls}-unit_available`]: !disabled,
            })}
            key={value}
            onClick={() => !disabled && setting(value)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default TimeUnitColumn;
