import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { getNodeFromSelector } from './util';
import { IPurePoralProps } from './PurePortal';

export interface INonScrollableWrapperProps {
  selector: string | Element;
  visible?: boolean;
}

/*
  Provides an HOC component for ensuring container is non-scrollable during component
  lifecycle.
*/
export default function withNonScrollable<P extends IPurePoralProps>(
  Portal: React.ComponentType<P>
) {
  let portalVisibleCount = 0;
  let originalOverflow;

  return class NonScrollableWrapper extends Component<
    P & INonScrollableWrapperProps
  > {
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
        if (node instanceof HTMLElement) {
          node.style.overflow = originalOverflow;
        }
      }
    }

    saveStyle() {
      portalVisibleCount++;

      if (portalVisibleCount === 1) {
        const node = getNodeFromSelector(this.props.selector);
        if (node instanceof HTMLElement) {
          const { style } = node;
          originalOverflow = style.overflow;
          style.overflow = 'hidden';
        }
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
