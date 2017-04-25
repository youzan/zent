import React, { Component } from 'react';
import map from 'lodash/map';
import classNames from 'classnames';
import { getLeft, getClosest } from './common';
import noop from 'lodash/noop';

export default class Dots extends Component {

  isInTrack = point => {
    const { range, value, disabled } = this.props;
    if (disabled) {
      return false;
    }
    point = Number(point);
    return range ? (point <= value[1] && point >= value[0]) : point <= value;
  }

  handleClick = (pointValue) => {
    const { range, value, onChange } = this.props;
    let newValue = Number(pointValue);
    if (range) {
      newValue = getClosest(value, newValue);
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
