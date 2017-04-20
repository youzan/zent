import React, { Component } from 'react';
import map from 'zent-utils/lodash/map';
import calssNames from 'zent-utils/classnames';

export default class Dots extends Component {
  getLeft = point => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
  }

  isInTrack = point => {
    const { range, value } = this.props;
    // console.log(point,value[0],value[1], range, point <= value[1] , point >= value[0]);

    return range ? (point <= value[1] && point >= value[0]) : point <= value;
  }

  handleClick = (pointValue) => {
    const { range, value, onChange } = this.props;
    let newValue = value;
    if (range) {
      if (Math.abs(value[0] - pointValue) <= Math.abs(value[1] - pointValue)) {
        newValue = [pointValue, value[1]];
      } else {
        newValue = [value[0], pointValue];
      }
    }
    onChange && onChange(newValue);
  }

  render() {
    const { marks } = this.props;
    return (<div className="zent-slider-dots">
      {map(marks, (value, index) => {
        return (<span
          onClick={this.handleClick.bind(null, index)}
          style={{ left: `${this.getLeft(index)}%` }}
          key={value} className={calssNames({ 'zent-slider-dot': true, 'zent-slider-dot-active': this.isInTrack(index) })} ></span>);
      })}
    </div>);
  }
}
