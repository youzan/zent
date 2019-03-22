import * as React from 'react';
import { Component } from 'react';
import noop from 'lodash-es/noop';

import { getValue, toFixed, getClosest } from './common';

export default class Container extends Component<any> {
  handleClick = e => {
    const {
      getClientWidth,
      dots,
      range,
      value,
      onChange,
      max,
      min,
      step,
    } = this.props;
    let newValue;
    if (!dots) {
      let pointValue =
        (e.clientX - e.currentTarget.getBoundingClientRect().left) /
        getClientWidth();
      pointValue = getValue(pointValue, max, min);
      pointValue = toFixed(pointValue, step);
      newValue = pointValue;
      if (range) {
        newValue = getClosest(value, pointValue);
      }
      onChange && onChange(newValue);
    }
  };

  render() {
    const { disabled, prefix } = this.props;
    return (
      <div
        className={`${prefix}-slider-container`}
        onClick={!disabled ? this.handleClick : noop}
      >
        {this.props.children}
      </div>
    );
  }
}
