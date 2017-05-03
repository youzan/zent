import React, { Component } from 'react';
import Input from 'input';
import { toFixed } from './common';

const numberRegex = /^(\-)?\d+(\.\d+)?$/;

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1,
    disabled: false
  };

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  onchange = e => {
    const { onChange, max, min, step } = this.props;
    let newValue = e.target.value;
    this.setState({ value: newValue });
    if (numberRegex.test(newValue)) {
      newValue = newValue / step * step;
      newValue = toFixed(newValue, step);
      onChange && newValue >= min && newValue <= max && onChange(newValue);
    }
  };

  handleBlur = e => {
    let newValue = e.target.value;
    const { onChange, max, min, value } = this.props;
    if (!numberRegex.test(newValue)) {
      newValue = value;
    }
    newValue = Number(newValue);
    if (newValue > max) {
      newValue = max;
    } else if (newValue < min) {
      newValue = min;
    }
    this.setState({ value: newValue });
    onChange && onChange(newValue);
  };

  render() {
    const { value } = this.state;
    return (
      <Input
        onBlur={this.handleBlur}
        disabled={this.props.disabled}
        onChange={this.onchange}
        value={value}
      />
    );
  }
}
