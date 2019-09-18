import * as React from 'react';
import cx from 'classnames';

export type PointId = 'point-left' | 'point-right' | 'point-single';

export interface ISliderPointProps {
  value: number;
  disabled?: boolean;
  position: string;
  active: boolean;
}

function SliderPoint(props: ISliderPointProps) {
  const { value, position, disabled, active } = props;
  return (
    <div
      className={cx('zent-slider-tooltip', {
        'zent-slider-tooltip-active': active,
      })}
      style={{
        left: position,
      }}
    >
      <div
        className={cx('zent-slider-point', {
          'zent-slider-point-disabled': disabled,
        })}
      />
      <div className="zent-slider-tooltip-content">{value}</div>
    </div>
  );
}

export default SliderPoint;
