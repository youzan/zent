import React, { Component, PureComponent } from 'react';
import NumberInput from 'number-input';
import pick from 'lodash/pick';

import { getDecimal } from './common';

export default class InputField extends (PureComponent || Component) {
  onChange = (type, e) => {
    const { onChange, value } = this.props;
    let newValue = Number(e.target.value);
    if (type === 'start') {
      newValue = [newValue, value[1]];
    } else if (type === 'end') {
      newValue = [value[0], newValue];
    }
    onChange && onChange(newValue);
  };

  render() {
    const { range, value, prefix, ...restProps } = this.props;
    const numberInputProps = pick(restProps, [
      'max',
      'min',
      'disabled',
      'className',
      'prefix'
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
              {...numberInputProps}
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
