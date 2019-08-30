import * as React from 'react';
import cx from 'classnames';
import getWidth from '../utils/getWidth';

import Point from './Point';
import Marks from './Marks';
import Dots from './Dots';
import { DisabledContext, IDisabledContext } from '../disabled';
import { ISliderProps, ISliderState } from './types';
import { IComputedProps, getValue, toFixed } from './common';
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
    if (!value.every(v => typeof v === 'number' && v >= min && v <= max)) {
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
    if (typeof value !== 'number') {
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
  if (marks && Object.keys(marks).length < 2) {
    throw new Error('at lease 2 marks needed');
  }
}

function cmp(a: number, b: number): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function getPotentialValues(
  marks: Record<string | number, React.ReactNode> | undefined
) {
  if (!marks) {
    return [];
  }
  return Object.keys(marks)
    .map(it => Number(it))
    .filter(it => !Number.isNaN(it) && it !== Infinity)
    .sort(cmp);
}

function normalizeToPotentialValue(potentialValues: number[], value: number) {
  let i = 0;
  let j = potentialValues.length;
  while (true) {
    const p = Math.floor((i + j) / 2);
    if (j === i + 1 || p === i) {
      if (
        Math.abs(potentialValues[i] - value) <=
        Math.abs(potentialValues[j] - value)
      ) {
        return potentialValues[i];
      }
      return potentialValues[j];
    }
    const mid = potentialValues[p];
    if (value === mid) {
      return mid;
    }
    if (value < mid) {
      j = p;
    } else if (value > mid) {
      i = p;
    }
  }
}

export class Slider extends React.Component<ISliderProps, ISliderState> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    withInput: true,
    range: false,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  state: ISliderState = {
    decimal: getDecimal(this.props.step),
    potentialValues: getPotentialValues(this.props.marks),
    prevProps: this.props,
  };

  private containerRef = React.createRef<HTMLDivElement>();

  private onSingleChange = (value: number | string | null) => {
    if (this.props.range !== false) {
      return;
    }
    const { onChange, dots, disabled } = this.props;
    const { potentialValues } = this.state;
    let newValue = Number(value);
    if (dots) {
      newValue = normalizeToPotentialValue(potentialValues, newValue);
    }
    !disabled && onChange && onChange(newValue);
  };

  private onLeftChange = (value: number | string | null) => {
    if (this.props.range !== true) {
      return;
    }
    const { value: prevValue = [0, 0], onChange, dots, disabled } = this.props;
    const { potentialValues } = this.state;
    if (disabled || !onChange) {
      return;
    }
    let newValue = Number(value);
    if (dots) {
      newValue = normalizeToPotentialValue(potentialValues, newValue);
    }
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
    const { value: prevValue = [0, 0], onChange, dots, disabled } = this.props;
    const { potentialValues } = this.state;
    if (disabled || !onChange) {
      return;
    }
    let newValue = Number(value);
    if (dots) {
      newValue = normalizeToPotentialValue(potentialValues, newValue);
    }
    const nextValue: [number, number] =
      newValue > prevValue[0]
        ? [prevValue[0], newValue]
        : [newValue, prevValue[0]];
    onChange(nextValue);
  };

  private getComputedProps(): IComputedProps {
    const { disabled = this.context.value, min, max } = this.props;
    const { decimal } = this.state;
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

  private onChange = (nextValue: number, rawValue: number) => {
    if (this.props.range === true) {
      const { onChange, value } = this.props;
      if (!onChange) {
        return;
      }
      if (Math.abs(value[0] - rawValue) <= Math.abs(value[1] - rawValue)) {
        onChange([nextValue, value[1]]);
      } else {
        onChange([value[0], nextValue]);
      }
    } else {
      const { onChange } = this.props;
      onChange && onChange(nextValue);
    }
  };

  private onClick: React.MouseEventHandler<HTMLDivElement> = e => {
    const { min, max, dots } = this.props;
    const { decimal, potentialValues } = this.state;
    const el = e.currentTarget;
    let nextValue =
      (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
    nextValue = getValue(nextValue, min, max);
    nextValue = toFixed(nextValue, decimal);
    if (dots) {
      const normalizedValue = normalizeToPotentialValue(
        potentialValues,
        nextValue
      );
      this.onChange(normalizedValue, nextValue);
    } else {
      this.onChange(nextValue, nextValue);
    }
  };

  static getDerivedStateFromProps(
    nextProps: ISliderProps,
    { prevProps }: ISliderState
  ): Partial<ISliderState> | null {
    if (nextProps === prevProps) {
      return null;
    }
    const state: Partial<ISliderState> = {
      prevProps: nextProps,
    };
    if (prevProps.step !== nextProps.step) {
      state.decimal = getDecimal(nextProps.step);
    }
    if (prevProps.marks !== nextProps.marks) {
      state.potentialValues = getPotentialValues(nextProps.marks);
    }
    return state;
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
      dots,
    } = this.props;
    const { potentialValues } = this.state;
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
          className="zent-slider-main"
          onClick={this.onClick}
        >
          <div
            style={computed.trackStyle}
            className={cx('zent-slider-track', {
              'zent-slider-track-disabled': disabled,
            })}
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
              <Marks
                marks={marks}
                min={min}
                max={max}
                potentialValues={potentialValues}
              />
              {dots ? (
                <Dots
                  marks={marks}
                  min={min}
                  max={max}
                  activeLeft={
                    this.props.range === true ? this.props.value[0] : 0
                  }
                  activeRight={
                    this.props.range === true
                      ? this.props.value[1]
                      : this.props.value
                  }
                  potentialValues={potentialValues}
                />
              ) : null}
            </>
          ) : null}
        </div>
        {withInput &&
          !dots &&
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
