import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getNodeFromSelector } from './util';

/**
  Provides an HOC component for ensuring container is non-scrollable during component
  lifecycle.
**/
export default function withNonScrollable(Portal) {
  return class NonScrollableWrapper extends Component {
    static propTypes = {
      selector: PropTypes.string
    };

    static defaultProps = {
      selector: 'body'
    };

    restoreStyle() {
      const node = getNodeFromSelector(this.props.selector);
      node.style.overflow = this.originalOverflow;
    }

    saveStyle() {
      const node = getNodeFromSelector(this.props.selector);
      const { style } = node;
      this.originalOverflow = style.overflow;
      style.overflow = 'hidden';
    }

    componentDidMount() {
      if (this.props.visible) {
        this.saveStyle();
      }
    }

    componentWillUnmount() {
      if (this.props.visible) {
        this.restoreStyle();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.visible !== nextProps.visible) {
        if (nextProps.visible === false) {
          this.restoreStyle();
        } else {
          this.saveStyle();
        }
      }
    }

    render() {
      return <Portal {...this.props} />;
    }
  };
}
