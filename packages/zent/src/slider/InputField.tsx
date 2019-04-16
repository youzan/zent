import * as React from 'react';
import { PureComponent } from 'react';
import { Omit } from 'utility-types';

import NumberInput from '../number-input';
import { getDecimal } from './common';
import { SliderValueType, ISliderProps } from './Slider';

export interface ISliderInputFieldProps
  extends Omit<ISliderProps, 'withInput' | 'className' | 'width' | 'onChange'> {
  onChange(value: SliderValueType): void;
}

export default class SliderInputField extends PureComponent<
  ISliderInputFieldProps
> {
  onStartChange = (newValue: string) => {
    const { onChange, value } = this.props;
    onChange([+newValue, value[1]]);
  };

  onEndChange = (newValue: string) => {
    const { onChange, value } = this.props;
    onChange([value[0], +newValue]);
  };

  onSingleChange = (value: string) => {
    this.props.onChange(+value);
  };

  render() {
    const {
      range,
      value,
      prefix,
      min,
      max,
      disabled,
      ...restProps
    } = this.props;
    const numberInputProps = {
      max,
      min,
      disabled,
      prefix,
    };
    return (
      <div className={`${prefix}-slider-input`}>
        {range ? (
          <div className={`${prefix}-slider-input`}>
            <NumberInput
              {...numberInputProps}
              max={value[1]}
              decimal={getDecimal(restProps.step)}
              onChange={this.onStartChange}
              value={value[0]}
            />
            <span className="slider-input-line">-</span>
            <NumberInput
              max={max}
              disabled={disabled}
              prefix={prefix}
              min={value[0]}
              decimal={getDecimal(restProps.step)}
              onChange={this.onEndChange}
              value={value[1]}
            />
          </div>
        ) : (
          <NumberInput
            {...numberInputProps}
            decimal={getDecimal(restProps.step)}
            onChange={this.onSingleChange}
            value={value as number}
          />
        )}
      </div>
    );
  }
}
