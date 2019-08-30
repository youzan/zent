import * as React from 'react';
import cx from 'classnames';

import { getLeft } from './common';

export interface ISliderDotsProps {
  marks: Record<number | string, React.ReactNode>;
  min: number;
  max: number;
  activeLeft: number;
  activeRight: number;
  potentialValues: number[];
  disabled: boolean;
}

function isActive(value: number, left: number, right: number) {
  return value >= left && value <= right;
}

function Dots({
  min,
  max,
  activeLeft,
  activeRight,
  potentialValues,
  disabled,
}: ISliderDotsProps) {
  return (
    <>
      {potentialValues.map(value => (
        <div
          key={value}
          className={cx('zent-slider-dot', {
            'zent-slider-dot-active':
              !disabled && isActive(value, activeLeft, activeRight),
          })}
          style={{ left: `${getLeft(value, min, max)}%` }}
        />
      ))}
    </>
  );
}

export default Dots;
