import { Component } from 'react';
import { findDOMNode } from 'react-dom';

/**
 * Temporary Component until https://github.com/reactjs/rfcs/pull/97 makes progress
 */
export default class DOMRef extends Component {
  getDOMNode() {
    return findDOMNode(this);
  }

  render() {
    return this.props.children;
  }
}
