import React, { Component } from 'react';
import { getValue, toFixed, getClosest } from './common';
import noop from 'lodash/noop';

export default class Container extends Component {

  handleClick = (e) => {
    const { clientWidth, dots, range, value, onChange, max, min, step } = this.props;
    let newValue;
    if (!dots) {
      let pointValue = (e.clientX - e.currentTarget.getBoundingClientRect().left) / clientWidth;
      pointValue = getValue(pointValue, max, min);
      pointValue = toFixed(pointValue, step);
      newValue = pointValue;
      if (range) {
        newValue = getClosest(value, pointValue);
      }
      onChange && onChange(newValue);
    }
  }

  render() {
    const { disabled, prefix } = this.props;
    return (<div className={`${prefix}-slider-container`} onClick={!disabled ? this.handleClick : noop}>{this.props.children}</div>);
  }
}
