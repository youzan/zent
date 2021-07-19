import cx from 'classnames';
import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Waypoint, IWaypointCallbackData, WaypointPosition } from '../waypoint';
import { useCallbackRef } from '../utils/hooks/useCallbackRef';
import isBrowser from '../utils/isBrowser';
import { useResizeObserver } from '../utils/hooks/useResizeObserver';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import { getViewportHeight } from '../utils/dom/getViewportSize';

export interface IAffixImperativeHandlers {
  updatePosition: () => void;
}

export interface IAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  getAffixContainer?: () => HTMLElement | null;
  children?: React.ReactNode;
  onPin?: () => void;
  onUnpin?: () => void;
  zIndex?: number;
  className?: string;
  placeholderClassName?: string;
}

export const Affix = forwardRef<IAffixImperativeHandlers, IAffixProps>(
  (
    {
      className,
      placeholderClassName,
      children,
      offsetTop,
      offsetBottom,
      getAffixContainer,
      zIndex = 10,
      onPin,
      onUnpin,
    },
    affixRef
  ) => {
    const [position, setPosition] = useState(WaypointPosition.Inside);
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const placeholderRef = useRef(createRef<HTMLDivElement>());
    const onPinCallbackRef = useCallbackRef(onPin);
    const onUnpinCallbackRef = useCallbackRef(onUnpin);
    const useTop = typeof offsetTop === 'number';
    const useBottom = typeof offsetBottom === 'number';
    const [container, setContainer] = useState<HTMLElement>(null);
    const [containerTop, setContainerTop] = useState(0);
    const [containerBottom, setContainerBottom] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    const containerBoundingRectChange = useCallback(
      (container: HTMLElement) => {
        const rect = container.getBoundingClientRect();
        useTop && setContainerTop(rect.top);
        useBottom && setContainerBottom(rect.bottom);
      },
      [useTop, useBottom]
    );

    const setSize = useCallback((entries: ResizeObserverEntry[]) => {
      const { borderBoxSize, contentRect } = entries[0];
      if (borderBoxSize && borderBoxSize.length > 0) {
        const [{ inlineSize: width, blockSize: height }] = borderBoxSize;
        setWidth(width);
        setHeight(height);
      } else {
        const { width, height } = contentRect;
        setWidth(width);
        setHeight(height);
      }
    }, []);

    const { observe, disconnect } = useResizeObserver(setSize);

    const pin = useCallback(
      (expectedPosition: WaypointPosition) =>
        ({ currentPosition }: IWaypointCallbackData) => {
          if (currentPosition !== expectedPosition) {
            return;
          }

          const node = placeholderRef.current?.current;
          if (node) {
            setWidth(node.offsetWidth);
            setHeight(node.offsetHeight);
          }
          observe(node);
          setPosition(currentPosition);
          onPinCallbackRef.current?.();
        },
      [onPinCallbackRef, observe]
    );

    const unpin = useCallback(
      (expectedPrevPosition: WaypointPosition) =>
        ({ currentPosition, previousPosition }: IWaypointCallbackData) => {
          if (previousPosition !== expectedPrevPosition) {
            return;
          }

          setWidth(undefined);
          setHeight(undefined);
          disconnect();
          setPosition(currentPosition);
          onUnpinCallbackRef.current?.();
        },
      [onUnpinCallbackRef, disconnect]
    );

    const [pinTop, unpinTop] = useMemo(
      () => [pin(WaypointPosition.Above), unpin(WaypointPosition.Above)],
      [pin, unpin]
    );
    const [pinBottom, unpinBottom] = useMemo(
      () => [pin(WaypointPosition.Below), unpin(WaypointPosition.Below)],
      [pin, unpin]
    );

    const placeholderStyle = useMemo<React.CSSProperties>(() => {
      if (position === WaypointPosition.Inside) {
        return {};
      }

      return {
        height,
      };
    }, [height, position]);

    const containerStyle = useMemo<React.CSSProperties>(() => {
      if (
        position === WaypointPosition.Above ||
        position === WaypointPosition.Below
      ) {
        const styles: React.CSSProperties = {
          position: 'fixed',
          zIndex,
          width,
        };

        if (container) {
          if (position === WaypointPosition.Above) {
            styles.top = offsetTop + containerTop;
          } else {
            styles.bottom = offsetBottom + (windowHeight - containerBottom);
          }
        } else {
          if (position === WaypointPosition.Above) {
            styles.top = offsetTop;
          } else {
            styles.bottom = offsetBottom;
          }
        }
        return styles;
      }

      return { position: 'static' };
    }, [
      container,
      offsetBottom,
      offsetTop,
      containerTop,
      containerBottom,
      windowHeight,
      position,
      width,
      zIndex,
    ]);

    const updatePosition = useCallback(() => {
      container && containerBoundingRectChange(container);
    }, [container, containerBoundingRectChange]);

    // init container
    useEffect(() => {
      const containerNode = getAffixContainer?.();
      if (containerNode) {
        setContainer(containerNode);
        containerBoundingRectChange(containerNode);
        setWindowHeight(getViewportHeight());
      }
    }, [getAffixContainer, containerBoundingRectChange]);

    const onWindowResize = useCallback(() => {
      setWindowHeight(getViewportHeight());
    }, []);

    useImperativeHandle(affixRef, () => ({
      updatePosition,
    }));

    const ancestor = useMemo(() => {
      return container ?? (isBrowser ? window : undefined);
    }, [container]);

    return (
      <>
        {useTop && (
          <Waypoint
            scrollableAncestor={ancestor}
            onEnter={unpinTop}
            onLeave={pinTop}
            topOffset={offsetTop}
          />
        )}
        <div
          className={cx('zent-affix-placeholder', placeholderClassName)}
          style={placeholderStyle}
          ref={placeholderRef.current}
        >
          <div className={cx('zent-affix', className)} style={containerStyle}>
            {children}
          </div>
        </div>
        {useBottom && (
          <Waypoint
            scrollableAncestor={ancestor}
            onEnter={unpinBottom}
            onLeave={pinBottom}
            bottomOffset={offsetBottom}
          />
        )}
        {container && (
          <WindowResizeHandler onResize={onWindowResize} disableThrottle />
        )}
      </>
    );
  }
);

Affix.displayName = 'ZentAffix';
export default Affix;
