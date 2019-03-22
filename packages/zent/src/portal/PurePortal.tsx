import * as React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import memoize from '../utils/memorize-one';

import { getNodeFromSelector, removeAllChildren } from './util';
import PortalContent, { IPortalContentProps } from './PortalContent';
import { IPortalContext, PortalContext } from './context';

export interface IPurePortalProps extends IPortalContentProps {
  render?: () => React.ReactNode;
  selector?: string | HTMLElement;
  append?: boolean;
}

/**
 * Pure portal, render the content (from render prop or from the only children) into the container
 */
export class PurePortal extends Component<IPurePortalProps> {
  static defaultProps = {
    append: false,
  };

  static contextType = PortalContext;
  context!: IPortalContext;

  private readonly childContext: IPortalContext = {
    children: new Set(),
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

  contains(el: Element): boolean {
    const container = this.getContainer(this.props.selector);
    if (!container) {
      return false;
    }
    if (container.contains(el)) {
      return true;
    }
    let ret = false;
    this.childContext.children.forEach(child => {
      if (child.contains(el)) {
        ret = true;
      }
    });
    return ret;
  }

  componentDidMount() {
    this.context.children.add(this);
  }

  componentWillUnmount() {
    this.context.children.delete(this);
  }

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
      <PortalContext.Provider value={this.childContext}>
        <PortalContent onMount={onMount} onUnmount={onUnmount}>
          {content}
        </PortalContent>
      </PortalContext.Provider>,
      domNode
    );
  }
}

export default PurePortal;
