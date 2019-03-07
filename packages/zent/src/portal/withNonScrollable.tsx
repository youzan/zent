import * as React from 'react';
import { Component } from 'react';
import isUndefined from 'lodash-es/isUndefined';

import { getNodeFromSelector } from './util';
import { IPurePoralProps } from './PurePortal';

export interface INonScrollableWrapperProps {
  selector?: string | HTMLElement;
  visible?: boolean;
}

/*
  Provides an HOC component for ensuring container is non-scrollable during component
  lifecycle.

  PurePortal has no `visible` prop.
*/
export default function withNonScrollable<P extends IPurePoralProps>(
  Portal: React.ComponentType<P>
) {
  let portalVisibleCount = 0;
  let originalOverflow;

  return class NonScrollableWrapper extends Component<
    P & INonScrollableWrapperProps
  > {
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
      const { visible } = this.props;

      if (isUndefined(visible) || visible) {
        this.saveStyle();
      }
    }

    componentWillUnmount() {
      const { visible } = this.props;

      if (isUndefined(visible) || visible) {
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
