import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getNodeFromSelector } from './util';

/*
  Provides an HOC component for ensuring container is non-scrollable during component
  lifecycle.
*/
export default function withNonScrollable(Portal) {
  let portalVisibleCount = 0;
  let originalOverflow;

  return class NonScrollableWrapper extends PureComponent {
    static propTypes = {
      selector: PropTypes.string,
    };

    static defaultProps = {
      selector: 'body',
    };

    restoreStyle() {
      portalVisibleCount--;

      if (portalVisibleCount <= 0) {
        const node = getNodeFromSelector(this.props.selector);
        node.style.overflow = originalOverflow;
      }
    }

    saveStyle() {
      portalVisibleCount++;

      if (portalVisibleCount === 1) {
        const node = getNodeFromSelector(this.props.selector);
        const { style } = node;
        originalOverflow = style.overflow;
        style.overflow = 'hidden';
      }
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
