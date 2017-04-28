import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Point from './points';
import Dots from './dots';
import Marks from './marks';
import Container from './container';
import Track from './track';

export default class Range extends Component {
  state = {
    clientWidth: 1
  };

  componentDidMount = () => {
    const $root = ReactDOM.findDOMNode(this);
    this.setState({ clientWidth: $root.clientWidth });
  };

  render() {
    const { dots, marks, value, ...restProps } = this.props;
    const { clientWidth } = this.state;
    return (
      <div className={`${restProps.prefix}-slider-main`}>
        <Container
          clientWidth={clientWidth}
          dots={dots}
          {...restProps}
          value={value}
        >
          <Track clientWidth={clientWidth} {...restProps} value={value} />
        </Container>
        {dots && <Dots marks={marks} {...restProps} value={value} />}
        <Point
          dots={dots}
          marks={marks}
          clientWidth={clientWidth}
          {...restProps}
          value={value}
        />
        {marks && <Marks marks={marks} {...restProps} />}
      </div>
    );
  }
}
