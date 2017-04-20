import React, { Component } from 'react';

export default class Track extends Component {
  getLeft = () => {
    const { range, value } = this.props;
    return range ? this.getRatio(value[0]) : 0;
  }

  getRatio = (point) => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
  }

  getWidth = () => {
    const { max, min, range, value } = this.props;
    return range ? (value[1] - value[0]) * 100 / (max - min) : this.getRatio(value);
  }

  render() {
    return (<div style={{ width: `${this.getWidth()}%`, left: `${this.getLeft()}%` }} className="zent-slider-track"></div>);
  }
}
