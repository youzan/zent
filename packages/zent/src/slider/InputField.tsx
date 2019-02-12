import * as React from 'react';
import { PureComponent } from 'react';
import pick from 'lodash-es/pick';
import NumberInput from '../number-input';

import { getDecimal } from './common';
import { SliderValueType } from './Slider';

export default class InputField extends PureComponent<any> {
  onChange = (type, e) => {
    const { onChange, value } = this.props;
    let newValue: SliderValueType = Number(e.target.value);
    if (type === 'start') {
      newValue = [newValue, value[1]];
    } else if (type === 'end') {
      newValue = [value[0], newValue];
    }
    onChange && onChange(newValue);
  };

  render() {
    const {
      range,
      value,
      prefix,
      min,
      max,
      disabled,
      className,
      ...restProps
    } = this.props;
    const numberInputProps = pick(restProps, [
      'max',
      'min',
      'disabled',
      'className',
      'prefix',
    ]);
    return (
      <div className={`${prefix}-slider-input`}>
        {range ? (
          <div className={`${prefix}-slider-input`}>
            <NumberInput
              {...numberInputProps}
              max={value[1]}
              decimal={getDecimal(restProps.step)}
              onChange={this.onChange.bind(null, 'start')}
              value={value[0]}
            />
            <span className="slider-input-line">-</span>
            <NumberInput
              max={max}
              disabled={disabled}
              prefix={prefix}
              min={value[0]}
              decimal={getDecimal(restProps.step)}
              onChange={this.onChange.bind(null, 'end')}
              value={value[1]}
            />
          </div>
        ) : (
          <NumberInput
            {...numberInputProps}
            decimal={getDecimal(restProps.step)}
            onChange={this.onChange.bind(null, 'single')}
            value={value}
          />
        )}
      </div>
    );
  }
}
