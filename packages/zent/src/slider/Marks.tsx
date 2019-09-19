import * as React from 'react';
import { getLeft } from './common';

export interface ISliderMarksProps {
  marks: Record<number | string, React.ReactNode>;
  min: number;
  max: number;
  potentialValues: number[];
}

const SliderMarks = React.memo(
  ({ marks, min, max, potentialValues }: ISliderMarksProps) => (
    <>
      {potentialValues.map(value => {
        return (
          <div
            key={value}
            style={{
              left: `${getLeft(value, min, max)}%`,
            }}
            className="zent-slider-mark"
          >
            {marks[value]}
          </div>
        );
      })}
    </>
  )
);

SliderMarks.displayName = 'ZentSliderMarks';

export default SliderMarks;
