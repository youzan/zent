import * as React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import memoize from '../utils/memorize-one';

import { getNodeFromSelector, removeAllChildren } from './util';
import PortalContent, { IPortalContentProps } from './PortalContent';

export interface IPurePoralProps extends IPortalContentProps {
  render?: () => React.ReactNode;
  selector?: string | HTMLElement;
  append?: boolean;
}

/**
 * Pure portal, render the content (from render prop or from the only children) into the container
 */
export class PurePortal extends Component<IPurePoralProps> {
  static defaultProps = {
    append: false,
  };

  getContainer = memoize(
    (selector: string | HTMLElement): Element => {
      const node = getNodeFromSelector(selector);
      if (!this.props.append) {
        removeAllChildren(node);
      }

      return node;
    }
  );

  render() {
    const { selector: container, onMount, onUnmount } = this.props;

    // Render the portal content to container node or parent node
    const { children, render } = this.props;
    const content = render ? render() : children;
    const domNode = this.getContainer(container);

    if (!domNode) {
      return null;
    }

    return createPortal(
      <PortalContent onMount={onMount} onUnmount={onUnmount}>
        {content}
      </PortalContent>,
      domNode
    );
  }
}

export default PurePortal;
