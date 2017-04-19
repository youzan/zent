import React, { Component } from 'react';
import map from 'zent-utils/lodash/map';

export default class Marks extends Component {
  getLeft = point => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
  }

  render() {
    const { marks } = this.props;
    return (<div className="zent-slider-marks">
      {map(marks, (value, index) => {
        return (<span style={{ left: `${this.getLeft(index)}%` }} key={index} className="zent-slider-mark" >{value}</span>);
      })}
    </div>);
  }
}
