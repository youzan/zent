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
import { setValueForStyles } from '../utils/style/CSSPropertyOperations';

function diffStyle(prev: React.CSSProperties, next: React.CSSProperties) {
  const result: React.CSSProperties = {};
  const prevKeys = Object.keys(prev) as Array<keyof React.CSSProperties>;
  for (let i = 0; i < prevKeys.length; i += 1) {
    const key = prevKeys[i];
    if (!next[key]) {
      result[key] = '';
    }
  }
  const nextKeys = Object.keys(next) as Array<keyof React.CSSProperties>;
  for (let i = 0; i < prevKeys.length; i += 1) {
    const key = nextKeys[i];
    result[key] = next[key];
  }
  return result;
}

export interface IPortalProps extends Partial<IPurePortalProps> {
  visible?: boolean;
  layer?: string;
  onLayerReady?: (node: HTMLElement) => void;
  blockPageScroll?: boolean;
  closeOnESC?: boolean;
  closeOnClickOutside?: boolean;
  useLayerForClickAway?: boolean;
  onClose?: (e: KeyboardEvent | TouchEvent | MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
      className,
      style,
      blockPageScroll = false,
      closeOnESC = false,
      closeOnClickOutside = false,
      children,
      append,
    } = props;
    const node = useMemo(() => document.createElement(layer), [layer]);
    const parent = useMemo(() => getNodeFromSelector(selector), [selector]);
    const propsRef = useRef<IPortalProps>(props);
    propsRef.current = props;
    const prevStyleRef = useRef<React.CSSProperties | undefined>(style);
    const purePortalRef = useRef<PurePortal>(null);

    // Methods for use on ref
    const contains = useCallback((node: Node) => {
      const purePortal = purePortalRef.current;
      if (!purePortal) {
        return false;
      }
      return purePortal.contains(node);
    }, []);
    useImperativeHandle<IPortalImperativeHandlers, IPortalImperativeHandlers>(
      ref,
      () => ({
        contains,
        purePortalRef,
      }),
      []
    );

    useLayoutEffect(() => {
      if (!visible || !parent) {
        return noop;
      }
      parent.appendChild(node);
      return () => {
        parent.removeChild(node);
      };
    }, [visible, node, parent]);

    useLayoutEffect(() => {
      className && (node.className = className);
    }, [node, className]);

    useLayoutEffect(() => {
      const result = diffStyle(prevStyleRef.current || {}, style || {});
      setValueForStyles(node, result);
      prevStyleRef.current = style;
    }, [node, style]);

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
      if (
        !visible ||
        !blockPageScroll ||
        !parent ||
        !(parent instanceof HTMLElement) ||
        !hasScrollbarY(parent)
      ) {
        return noop;
      }
      const { overflowY, paddingRight } = parent.style;
      const originalPadding = getComputedStyle(parent).paddingRight;
      const newPadding = parseFloat(originalPadding || '0') + SCROLLBAR_WIDTH;
      parent.style.overflowY = 'hidden';
      parent.style.paddingRight = `${newPadding}px`;
      return () => {
        parent.style.overflowY = overflowY;
        parent.style.paddingRight = paddingRight;
      };
    }, [parent, visible, blockPageScroll]);

    useLayoutEffect(() => {
      if (!visible) {
        return noop;
      }

      function handler(event: TouchEvent | MouseEvent) {
        const { closeOnClickOutside, onClose } = propsRef.current;
        if (event.defaultPrevented || !closeOnClickOutside || !visible) {
          return;
        }

        const { target } = event;
        if (!(target instanceof Node) || target === node || !contains(target)) {
          onClose && onClose(event);
        }
      }

      let dispose = noop;
      if (closeOnClickOutside) {
        if (useLayerForClickAway) {
          node.addEventListener('touchstart', handler);
          node.addEventListener('click', handler);
          dispose = () => {
            node.removeEventListener('touchstart', handler);
            node.removeEventListener('click', handler);
          };
        } else {
          window.addEventListener('touchstart', handler);
          window.addEventListener('click', handler);
          dispose = () => {
            window.removeEventListener('touchstart', handler);
            window.removeEventListener('click', handler);
          };
        }
      }

      const { onLayerReady } = propsRef.current;
      onLayerReady && onLayerReady(node);

      return dispose;
    }, [visible, useLayerForClickAway, !!closeOnClickOutside, node]);

    useEffect(() => {
      if (!visible || !closeOnESC) {
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
    }, [closeOnESC, visible]);

    return visible ? (
      <PurePortal ref={purePortalRef} append={append} selector={node}>
        {children}
      </PurePortal>
    ) : null;
  }
);

Portal.displayName = 'ZentPortal';

export default Portal;
