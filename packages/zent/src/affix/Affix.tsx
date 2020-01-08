import * as React from 'react';
import cx from 'classnames';

import { Waypoint, IWaypointCallbackData, WaypointPosition } from '../waypoint';
import { useCallbackRef } from '../utils/hooks/useCallbackRef';
import isBrowser from '../utils/isBrowser';

export interface IAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
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
  zIndex = 10,
  onPin,
  onUnpin,
}) => {
  const [position, setPosition] = React.useState(WaypointPosition.Inside);
  const [width, setWidth] = React.useState<number>();
  const [height, setHeight] = React.useState<number>();
  const placeholderRef = React.useRef(React.createRef<HTMLDivElement>());
  const onPinCallbackRef = useCallbackRef(onPin);
  const onUnpinCallbackRef = useCallbackRef(onUnpin);
  const useTop = typeof offsetTop === 'number';
  const useBottom = typeof offsetBottom === 'number';

  const pin = React.useCallback(
    ({ currentPosition }: IWaypointCallbackData) => {
      const node = placeholderRef.current?.current;
      if (node) {
        setWidth(node.offsetWidth);
        setHeight(node.offsetHeight);
      }
      setPosition(currentPosition);
      onPinCallbackRef.current?.();
    },
    [onPinCallbackRef]
  );

  const unpin = React.useCallback(
    ({ currentPosition }: IWaypointCallbackData) => {
      setWidth(undefined);
      setHeight(undefined);
      setPosition(currentPosition);
      onUnpinCallbackRef.current?.();
    },
    [onUnpinCallbackRef]
  );

  const pinTop = React.useCallback(
    (data: IWaypointCallbackData) => {
      const { currentPosition } = data;
      if (currentPosition !== WaypointPosition.Above) {
        return;
      }
      pin(data);
    },
    [pin]
  );

  const unpinTop = React.useCallback(
    (data: IWaypointCallbackData) => {
      const { previousPosition } = data;
      if (previousPosition !== WaypointPosition.Above) {
        return;
      }
      unpin(data);
    },
    [unpin]
  );

  const pinBottom = React.useCallback(
    (data: IWaypointCallbackData) => {
      const { currentPosition } = data;
      if (currentPosition !== WaypointPosition.Below) {
        return;
      }
      pin(data);
    },
    [pin]
  );

  const unpinBottom = React.useCallback(
    (data: IWaypointCallbackData) => {
      const { previousPosition } = data;
      if (previousPosition !== WaypointPosition.Below) {
        return;
      }
      unpin(data);
    },
    [unpin]
  );

  const placeholderStyle = React.useMemo<React.CSSProperties>(() => {
    if (position === WaypointPosition.Inside) {
      return {};
    }

    return {
      width,
      height,
    };
  }, [width, height, position]);

  const containerStyle = React.useMemo<React.CSSProperties>(() => {
    if (
      position === WaypointPosition.Above ||
      position === WaypointPosition.Below
    ) {
      const styles: React.CSSProperties = {
        position: 'fixed',
        zIndex,
        width,
      };

      if (position === WaypointPosition.Above) {
        styles.top = offsetTop;
      } else {
        styles.bottom = offsetBottom;
      }

      return styles;
    }

    return { position: 'static' };
  }, [offsetBottom, offsetTop, position, width, zIndex]);

  const ancestor = isBrowser ? window : undefined;
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
    </>
  );
};

export default Affix;
