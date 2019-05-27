import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';
import isNumber from 'lodash-es/isNumber';
import getWidth from '../utils/getWidth';

import Range from './Range';
import InputField from './InputField';

/* eslint no-throw-literal: 0 */
function checkProps(props) {
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

export type SliderValueType = number | [number, number];

export interface ISliderProps {
  value: SliderValueType;
  onChange?: (value: SliderValueType) => void;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
  withInput?: boolean;
  dots?: boolean;
  marks?: {
    [key: number]: string;
  };
  disabled?: boolean;
  className?: string;
  width?: number | string;
  prefix?: string;
}

export class Slider extends PureComponent<ISliderProps> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    prefix: 'zent',
    disabled: false,
    withInput: true,
    range: false,
    value: 0,
  };

  onChange = value => {
    const { range, onChange } = this.props;
    value = range
      ? value.map(v => Number(v)).sort((a, b) => a - b)
      : Number(value);
    onChange && onChange(value);
  };

  render() {
    checkProps(this.props);
    const { withInput, className, width, ...restProps } = this.props;
    const wrapClass = classNames(
      `${restProps.prefix}-slider`,
      { [`${restProps.prefix}-slider-disabled`]: restProps.disabled },
      className
    );
    return (
      <div className={wrapClass} style={getWidth(width)}>
        <Range {...restProps} onChange={this.onChange} />
        {withInput && !restProps.dots && (
          <InputField onChange={this.onChange} {...restProps} />
        )}
      </div>
    );
  }
}

export default Slider;
