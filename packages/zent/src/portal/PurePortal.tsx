import * as React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import * as keycode from 'keycode';

import { BodyEventHandler } from '../utils/component/BodyEventHandler';
import memoize from '../utils/memorize-one';
import { getNodeFromSelector, removeAllChildren } from './util';
import { IPortalContext, PortalContext } from './context';

export interface IPurePortalProps {
  render?: () => React.ReactNode;
  selector: string | HTMLElement;
  append?: boolean;
  withEscToClose?: boolean;
  onClose?: (e: KeyboardEvent) => void;
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
    children: [],
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
    for (const child of this.childContext.children) {
      if (child.contains(el)) {
        return true;
      }
    }
    return false;
  }

  onKeyDown = (e: KeyboardEvent) => {
    const { withEscToClose, onClose } = this.props;
    if (!withEscToClose || !onClose) {
      return;
    }
    if (keycode(e) === 'esc') {
      onClose(e);
    }
  };

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
    const { selector: container, withEscToClose } = this.props;

    // Render the portal content to container node or parent node
    const { children, render } = this.props;
    const content = render ? render() : children;
    const domNode = this.getContainer(container);

    if (!domNode) {
      return null;
    }

    return createPortal(
      <PortalContext.Provider value={this.childContext}>
        {content}
        {withEscToClose && (
          <BodyEventHandler eventName="keyup" callback={this.onKeyDown} />
        )}
      </PortalContext.Provider>,
      domNode
    );
  }
}

export default PurePortal;
