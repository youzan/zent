import React, { Component } from 'react';
import map from 'zent-utils/lodash/map';
import { getLeft } from './common';

export default class Marks extends Component {
  render() {
    const { marks, max, min } = this.props;
    return (<div className="zent-slider-marks">
      {map(marks, (value, index) => {
        return (<span style={{ left: `${getLeft(index, max, min)}%` }} key={index} className="zent-slider-mark" >{value}</span>);
      })}
    </div>);
  }
}
