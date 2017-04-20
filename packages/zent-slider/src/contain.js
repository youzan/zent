import React, { Component } from 'react';

export default class Dots extends Component {
  getValue = point => {
    const { max, min } = this.props;
    return min + (max - min) * point;
  }

  toFixed = value => {
    const { step } = this.props;
    const fixed = String(step).split('.')[1] || 0;
    return Number(value).toFixed(fixed);
  }

  handleClick = (e) => {
    const { clientWidth, dots, range, value, onChange } = this.props;
    let newValue;
    if (!dots) {
      let pointValue = (e.clientX - e.currentTarget.getBoundingClientRect().left) / clientWidth;
      pointValue = this.getValue(pointValue);
      pointValue = this.toFixed(pointValue);
      newValue = pointValue;
      if (range) {
        if (Math.abs(value[0] - pointValue) <= Math.abs(value[1] - pointValue)) {
          newValue = [pointValue, value[1]];
        } else {
          newValue = [value[0], pointValue];
        }
      }
      onChange && onChange(newValue);
    }
  }

  render() {
    return (<div className="zent-slider-contain" onClick={this.handleClick}>{this.props.children}</div>);
  }
}
