import * as React from 'react';
import { getLeft } from './common';

export interface ISliderMarksProps {
  marks: Record<number | string, React.ReactNode>;
  min: number;
  max: number;
}

export default function SliderMarks({ marks, min, max }: ISliderMarksProps) {
  return (
    <div className="zent-slider-marks">
      {Object.keys(marks)
        .map(it => Number(it))
        .sort()
        .map(it => {
          if (Number.isNaN(it) || Infinity === it) {
            return null;
          }
          return (
            <div
              key={it}
              style={{
                left: `${getLeft(it, min, max)}%`,
              }}
              className="zent-slider-mark"
            >
              {marks[it]}
            </div>
          );
        })}
    </div>
  );
}
