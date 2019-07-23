import * as React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import memoize from '../utils/memorize-one';
import { getNodeFromSelector, removeAllChildren } from './util';
import { IPortalContext, PortalContext } from './context';

export interface IPurePortalProps {
  selector: string | HTMLElement;
  append?: boolean;
}

/**
 * A thin wrapper around React.createPortal with
 *
 * 1. Awareness of nested portals
 * 2. `append=false` to mimic old `unstable_renderIntoContainer` behavior for backward compatibility
 */
export class PurePortal extends Component<IPurePortalProps> {
  static defaultProps = {
    append: false,
  };

  static contextType = PortalContext;
  context!: IPortalContext;

  private readonly childContext: IPortalContext = {
    children: [],
  };

  getContainer = memoize((selector: string | HTMLElement): Element | null => {
    const node = getNodeFromSelector(selector);
    if (!node) {
      return node;
    }
    if (!this.props.append) {
      removeAllChildren(node);
    }

    return node;
  });

  contains(el: Node): boolean {
    const container = this.getContainer(this.props.selector);
    if (!container) {
      return false;
    }
    if (container.contains(el)) {
      return true;
    }
    for (const child of this.childContext.children) {
      if (child.contains(el)) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    this.context.children.push(this);
  }

  componentWillUnmount() {
    const index = this.context.children.indexOf(this);
    if (index !== -1) {
      this.context.children.splice(index, 1);
    }
  }

  render() {
    const { selector: container } = this.props;
    const { children } = this.props;
    const domNode = this.getContainer(container);

    if (!domNode) {
      return null;
    }

    return createPortal(
      <PortalContext.Provider value={this.childContext}>
        {children}
      </PortalContext.Provider>,
      domNode
    );
  }
}

export default PurePortal;
