import React, { Component } from 'react';
import { getValue, toFixed, getLately } from './common';

export default class Dots extends Component {

  handleClick = (e) => {
    const { clientWidth, dots, range, value, onChange, max, min, step } = this.props;
    let newValue;
    if (!dots) {
      let pointValue = (e.clientX - e.currentTarget.getBoundingClientRect().left) / clientWidth;
      pointValue = getValue(pointValue, max, min);
      pointValue = toFixed(pointValue, step);
      newValue = pointValue;
      if (range) {
        newValue = getLately(value, pointValue);
      }
      onChange && onChange(newValue);
    }
  }

  render() {
    return (<div className="zent-slider-contain" onClick={this.handleClick}>{this.props.children}</div>);
  }
}
