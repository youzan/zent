import * as React from 'react';
import cx from 'classnames';
import Context, { IPopoverContext } from './Context';
import Portal, { IPortalImperativeHandlers } from '../portal';
import { useWindowEvent } from '../utils/component/WindowEventHandler';
import findPositionedParent from '../utils/dom/findPositionedParent';
import { IPopoverPosition } from './position-function';
import { INVISIBLE_POSITION } from './placement';
import { positionUpdated } from './position-updated';
import useLazy from '../utils/useLazy';
import useAnimationFramed from '../utils/useAnimationFramed';

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

function getPosition(
  { visible, placement, anchor$, cushion }: IPopoverContext,
  getContainer: () => Element | null,
  getPositionedParent: () => Element | null,
  portalRef: React.RefObject<IPortalImperativeHandlers>
): IPopoverPosition {
  const container = getContainer();
  const parent = getPositionedParent();
  const portal = portalRef.current;
  const anchor = anchor$.getValue();
  if (!visible || !container || !parent || !portal || !anchor) {
    return INVISIBLE_POSITION;
  }
  const parentRect = parent.getBoundingClientRect();
  const { container: content } = portal;
  const contentRect = content.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const relativeRect = translateToContainerCoordinates(parentRect, anchorRect);
  const position = placement({
    relativeRect,
    anchor,
    anchorRect,
    content,
    contentRect,
    containerRect: parentRect,
    container,
    cushion,
  });
  return position;
}

export interface IPopoverContentProps {
  children?: React.ReactNode;
}

function PopoverContent({ children }: IPopoverContentProps) {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error('Popover Content must be child of Popover');
  }
  const [position, setPosition] = React.useState(INVISIBLE_POSITION);
  const contextRef = React.useRef(ctx);
  contextRef.current = ctx;
  const { containerSelector, anchor$, portalRef } = ctx;
  const getContainer = useLazy(
    () => document.querySelector(containerSelector),
    [containerSelector]
  );
  const getPositionedParent = useLazy(() => {
    const container = getContainer();
    return container && findPositionedParent(container);
  }, [getContainer]);
  const adjustPosition = useAnimationFramed(() => {
    const position = getPosition(
      contextRef.current,
      getContainer,
      getPositionedParent,
      portalRef
    );
    setPosition(position);
  }, [getContainer, getPositionedParent]);
  React.useImperativeHandle(
    ctx.contentRef,
    () => ({
      adjustPosition,
    }),
    [adjustPosition]
  );
  useWindowEvent('resize', adjustPosition);
  useWindowEvent('scroll', adjustPosition, true);
  React.useEffect(() => positionUpdated(ctx.popover), [position]);
  React.useEffect(() => {
    const $ = anchor$.subscribe(adjustPosition);
    return () => $.unsubscribe();
  }, [anchor$]);

  return (
    <Portal
      ref={portalRef}
      visible={ctx.visible}
      selector={containerSelector}
      className={cx('zent-popover', position.className, ctx.className)}
      style={position.style}
    >
      {children}
    </Portal>
  );
}

export default PopoverContent;
