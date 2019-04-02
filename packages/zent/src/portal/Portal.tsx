import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  forwardRef,
  useEffect,
  useCallback,
} from 'react';
import * as keycode from 'keycode';
import noop from 'lodash-es/noop';

import PurePortal, { IPurePortalProps } from './PurePortal';
import { getNodeFromSelector, hasScrollbarY } from './util';
import { SCROLLBAR_WIDTH } from '../utils/getScrollbarWidth';

export interface IPortalProps extends IPurePortalProps {
  visible?: boolean;
  layer?: string;
  useLayerForClickAway?: boolean;
  onClickAway?: (e: TouchEvent | MouseEvent) => void;
  onLayerReady?: (node: HTMLElement) => void;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  withNonScrollable?: boolean;
  withEscToClose?: boolean;
  onClose?: (e: KeyboardEvent) => void;
  children?: React.ReactNode;
}

export interface IPortalImperativeHandlers {
  contains(node: Node): boolean;
  purePortalRef: React.RefObject<PurePortal | undefined>;
}

export const Portal = forwardRef<IPortalImperativeHandlers, IPortalProps>(
  (props, ref) => {
    const {
      visible = true,
      layer = 'div',
      selector = 'body',
      useLayerForClickAway = false,
      onClickAway,
      className,
      style,
      withNonScrollable = false,
      withEscToClose = false,
      children,
      append,
    } = props;
    const propsRef = useRef<IPortalProps>() as React.MutableRefObject<
      IPortalProps
    >;
    propsRef.current = props;
    const purePortalRef = useRef<PurePortal>(null);
    const contains = useCallback(
      (node: Node) => {
        const purePortal = purePortalRef.current;
        if (!purePortal) {
          return false;
        }
        return purePortal.contains(node);
      },
      [purePortalRef]
    );
    useImperativeHandle<IPortalImperativeHandlers, IPortalImperativeHandlers>(
      ref,
      () => ({
        contains,
        purePortalRef,
      }),
      [purePortalRef, contains]
    );
    const node = useMemo(() => document.createElement(layer), [layer]);
    const parent = useMemo(() => getNodeFromSelector(selector), [selector]);

    useLayoutEffect(() => {
      if (!visible || !parent) {
        return noop;
      }
      parent.appendChild(node);
      className && (node.className = className);
      if (style) {
        const cssKeys = Object.keys(style) as Array<keyof CSSStyleDeclaration>;
        if (cssKeys.length) {
          node.style.cssText = cssKeys.map(k => `${k}: ${style[k]}`).join('; ');
        }
      }
      return () => {
        parent.removeChild(node);
      };
    }, [visible, node, parent, style, className]);

    useLayoutEffect(() => {
      if (!visible || !useLayerForClickAway) {
        return noop;
      }
      const { position, top, bottom, left, right } = node.style;
      node.style.position = parent === document.body ? 'fixed' : 'absolute';
      node.style.top = '0';
      node.style.bottom = '0';
      node.style.left = '0';
      node.style.right = '0';
      return () => {
        node.style.position = position;
        node.style.top = top;
        node.style.bottom = bottom;
        node.style.left = left;
        node.style.right = right;
      };
    }, [node, useLayerForClickAway, visible]);

    useLayoutEffect(() => {
      if (!visible || !(parent instanceof HTMLElement)) {
        return noop;
      }
      const { overflowY, paddingRight } = parent.style;
      if (hasScrollbarY(parent)) {
        const originalPadding = getComputedStyle(parent).paddingRight;
        const newPadding = parseFloat(originalPadding || '0') + SCROLLBAR_WIDTH;
        parent.style.overflowY = 'hidden';
        parent.style.paddingRight = `${newPadding}px`;
      }
      return () => {
        parent.style.overflowY = overflowY;
        parent.style.paddingRight = paddingRight;
      };
    }, [parent, visible, withNonScrollable]);

    useEffect(() => {
      if (!visible) {
        return noop;
      }
      function onClickAway(event: TouchEvent | MouseEvent) {
        const { onClickAway } = propsRef.current;
        if (event.defaultPrevented || !onClickAway || !visible) {
          return;
        }
        const { target } = event;
        if (!(target instanceof Node) || target === node || !contains(target)) {
          onClickAway && onClickAway(event);
        }
      }
      if (useLayerForClickAway) {
        node.addEventListener('touchstart', onClickAway);
        node.addEventListener('click', onClickAway);
      } else if (onClickAway) {
        window.addEventListener('touchstart', onClickAway);
        window.addEventListener('click', onClickAway);
      }
      const { onLayerReady } = propsRef.current;
      onLayerReady && onLayerReady(node);
      return () => {
        if (useLayerForClickAway) {
          node.removeEventListener('touchstart', onClickAway);
          node.removeEventListener('click', onClickAway);
        } else if (onClickAway) {
          window.removeEventListener('touchstart', onClickAway);
          window.removeEventListener('click', onClickAway);
        }
      };
    }, [visible, useLayerForClickAway, !!onClickAway, node, parent, propsRef]);

    useEffect(() => {
      if (!visible || !withEscToClose) {
        return noop;
      }
      function onKeyUp(e: KeyboardEvent) {
        const { onClose } = propsRef.current;
        if (!onClose) {
          return;
        }
        if (keycode(e) === 'esc') {
          onClose(e);
        }
      }
      document.body.addEventListener('keyup', onKeyUp);
      return () => {
        document.body.removeEventListener('keyup', onKeyUp);
      };
    }, [withEscToClose, visible]);

    return visible ? (
      <PurePortal ref={purePortalRef} append={append} selector={node}>
        {children}
      </PurePortal>
    ) : null;
  }
);

Portal.displayName = 'ZentPortal';

export default Portal;
