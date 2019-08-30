import * as React from 'react';
import cx from 'classnames';

import { getLeft } from './common';

export interface ISliderDotsProps {
  marks: Record<number | string, React.ReactNode>;
  min: number;
  max: number;
  activeLeft: number;
  activeRight: number;
  onClick(value: number): void;
}

function isActive(value: number, left: number, right: number) {
  return value >= left && value <= right;
}

function Dots({
  marks,
  min,
  max,
  activeLeft,
  activeRight,
  onClick,
}: ISliderDotsProps) {
  const callbacks = React.useMemo(() => {
    const keys = Object.keys(marks);
    const callbacks: Record<number, () => void> = {};
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = Number(marks[key]);
      if (!Number.isNaN(value) && Infinity !== value) {
        callbacks[value] = () => onClick(value);
      }
    }
    return callbacks;
  }, [marks]);

  return (
    <div className="zent-slider-dots">
      {Object.keys(marks).map(it => {
        const value = Number(it);
        if (Number.isNaN(value) || Infinity === value) {
          return null;
        }
        return (
          <div
            key={value}
            className={cx('zent-slider-dot', {
              'zent-slider-dot-active': isActive(
                value,
                activeLeft,
                activeRight
              ),
            })}
            style={{ left: `${getLeft(value, min, max)}%` }}
            onClick={callbacks[value]}
          />
        );
      })}
    </div>
  );
}

export default Dots;
