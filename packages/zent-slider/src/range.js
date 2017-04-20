import React, { Component } from 'react';
import Point from './points';
import Dots from './dots';
import Marks from './marks';
import Contain from './contain';
import ReactDOM from 'react-dom';
import Track from './track';

export default class Range extends Component {
  state = {
    clientWidth: 1
  }

  componentDidMount = () => {
    const $root = ReactDOM.findDOMNode(this);
    this.setState({ clientWidth: $root.clientWidth });
  }

  render() {
    const { dots, marks, value, ...restProps } = this.props;
    const { clientWidth } = this.state;
    return (<div id="zent-slider-contain" className="zent-slider-main">
      {dots && <Dots marks={marks} {...restProps} value={value} />}
      <Point dots={dots} marks={marks} clientWidth={clientWidth} {...restProps} value={value} />
      <Contain clientWidth={clientWidth} dots={dots} {...restProps} value={value}>
        <Track clientWidth={clientWidth} {...restProps} value={value} />
      </Contain>
      {marks && <Marks marks={marks} {...restProps} />}
    </div>);
  }
}
