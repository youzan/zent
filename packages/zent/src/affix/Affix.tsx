import cx from 'classnames';
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Waypoint, IWaypointCallbackData, WaypointPosition } from '../waypoint';
import { useCallbackRef } from '../utils/hooks/useCallbackRef';
import isBrowser from '../utils/isBrowser';
import { useResizeObserver } from '../utils/hooks/use-resize-observer';
import { WindowScrollHandler } from '../utils/component/WindowScrollHandler';

export interface IAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => HTMLElement;
  onPin?: () => void;
  onUnpin?: () => void;
  zIndex?: number;
  className?: string;
  placeholderClassName?: string;
}

export const Affix: React.FC<IAffixProps> = ({
  className,
  placeholderClassName,
  children,
  offsetTop,
  offsetBottom,
  target: targetProp,
  zIndex = 10,
  onPin,
  onUnpin,
}) => {
  const [position, setPosition] = useState(WaypointPosition.Inside);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const placeholderRef = useRef(createRef<HTMLDivElement>());
  const onPinCallbackRef = useCallbackRef(onPin);
  const onUnpinCallbackRef = useCallbackRef(onUnpin);
  const useTop = typeof offsetTop === 'number';
  const useBottom = typeof offsetBottom === 'number';
  const [target, setTarget] = useState<HTMLElement>(null);
  const [targetTop, setTargetTop] = useState<number>(0);
  const [targetBottom, setTargetBottom] = useState<number>(0);

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
    (expectedPosition: WaypointPosition) => ({
      currentPosition,
    }: IWaypointCallbackData) => {
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
    (expectedPrevPosition: WaypointPosition) => ({
      currentPosition,
      previousPosition,
    }: IWaypointCallbackData) => {
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

      if (target) {
        if (position === WaypointPosition.Above) {
          styles.top = offsetTop + targetTop;
        } else {
          styles.bottom = offsetBottom + (window.innerHeight - targetBottom);
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
    target,
    offsetBottom,
    offsetTop,
    targetTop,
    targetBottom,
    position,
    width,
    zIndex,
  ]);

  const targetRectChange = useCallback((target: HTMLElement) => {
    const targetRect = target.getBoundingClientRect();
    setTargetTop(targetRect.top);
    setTargetBottom(targetRect.bottom);
  }, []);

  // init target
  useEffect(() => {
    const targetNode = targetProp?.();
    if (targetNode) {
      setTarget(targetNode);
      targetRectChange(targetNode);
    }
  }, [targetProp, targetRectChange]);

  const onWindowSrcoll = useCallback(() => {
    target && targetRectChange(target);
  }, [targetRectChange, target]);

  const ancestor = useMemo(() => {
    return target ?? (isBrowser ? window : undefined);
  }, [target]);

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
      <WindowScrollHandler onScroll={onWindowSrcoll} />
    </>
  );
};

export default Affix;
