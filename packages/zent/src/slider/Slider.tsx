import * as React from 'react';
import cx from 'classnames';
import isNumber from 'lodash-es/isNumber';
import getWidth from '../utils/getWidth';

import Point from './Point';
import Marks from './Marks';
import Dots from './Dots';
import { DisabledContext, IDisabledContext } from '../disabled';
import { ISliderProps } from './types';
import { IComputedProps } from './common';
import NumberInput from '../number-input';

export const getDecimal = (step: number | string) => {
  const fixed = String(step).split('.')[1];
  return fixed ? fixed.length : 0;
};

const getPosition = (value: number, min: number, max: number) => {
  const pos = ((value - min) * 100) / (max - min);
  return `${pos}%`;
};

/* eslint no-throw-literal: 0 */
function checkProps(props: ISliderProps) {
  const { range, value, max, min, dots, marks } = props;
  if (range) {
    if (!Array.isArray(value)) {
      throw new Error('`value` must an array when `range` is true');
    }
    if (!(value.length === 2)) {
      throw new Error("value's length must as 2 when `range` is true");
    }
    if (!value.every(v => isNumber(v) && v >= min && v <= max)) {
      throw new Error(
        "value's each item must be a number and between min and max when `range` is true"
      );
    }
    if (!(value[0] <= value[1])) {
      throw new Error(
        'value[0] must be less than value[1] when `range` is true'
      );
    }
  } else {
    if (!isNumber(value)) {
      throw new Error('value must an number when `range` is false');
    }
    if (value < min || value > max) {
      throw new Error('value must between min and max when `range` is false');
    }
  }
  if (dots) {
    if (!marks) {
      throw new Error('marks must be used with dots');
    }
  }
}

export class Slider extends React.Component<ISliderProps> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    withInput: true,
    range: false,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  private containerRef = React.createRef<HTMLDivElement>();

  private onSingleChange = (value: number | string | null) => {
    if (this.props.range !== false) {
      return;
    }
    const { onChange } = this.props;
    onChange && onChange(Number(value));
  };

  private onLeftChange = (value: number | string | null) => {
    if (this.props.range !== true) {
      return;
    }
    const { value: prevValue = [0, 0], onChange } = this.props;
    if (!onChange) {
      return;
    }
    const newValue = Number(value);
    const nextValue: [number, number] =
      newValue > prevValue[1]
        ? [prevValue[1], newValue]
        : [newValue, prevValue[1]];
    onChange(nextValue);
  };

  private onRightChange = (value: number | string | null) => {
    if (this.props.range !== true) {
      return;
    }
    const { value: prevValue = [0, 0], onChange } = this.props;
    if (!onChange) {
      return;
    }
    const newValue = Number(value);
    const nextValue: [number, number] =
      newValue > prevValue[0]
        ? [prevValue[0], newValue]
        : [newValue, prevValue[0]];
    onChange(nextValue);
  };

  private getComputedProps(): IComputedProps {
    const { disabled = this.context.value, min, max, step } = this.props;
    const decimal = getDecimal(step);
    if (this.props.range !== false) {
      const { value } = this.props;
      const leftPosition = getPosition(value[0], min, max);
      const leftProps = {
        min,
        max: value[1],
        disabled,
        decimal,
        onChange: this.onLeftChange,
        value: value[0],
        position: leftPosition,
      };
      const rightProps = {
        min: value[0],
        max,
        disabled,
        decimal,
        onChange: this.onRightChange,
        value: value[1],
        position: getPosition(value[1], min, max),
      };
      const width = (value[1] - value[0]) / (max - min);
      return {
        range: true,
        leftProps,
        rightProps,
        trackStyle: {
          left: leftPosition,
          width: `${width * 100}%`,
        },
      };
    }
    const position = getPosition(this.props.value, min, max);
    return {
      range: false,
      props: {
        min,
        max,
        disabled,
        decimal,
        onChange: this.onSingleChange,
        value: this.props.value,
        position,
      },
      trackStyle: {
        left: 0,
        width: position,
      },
    };
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      checkProps(this.props);
    }
    const {
      withInput,
      className,
      width,
      disabled = this.context.value,
      min,
      max,
      marks,
    } = this.props;
    const computed = this.getComputedProps();
    return (
      <div
        className={cx('zent-slider', className, {
          'zent-slider-disabled': disabled,
        })}
        style={getWidth(width)}
      >
        <div
          ref={this.containerRef}
          className={cx('zent-slider-main', {
            'zent-slider-main-with-marks': !!marks,
          })}
        >
          <div
            style={computed.trackStyle}
            className={cx(
              { 'zent-slider-track-disabled': disabled },
              'zent-slider-track'
            )}
          />
          {computed.range === true ? (
            <>
              <Point
                key="point-left"
                containerRef={this.containerRef}
                rangeLeft={min}
                rangeRight={max}
                {...computed.leftProps}
              />
              <Point
                key="point-right"
                containerRef={this.containerRef}
                rangeLeft={min}
                rangeRight={max}
                {...computed.rightProps}
              />
            </>
          ) : (
            <Point
              key="point-single"
              containerRef={this.containerRef}
              rangeLeft={min}
              rangeRight={max}
              {...computed.props}
            />
          )}
          {marks ? (
            <>
              <Marks marks={marks} min={min} max={max} />
              <Dots
                marks={marks}
                min={min}
                max={max}
                activeLeft={this.props.range === true ? this.props.value[0] : 0}
                activeRight={
                  this.props.range === true
                    ? this.props.value[1]
                    : this.props.value
                }
                onClick={() => {}}
              />
            </>
          ) : null}
        </div>
        {withInput &&
          !this.props.dots &&
          (computed.range === true ? (
            <div className="zent-slider-input">
              <NumberInput key="number-input-left" {...computed.leftProps} />
              <div className="slider-input-line">-</div>
              <NumberInput key="number-input-right" {...computed.rightProps} />
            </div>
          ) : (
            <NumberInput
              key="number-input-single"
              className="zent-slider-input"
              {...computed.props}
            />
          ))}
      </div>
    );
  }
}
