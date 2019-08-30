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
  potentialValues: number[];
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
  potentialValues,
}: ISliderDotsProps) {
  const callbacks = React.useMemo(() => {
    const callbacks: Record<number, () => void> = {};
    for (let i = 0; i < potentialValues.length; i += 1) {
      const key = potentialValues[i];
      const value = Number(key);
      callbacks[value] = () => onClick(value);
    }
    return callbacks;
  }, [marks]);

  return (
    <>
      {potentialValues.map(value => (
        <div
          key={value}
          className={cx('zent-slider-dot', {
            'zent-slider-dot-active': isActive(value, activeLeft, activeRight),
          })}
          style={{ left: `${getLeft(value, min, max)}%` }}
          onClick={callbacks[value]}
        />
      ))}
    </>
  );
}

export default Dots;
