import React, { Component } from 'react';
import map from 'zent-utils/lodash/map';

export default class Dots extends Component {
  getLeft = point => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
  }

  render() {
    const { marks } = this.props;
    return (<div className="zent-slider-tags">
      {map(marks, (value, index) => {
        return (<span style={{ left: `${this.getLeft(index)}%` }} key={index} className="zent-slider-tag" ></span>);
      })}
    </div>);
  }
}
