import * as React from 'react';
import { getLeft } from './common';

export interface ISliderMarksProps {
  marks: Record<number | string, React.ReactNode>;
  min: number;
  max: number;
}

const SliderMarks = React.memo(({ marks, min, max }: ISliderMarksProps) => (
  <>
    {Object.keys(marks).map(it => {
      const value = Number(it);
      if (Number.isNaN(value) || Infinity === value) {
        return null;
      }
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
));

SliderMarks.displayName = 'ZentSliderMarks';

export default SliderMarks;
