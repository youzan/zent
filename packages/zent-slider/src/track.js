import React, { Component } from 'react';
import { getLeft } from './common';
import calssNames from 'zent-utils/classnames';

export default class Track extends Component {
  getLeft = () => {
    const { range, value, max, min } = this.props;
    return range ? getLeft(value[0], max, min) : 0;
  }

  getWidth = () => {
    const { max, min, range, value } = this.props;
    return range ? (value[1] - value[0]) * 100 / (max - min) : getLeft(value, max, min);
  }

  render() {
    const { disabled } = this.props;
    return (<div style={{ width: `${this.getWidth()}%`, left: `${this.getLeft()}%` }} className={calssNames({ 'zent-slider-track': true, 'zent-slider-track-disabled': disabled })}></div>);
  }
}
