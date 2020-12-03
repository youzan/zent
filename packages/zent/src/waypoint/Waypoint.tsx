/**
 * Modified from https://github.com/civiccc/react-waypoint
 */
import { Children, cloneElement, createRef, PureComponent } from 'react';

import { addEventListener } from '../utils/component/event-handler';
import { isForwardRef } from 'react-is';

import { computeOffsetPixels } from './offset';
import isDOMElement from '../utils/isDOMElement';
import { getCurrentPosition, WaypointPosition } from './position';
import isBrowser from '../utils/isBrowser';
import defer from '../utils/defer';
import { ICancelable } from '../utils/types';

export interface IWaypointCallbackData {
  currentPosition: WaypointPosition;
  previousPosition: WaypointPosition;
  event: Event | null;
  waypointTop: number;
  waypointBottom: number;
  viewportTop: number;
  viewportBottom: number;
}

export interface IWaypointProps {
  scrollableAncestor?: HTMLElement | Window;
  children?: React.ReactNode;
  topOffset?: number | string;
  bottomOffset?: number | string;
  horizontal?: boolean;
  fireOnRapidScroll?: boolean;
  onEnter?: (data: IWaypointCallbackData) => void;
  onLeave?: (data: IWaypointCallbackData) => void;
  onPositionChange?: (data: IWaypointCallbackData) => void;
}

export class Waypoint extends PureComponent<IWaypointProps> {
  static defaultProps = {
    topOffset: '0px',
    bottomOffset: '0px',
    horizontal: false,
    fireOnRapidScroll: true,
  };

  private refElement: React.MutableRefObject<Element> = createRef<Element>();
  private cancelOnNextTick: ICancelable;
  private scrollEventListenerUnsubscribe: () => void;
  private resizeEventListenerUnsubscribe: () => void;
  private scrollableAncestor: HTMLElement | Window;
  private previousPosition = WaypointPosition.Unknown;

  componentDidMount() {
    if (!isBrowser) {
      return;
    }

    // this.refElement may occasionally not be set at this time. To help ensure that
    // this works smoothly and to avoid layout thrashing, we want to delay the
    // initial execution until the next tick.
    this.cancelOnNextTick = defer(() => {
      this.cancelOnNextTick = null;
      const { children } = this.props;

      // Before doing anything, we want to check that this.refElement is available in Waypoint
      ensureRefIsUsedByChild(children, this.refElement.current);

      this.scrollableAncestor = this.findScrollableAncestor();

      this.scrollEventListenerUnsubscribe = addEventListener(
        this.scrollableAncestor,
        'scroll',
        this.handleScroll,
        { passive: true }
      );

      this.resizeEventListenerUnsubscribe = addEventListener(
        window,
        'resize',
        this.handleScroll,
        { passive: true }
      );

      this.handleScroll(null);
    });
  }

  componentDidUpdate() {
    if (!isBrowser) {
      return;
    }

    if (!this.scrollableAncestor) {
      // The Waypoint has not yet initialized.
      return;
    }

    // The element may have moved, so we need to recompute its position on the
    // page. This happens via handleScroll in a way that forces layout to be
    // computed.
    //
    // We want this to be deferred to avoid forcing layout during render, which
    // causes layout thrashing. And, if we already have this work enqueued, we
    // can just wait for that to happen instead of enqueueing again.
    if (this.cancelOnNextTick) {
      return;
    }
    this.cancelOnNextTick = defer(() => {
      this.cancelOnNextTick = null;
      this.handleScroll(null);
    });
  }

  componentWillUnmount() {
    if (!isBrowser) {
      return;
    }

    this.scrollEventListenerUnsubscribe?.();
    this.resizeEventListenerUnsubscribe?.();
    this.cancelOnNextTick?.cancel();
  }

  /**
   * Traverses up the DOM to find an ancestor container which has an overflow
   * style that allows for scrolling.
   *
   * @returns the closest ancestor element with an overflow style that
   *   allows for scrolling. If none is found, the `window` object is returned
   *   as a fallback.
   */
  private findScrollableAncestor(): HTMLElement | Window {
    const { horizontal, scrollableAncestor } = this.props;

    if (scrollableAncestor) {
      return scrollableAncestor;
    }

    let node: Node = this.refElement.current;
    while (node.parentNode) {
      node = node.parentNode;

      if (node === document.body) {
        // We've reached all the way to the root node.
        return window;
      }

      const style = getComputedStyle(node as Element);
      const overflowDirec = horizontal
        ? style.getPropertyValue('overflow-x')
        : style.getPropertyValue('overflow-y');
      const overflow = overflowDirec || style.getPropertyValue('overflow');

      if (overflow === 'auto' || overflow === 'scroll') {
        return node as HTMLElement;
      }
    }

    // A scrollable ancestor element was not found, which means that we need to
    // do stuff on window.
    return window;
  }

  /**
   * @param event the native scroll event coming from the scrollable
   *   ancestor, or resize event coming from the window. Will be undefined if
   *   called by a React life cycle method
   */
  private handleScroll = (event: Event | null) => {
    if (!this.refElement.current) {
      // There's a chance we end up here after the component has been unmounted.
      return;
    }

    const bounds = this.getBounds();
    const currentPosition = getCurrentPosition(bounds);
    const previousPosition = this.previousPosition;
    const {
      onPositionChange,
      onEnter,
      onLeave,
      fireOnRapidScroll,
    } = this.props;

    // Save previous position as early as possible to prevent cycles
    this.previousPosition = currentPosition;

    if (previousPosition === currentPosition) {
      // No change since last trigger
      return;
    }

    const callbackArg = {
      currentPosition,
      previousPosition,
      event,
      waypointTop: bounds.waypointTop,
      waypointBottom: bounds.waypointBottom,
      viewportTop: bounds.viewportTop,
      viewportBottom: bounds.viewportBottom,
    };
    onPositionChange?.(callbackArg);

    if (currentPosition === WaypointPosition.Inside) {
      onEnter?.(callbackArg);
    } else if (
      previousPosition === WaypointPosition.Inside ||
      // Trigger `onLeave` if waypoint is below/above when mount
      previousPosition === WaypointPosition.Unknown
    ) {
      onLeave?.(callbackArg);
    }

    const isRapidScrollDown =
      previousPosition === WaypointPosition.Below &&
      currentPosition === WaypointPosition.Above;
    const isRapidScrollUp =
      previousPosition === WaypointPosition.Above &&
      currentPosition === WaypointPosition.Below;

    if (fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
      // If the scroll event isn't fired often enough to occur while the
      // waypoint was visible, we trigger both callbacks anyway.
      onEnter?.({
        currentPosition: WaypointPosition.Inside,
        previousPosition,
        event,
        waypointTop: bounds.waypointTop,
        waypointBottom: bounds.waypointBottom,
        viewportTop: bounds.viewportTop,
        viewportBottom: bounds.viewportBottom,
      });
      onLeave?.({
        currentPosition,
        previousPosition: WaypointPosition.Inside,
        event,
        waypointTop: bounds.waypointTop,
        waypointBottom: bounds.waypointBottom,
        viewportTop: bounds.viewportTop,
        viewportBottom: bounds.viewportBottom,
      });
    }
  };

  private getBounds() {
    const { horizontal } = this.props;
    const {
      left,
      top,
      right,
      bottom,
    } = this.refElement.current.getBoundingClientRect();
    const waypointTop = horizontal ? left : top;
    const waypointBottom = horizontal ? right : bottom;

    let contextHeight: number;
    let contextScrollTop: number;
    if (this.scrollableAncestor === window) {
      contextHeight = horizontal ? window.innerWidth : window.innerHeight;
      contextScrollTop = 0;
    } else {
      const node = this.scrollableAncestor as HTMLElement;
      contextHeight = horizontal ? node.offsetWidth : node.offsetHeight;
      contextScrollTop = horizontal
        ? node.getBoundingClientRect().left
        : node.getBoundingClientRect().top;
    }

    const { bottomOffset, topOffset } = this.props;
    const topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
    const bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
    const contextBottom = contextScrollTop + contextHeight;

    return {
      waypointTop,
      waypointBottom,
      viewportTop: contextScrollTop + topOffsetPx,
      viewportBottom: contextBottom - bottomOffsetPx,
    };
  }

  render() {
    const { children } = this.props;

    if (!children) {
      // We need an element that we can locate in the DOM to determine where it is
      // rendered relative to the top of its context.
      return (
        <span
          ref={this.refElement as React.RefObject<HTMLSpanElement>}
          style={{ fontSize: 0 }}
        />
      );
    }

    const child = Children.only(children);
    if (isDOMElement(child) || isForwardRef(child)) {
      const ref = (node: Element) => {
        this.refElement.current = node;

        const chRef: React.Ref<unknown> = (child as any).ref;
        if (chRef) {
          if (typeof chRef === 'function') {
            chRef(node);
          } else {
            (chRef as React.MutableRefObject<unknown>).current = node;
          }
        }
      };

      return cloneElement(child, { ref });
    }

    return cloneElement(child as any, { innerRef: this.refElement });
  }
}

function ensureRefIsUsedByChild(children, ref) {
  if (children && !isDOMElement(children) && !ref) {
    throw new Error(
      '<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a ' +
        'DOM element (e.g. <div>) nor does it use the innerRef prop.\n'
    );
  }
}
