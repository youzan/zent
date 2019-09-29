import * as React from 'react';
import {
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  forwardRef,
  useEffect,
} from 'react';
import noop from 'lodash-es/noop';

import MountElement from './MountElement';
import PurePortal, { IPurePortalProps } from './PurePortal';
import { getNodeFromSelector, hasScrollbarY } from './util';
import memorize from '../utils/memorize-one';
import { SCROLLBAR_WIDTH } from '../utils/getScrollbarWidth';
import { setValueForStyles } from '../utils/style/CSSPropertyOperations';

function diffStyle(prev: React.CSSProperties, next: React.CSSProperties) {
  const result: React.CSSProperties = {};
  const prevKeys = Object.keys(prev);
  for (let i = 0; i < prevKeys.length; i += 1) {
    const key = prevKeys[i];
    if (!next[key]) {
      result[key] = '';
    }
  }
  const nextKeys = Object.keys(next);
  for (let i = 0; i < prevKeys.length; i += 1) {
    const key = nextKeys[i];
    result[key] = next[key];
  }
  return result;
}

interface IPatchMeta {
  count: number;
  paddingRight: CSSStyleDeclaration['paddingRight'];
  overflowY: CSSStyleDeclaration['overflowY'];
}

const patched = new Map<HTMLElement, IPatchMeta>();

function patchElement(parent: HTMLElement) {
  const meta = patched.get(parent);
  if (meta) {
    meta.count += 1;
  } else {
    const { overflowY, paddingRight } = parent.style;
    const originalPadding = getComputedStyle(parent).paddingRight;
    const newPadding = parseFloat(originalPadding || '0') + SCROLLBAR_WIDTH;
    parent.style.overflowY = 'hidden';
    parent.style.paddingRight = `${newPadding}px`;
    const newMeta: IPatchMeta = {
      count: 1,
      overflowY,
      paddingRight,
    };
    patched.set(parent, newMeta);
  }
}

function restoreElement(parent: HTMLElement) {
  const meta = patched.get(parent);
  if (!meta) {
    throw new Error('This looks like a bug of zent, please file an issue');
  }
  if (meta.count === 1) {
    patched.delete(parent);
    parent.style.overflowY = meta.overflowY;
    parent.style.paddingRight = meta.paddingRight;
  } else {
    meta.count -= 1;
  }
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
  container: HTMLElement;
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
    const getParent = useMemo(() => memorize(getNodeFromSelector), []);
    const propsRef = useRef<IPortalProps>(props);
    propsRef.current = props;
    const prevStyleRef = useRef<React.CSSProperties | undefined>(style);
    const purePortalRef = useRef<PurePortal>(null);

    useImperativeHandle<IPortalImperativeHandlers, IPortalImperativeHandlers>(
      ref,
      () => ({
        contains(node: Node) {
          const purePortal = purePortalRef.current;
          if (!purePortal) {
            return false;
          }
          return purePortal.contains(node);
        },
        purePortalRef,
        container: node,
      }),
      [node]
    );

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
      const parent = getParent(selector);
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
    }, [node, useLayerForClickAway, visible, selector]);

    useLayoutEffect(() => {
      const parent = getParent(selector);
      if (
        !visible ||
        !blockPageScroll ||
        !(parent instanceof HTMLElement) ||
        !hasScrollbarY(parent)
      ) {
        return noop;
      }
      patchElement(parent);
      return () => restoreElement(parent);
    }, [selector, visible, blockPageScroll]);

    useLayoutEffect(() => {
      function handler(event: TouchEvent | MouseEvent) {
        const { closeOnClickOutside, onClose, visible } = propsRef.current;
        const purePortal = purePortalRef.current;
        if (
          event.defaultPrevented ||
          !closeOnClickOutside ||
          !visible ||
          !purePortal
        ) {
          return;
        }

        const { target } = event;
        if (
          !(target instanceof Node) ||
          target === node ||
          !purePortal.contains(target)
        ) {
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
    }, [!!useLayerForClickAway, !!closeOnClickOutside, node]);

    useEffect(() => {
      if (!visible || !closeOnESC) {
        return noop;
      }
      function onKeyUp(e: KeyboardEvent) {
        const { onClose } = propsRef.current;
        if (!onClose) {
          return;
        }

        // tslint:disable-next-line deprecation
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
          onClose(e);
        }
      }
      document.body.addEventListener('keyup', onKeyUp);
      return () => {
        document.body.removeEventListener('keyup', onKeyUp);
      };
    }, [closeOnESC, visible]);

    /**
     * @HACK
     * @TODO 当React提供了合适的API后替换掉
     *
     * 这是为了确保在children的componentDidMount(useEffect, useLayoutEffect)在被调用之前把元素挂载到容器里
     * 这里利用了React的内部实现，MountElement的componentDidMount(useEffect, useLayoutEffect)
     * 会在children的之前被调用
     */
    return visible ? (
      <PurePortal ref={purePortalRef} append={append} selector={node}>
        <MountElement node={node} getParent={getParent} selector={selector} />
        {children}
      </PurePortal>
    ) : null;
  }
);

Portal.displayName = 'ZentPortal';

export default Portal;
