import cx from 'classnames';
import { Subject } from 'rxjs';
import { IPopoverContext, usePopoverContext } from './Context';
import Portal, { IPortalImperativeHandlers } from '../portal';
import { useWindowEventHandler } from '../utils/component/WindowEventHandler';
import findPositionedParent from '../utils/dom/findPositionedParent';
import { IPopoverPosition } from './position-function';
import { INVISIBLE_POSITION } from './placement';
import { useLazy } from '../utils/hooks/useLazy';
import { useAnimationFramed } from '../utils/hooks/useAnimationFramed';
import {
  createContext,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMounted } from '../utils/hooks/useMounted';

interface IPopoverContentContext {
  positionChanged$: Subject<void>;
}

const ContentContext = createContext<IPopoverContentContext>({
  positionChanged$: new Subject(),
});

ContentContext.displayName = 'PopoverContentContext';

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

function getPosition(
  { visible, placement, popover, cushion }: IPopoverContext,
  getContainer: () => Element | null,
  getPositionedParent: () => Element | null,
  portalRef: React.RefObject<IPortalImperativeHandlers>
): IPopoverPosition {
  // skip expensive DOM operations
  if (!visible) {
    return INVISIBLE_POSITION;
  }

  const container = getContainer();
  const parent = getPositionedParent();
  const portal = portalRef.current;
  const anchor = popover.getAnchor?.();
  if (
    !container ||
    !parent ||
    !portal ||
    !anchor ||
    !(anchor instanceof HTMLElement)
  ) {
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
    container: parent,
    cushion,
  });
  return position;
}

export interface IPopoverContentProps {
  children?: React.ReactNode;
}

function PopoverContent({ children }: IPopoverContentProps) {
  const ctx = usePopoverContext();
  const { positionChanged$: parentPositionChanged$ } = useContext(
    ContentContext
  );
  const contentCtx = useMemo<IPopoverContentContext>(
    () => ({
      positionChanged$: new Subject(),
    }),
    []
  );
  const [position, setPosition] = useState(INVISIBLE_POSITION);
  const contextRef = useRef(ctx);
  contextRef.current = ctx;
  const { containerSelector, portalRef } = ctx;
  const getContainer = useLazy(
    () => document.querySelector(containerSelector),
    [containerSelector]
  );
  const getPositionedParent = useLazy(() => {
    const container = getContainer();
    return container && findPositionedParent(container);
  }, [getContainer]);
  const mounted = useMounted();
  const adjustPosition = useAnimationFramed(() => {
    if (!mounted.current) {
      return;
    }

    const position = getPosition(
      contextRef.current,
      getContainer,
      getPositionedParent,
      portalRef
    );
    setPosition(position);
  });
  useImperativeHandle(
    ctx.contentRef,
    () => ({
      adjustPosition,
    }),
    [adjustPosition]
  );
  useWindowEventHandler('resize', adjustPosition);
  useWindowEventHandler('scroll', adjustPosition, {
    capture: true,
  });
  useEffect(() => {
    ctx.popover.positionUpdated();
    contentCtx.positionChanged$.next();
  }, [ctx.popover, position, contentCtx]);
  useEffect(() => {
    const $ = parentPositionChanged$.subscribe(() => {
      adjustPosition();
    });
    return () => $.unsubscribe();
  }, [parentPositionChanged$, adjustPosition]);

  return (
    <Portal
      ref={portalRef}
      visible={ctx.visible}
      selector={containerSelector}
      className={cx('zent-popover-v2', position.className, ctx.className)}
      style={{ ...position.style, ...ctx.style }}
    >
      <ContentContext.Provider value={contentCtx}>
        {children}
      </ContentContext.Provider>
    </Portal>
  );
}

export default PopoverContent;
