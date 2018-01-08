import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import Point from './Points';
import Dots from './Dots';
import Marks from './Marks';
import Container from './Container';
import Track from './Track';

export default class Range extends (PureComponent || Component) {
  clientWidth = null;

  getClientWidth = () => {
    if (this.clientWidth === null) {
      const $root = ReactDOM.findDOMNode(this);
      this.clientWidth = $root.clientWidth;
    }
    return this.clientWidth;
  };

  render() {
    const { dots, marks, value, ...restProps } = this.props;
    const warpClass = cx(`${restProps.prefix}-slider-main`, {
      [`${restProps.prefix}-slider-main-with-marks`]: marks
    });
    return (
      <div className={warpClass}>
        <Container
          getClientWidth={this.getClientWidth}
          dots={dots}
          {...restProps}
          value={value}
        >
          <Track {...restProps} value={value} />
        </Container>
        {dots && <Dots marks={marks} {...restProps} value={value} />}
        <Point
          dots={dots}
          marks={marks}
          getClientWidth={this.getClientWidth}
          {...restProps}
          value={value}
        />
        {marks && <Marks marks={marks} {...restProps} />}
      </div>
    );
  }
}
