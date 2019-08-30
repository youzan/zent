import * as React from 'react';
import cx from 'classnames';
import { withinRange } from '../utils/withinRange';
import { useWindowEvent } from '../utils/component/WindowEventHandler';
import { getValue, toFixed } from './common';

export interface ISliderPointProps {
  value: number;
  min: number;
  max: number;
  containerRef: React.RefObject<HTMLDivElement>;
  decimal: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  position: string;
  rangeLeft: number;
  rangeRight: number;
}

function mouseMove(
  e: MouseEvent,
  {
    min,
    max,
    containerRef,
    decimal,
    onChange,
    rangeLeft,
    rangeRight,
  }: ISliderPointProps
) {
  const containerRect = containerRef.current!.getBoundingClientRect();
  const percent = withinRange(
    (e.clientX - containerRect.left) / containerRect.width,
    0,
    1
  );
  const value = toFixed(
    withinRange(getValue(percent, rangeLeft, rangeRight), min, max),
    decimal
  );
  onChange(value);
}

function SliderPoint(props: ISliderPointProps) {
  const mouseDown = React.useRef(false);
  const [active, setActive] = React.useState(false);
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      mouseDown.current = true;
      setActive(true);
    },
    []
  );
  useWindowEvent('mousemove', e => {
    if (mouseDown.current) {
      mouseMove(e, props);
    }
  });
  useWindowEvent('mouseup', () => {
    mouseDown.current = false;
    setActive(false);
  });
  const { value, position, disabled } = props;
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
        onMouseDown={onMouseDown}
      />
      <div className="zent-slider-tooltip-content">{value}</div>
    </div>
  );
}

export default SliderPoint;
