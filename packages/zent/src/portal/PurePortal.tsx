import * as React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import * as keycode from 'keycode';

import { BodyEventHandler } from '../utils/component/BodyEventHandler';
import memoize from '../utils/memorize-one';
import { getNodeFromSelector, removeAllChildren } from './util';
import { IPortalContext, PortalContext } from './context';
import { SCROLLBAR_WIDTH } from '../utils/getScrollbarWidth';

interface IRelatedStyle {
  overflowY: string | null;
  paddingRight: string | null;
}

export interface IPurePortalProps {
  render?: () => React.ReactNode;
  selector: string | HTMLElement;
  append?: boolean;
  withEscToClose?: boolean;
  withNonScrollable?: boolean;
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

  private animationFrameId: number | null = null;
  private scrollTarget: HTMLElement | null = null;
  private originalStyle: IRelatedStyle | null = null;

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

  onKeyDown = (e: KeyboardEvent) => {
    const { withEscToClose, onClose } = this.props;
    if (!withEscToClose || !onClose) {
      return;
    }
    if (keycode(e) === 'esc') {
      onClose(e);
    }
  };

  getScrollTarget(): HTMLElement | null {
    const { selector } = this.props;
    const container = this.getContainer(selector);
    return container.parentElement;
  }

  patchScroll() {
    const { withNonScrollable } = this.props;
    if (!withNonScrollable) {
      return;
    }
    const target = this.getScrollTarget();
    if (target) {
      this.scrollTarget = target;
      this.originalStyle = {
        overflowY: target.style.overflowY,
        paddingRight: target.style.paddingRight,
      };
      const originalPadding = getComputedStyle(target).paddingRight;
      const newPadding = parseFloat(originalPadding) + SCROLLBAR_WIDTH;
      target.style.overflowY = 'hidden';
      target.style.paddingRight = `${newPadding}px`;
    } else if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => {
        this.animationFrameId = null;
        this.patchScroll();
      });
    }
  }

  restoreScroll() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    const target = this.scrollTarget;
    const originalStyle = this.originalStyle;
    if (target && originalStyle) {
      target.style.overflowY = originalStyle.overflowY;
      target.style.paddingRight = originalStyle.paddingRight;
    }
  }

  componentDidMount() {
    this.context.children.add(this);
    this.patchScroll();
  }

  componentDidUpdate(prevProps: IPurePortalProps) {
    const { withNonScrollable, selector } = this.props;
    if (!withNonScrollable || prevProps.selector !== selector) {
      this.restoreScroll();
    } else if (prevProps.selector !== selector) {
      this.restoreScroll();
      this.patchScroll();
    }
  }

  componentWillUnmount() {
    this.context.children.delete(this);
    this.restoreScroll();
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
          <BodyEventHandler eventName="keydown" callback={this.onKeyDown} />
        )}
      </PortalContext.Provider>,
      domNode
    );
  }
}

export default PurePortal;
