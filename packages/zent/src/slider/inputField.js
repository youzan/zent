import React, { Component, PureComponent } from 'react';
import NumberInput from './numberInput';

export default class InputField extends (PureComponent || Component) {
  onchange = (type, newValue) => {
    const { onChange, value } = this.props;
    if (type === 'start') {
      newValue = [newValue, value[1]];
    } else if (type === 'end') {
      newValue = [value[0], newValue];
    }
    onChange && onChange(newValue);
  };

  render() {
    const { range, value, prefix, ...restProps } = this.props;
    return (
      <div className={`${prefix}-slider-input`}>
        {range
          ? <div className={`${prefix}-slider-input`}>
              <NumberInput
                {...restProps}
                onChange={this.onchange.bind(null, 'start')}
                value={value[0]}
              />
              <span className="slider-input-line">-</span>
              <NumberInput
                {...restProps}
                onChange={this.onchange.bind(null, 'end')}
                value={value[1]}
              />
            </div>
          : <NumberInput
              {...restProps}
              onChange={this.onchange.bind(null, 'single')}
              value={value}
            />}
      </div>
    );
  }
}
