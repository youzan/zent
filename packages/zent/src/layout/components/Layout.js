import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  static propTypes = {
    spacing: PropTypes.number,
  };

  static defaultProps = {
    spacing: 8,
  };

  render() {
    return <div className="zent-layout">{this.props.children}</div>;
  }
}
