import React, { Component } from 'react';

export default class Dots extends Component {
  getLeft = point => {
    const { max, min } = this.props;
    return (point - min) * 100 / (max - min);
  }
  handleClick = (e) => {
    const { clientWidth, dots } = this.props;
    if (!dots) {
      let pointValue = (e.clientX - e.target.getBoundingClientRect().left) * 100 / clientWidth;
      pointValue = this.getLeft(pointValue);
      console.log(pointValue);
    }
  }
  render() {
    return (<div className="zent-slider-contain" onClick={this.handleClick}></div>);
  }
}
