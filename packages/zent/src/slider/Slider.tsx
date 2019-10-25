import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';
import Point from './Point';
import Marks from './Marks';
import Dots from './Dots';
import { DisabledContext, IDisabledContext } from '../disabled';
import { ISliderProps, ISliderState } from './types';
import { IComputedProps, getValue, toFixed, isLeftValue } from './common';
import NumberInput from '../number-input';
import { getPotentialValues, normalizeToPotentialValue } from './normalize';
import { WindowEventHandler } from '../utils/component';
import withinRange from '../utils/withinRange';

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
      throw new Error('value must be an number when `range` is false');
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

export class Slider extends React.Component<ISliderProps, ISliderState> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    withInput: true,
    range: false,
    value: 0,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  state: ISliderState = {
    decimal: getDecimal(this.props.step),
    potentialValues: getPotentialValues(this.props.marks),
    active: null,
    prevProps: this.props,
  };

  private containerRef = React.createRef<HTMLDivElement>();
  private mouseDown = false;
  private limit: readonly [number, number] | null = null;
  private isLeft: boolean | null = null;

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

  private onChange(rawValue: number) {
    const { dots, disabled } = this.props;
    const { potentialValues, decimal } = this.state;
    if (disabled) {
      return;
    }
    let nextValue = toFixed(rawValue, decimal);
    if (dots) {
      nextValue = normalizeToPotentialValue(potentialValues, nextValue);
    }
    if (this.props.range === true) {
      const { onChange, value } = this.props;
      if (!onChange) {
        return;
      }
      const isLeft =
        this.isLeft !== null ? this.isLeft : isLeftValue(rawValue, value);
      if (isLeft) {
        onChange([nextValue, value[1]]);
      } else {
        onChange([value[0], nextValue]);
      }
    } else {
      const { onChange } = this.props;
      onChange && onChange(nextValue);
    }
  }

  private getValueFromEvent(e: MouseEvent | React.MouseEvent) {
    const { min, max } = this.props;
    const el = this.containerRef.current!;
    let nextValue =
      (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
    nextValue = getValue(nextValue, min, max);
    return nextValue;
  }

  private onMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
    this.mouseDown = true;
    const value = this.getValueFromEvent(e);
    this.onChange(value);
  };

  private onWindowMouseUp = () => {
    this.mouseDown = false;
    this.limit = null;
    this.isLeft = null;
    this.setState({
      active: null,
    });
  };

  private onWindowMouseMove = (e: MouseEvent) => {
    if (!this.mouseDown) {
      return;
    }
    let nextValue = this.getValueFromEvent(e);
    if (this.props.range) {
      const { value, min, max } = this.props;
      let left: boolean;
      if (value[0] === value[1]) {
        left = e.movementX <= 0;
      } else {
        left = isLeftValue(nextValue, value);
      }
      if (!this.state.active) {
        this.setState({
          active: left ? 'point-left' : 'point-right',
        });
      }
      if (!this.limit) {
        this.isLeft = left;
        if (left) {
          this.limit = [min, value[1]];
        } else {
          this.limit = [value[0], max];
        }
      }
      nextValue = withinRange(nextValue, this.limit[0], this.limit[1]);
    } else {
      const { min, max } = this.props;
      if (!this.state.active) {
        this.setState({
          active: 'point-single',
        });
      }
      nextValue = withinRange(nextValue, min, max);
    }
    this.onChange(nextValue);
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
    const { potentialValues, active } = this.state;
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
          onMouseDown={this.onMouseDown}
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
                active={active === 'point-left'}
                disabled={disabled}
                position={computed.leftProps.position}
                value={computed.leftProps.value}
              />
              <Point
                key="point-right"
                active={active === 'point-right'}
                disabled={disabled}
                position={computed.rightProps.position}
                value={computed.rightProps.value}
              />
            </>
          ) : (
            <Point
              key="point-single"
              active={active === 'point-single'}
              disabled={disabled}
              position={computed.props.position}
              value={computed.props.value}
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
                  disabled={disabled}
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
        <WindowEventHandler
          eventName="mousemove"
          callback={this.onWindowMouseMove}
        />
        <WindowEventHandler
          eventName="mouseup"
          callback={this.onWindowMouseUp}
        />
      </div>
    );
  }
}
