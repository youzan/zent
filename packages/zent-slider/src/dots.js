import React, { Component } from 'react';
import map from 'zent-utils/lodash/map';
import classNames from 'zent-utils/classnames';
import { getLeft, getLately } from './common';
import noop from 'zent-utils/lodash/noop';

export default class Dots extends Component {

  isInTrack = point => {
    const { range, value, disabled } = this.props;
    if (disabled) {
      return false;
    }
    return range ? (point <= value[1] && point >= value[0]) : point <= value;
  }

  handleClick = (pointValue) => {
    const { range, value, onChange } = this.props;
    let newValue = value;
    if (range) {
      newValue = getLately(value, pointValue);
    }
    onChange && onChange(newValue);
  }

  render() {
    const { marks, max, min, disabled, prefix } = this.props;
    return (<div className={`${prefix}-slider-dots`}>
      {map(marks, (value, index) => {
        return (<span
          onClick={!disabled ? this.handleClick.bind(null, index) : noop}
          style={{ left: `${getLeft(index, max, min)}%` }}
          key={value} className={classNames({ 'zent-slider-dot': true, 'zent-slider-dot-active': this.isInTrack(index) })} ></span>);
      })}
    </div>);
  }
}
