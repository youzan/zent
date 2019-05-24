import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import * as Scheduler from 'scheduler';
import PopoverContext, {
  getContext,
  IPopoverContext,
  getAnchor,
} from './PopoverContext';
import Portal from '../portal';
import WindowResizeHandler from '../utils/component/WindowResizeHandler';
import WindowEventHandler from '../utils/component/WindowEventHandler';
import findPositionedParent from '../utils/dom/findPositionedParent';
import memorize from '../utils/memorize-one';
import { IPopoverPosition } from './position-function';
import { INVISIBLE_POSITION } from './placement';
import { positionUpdated } from './position-updated';

const {
  unstable_ImmediatePriority: ImmediatePriority,
  unstable_scheduleCallback: scheduleCallback,
  unstable_cancelCallback: cancelCallback,
} = Scheduler;

export type IPopoverContentElement = React.ReactElement<
  IPopoverContentProps,
  typeof PopoverContent
>;

function translateToContainerCoordinates(
  containerRect: ClientRect | DOMRect,
  bb: ClientRect | DOMRect
): ClientRect {
  const { left, top } = containerRect;
  return {
    width: bb.width,
    height: bb.height,
    top: bb.top - top,
    left: bb.left - left,
    bottom: bb.bottom - top,
    right: bb.right - left,
  };
}

export interface IPopoverContentProps {}

export interface IPopoverContentState {
  position: IPopoverPosition;
}

export function isPopoverContent(
  maybe: React.ReactElement<any, any>
): maybe is IPopoverContentElement {
  return !!maybe.type.prototype.isPopoverContent;
}

class PopoverContent extends Component<
  IPopoverContentProps,
  IPopoverContentState
> {
  static contextType = PopoverContext;
  context!: IPopoverContext;

  private callbackNode: Scheduler.CallbackNode | null = null;
  isPopoverContent!: true;

  state = {
    position: INVISIBLE_POSITION,
  };

  getContainer = memorize((selector: string) =>
    document.querySelector(selector)
  );

  private adjustPositionImpl() {
    const ctx = getContext(this);
    if (!ctx.visible) {
      return;
    }
    const container = this.getContainer(ctx.containerSelector);
    if (!container) {
      throw new Error('Container is null');
    }
    const parent = findPositionedParent(container);
    const parentRect = parent.getBoundingClientRect();
    const portal = ctx.portalRef.current;
    if (!portal) {
      return;
    }
    const { element: content } = portal;
    const contentRect = content.getBoundingClientRect();
    // const container = document.querySelector()
    /**
     * trigger's render method guarantees child must be an HTMLElement
     */
    const anchor = getAnchor(ctx) as HTMLElement | null;
    if (!anchor) {
      return;
    }
    const anchorRect = anchor.getBoundingClientRect();
    const relativeRect = translateToContainerCoordinates(
      parentRect,
      anchorRect
    );
    const position = ctx.placement({
      relativeRect,
      anchor,
      anchorRect,
      content,
      contentRect,
      containerRect: parentRect,
      container,
      cushion: ctx.cushion,
    });
    this.setState({
      position,
    });
  }

  adjustPosition = (sync = false) => {
    if (sync) {
      this.adjustPositionImpl();
    } else if (this.callbackNode === null) {
      this.callbackNode = scheduleCallback(ImmediatePriority, () => {
        this.callbackNode = null;
        this.adjustPositionImpl();
      });
    }
  };

  windowEventHandler = () => {
    this.adjustPosition();
  };

  componentDidMount() {
    const { visible } = getContext(this);
    if (visible) {
      this.adjustPosition();
    }
  }

  componentDidUpdate(
    prevProps: IPopoverContentProps,
    prevState: IPopoverContentState
  ) {
    const { popover, visible } = getContext(this);
    if (visible && prevState.position === INVISIBLE_POSITION) {
      this.adjustPositionImpl();
    } else if (
      this.state.position !== INVISIBLE_POSITION &&
      prevState.position !== this.state.position
    ) {
      positionUpdated(popover);
    }
  }

  componentWillUnmount() {
    if (this.callbackNode !== null) {
      cancelCallback(this.callbackNode);
    }
  }

  render() {
    const { children } = this.props;
    const { visible, containerSelector, portalRef, className } = getContext(
      this
    );
    const { position } = this.state;

    const cls = cx(className, 'zent-popover', position.className);

    return (
      <>
        <Portal
          ref={portalRef}
          visible={visible}
          selector={containerSelector}
          className={cls}
          style={position.style}
        >
          {children}
        </Portal>
        <WindowResizeHandler onResize={this.windowEventHandler} />
        <WindowEventHandler
          eventName="scroll"
          callback={this.windowEventHandler}
        />
      </>
    );
  }
}

PopoverContent.prototype.isPopoverContent = true;

export default PopoverContent;
