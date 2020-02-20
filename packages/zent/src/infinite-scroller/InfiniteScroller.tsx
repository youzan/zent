import * as React from 'react';
import cx from 'classnames';
import BlockLoading from '../loading/BlockLoading';
import { Waypoint, IWaypointCallbackData, WaypointPosition } from '../waypoint';
import isBrowser from '../utils/isBrowser';

export interface IInfiniteScrollerProps {
  className?: string;
  hasMore?: boolean;
  loadMore?: (() => Promise<unknown>) | ((stopLoading?: () => void) => void);
  skipLoadOnMount?: boolean;
  useWindow?: boolean;
  loader?: React.ReactNode;
}

const DEFAULT_LOADER = <BlockLoading height={60} loading icon="circle" />;

export const InfiniteScroller: React.FC<IInfiniteScrollerProps> = ({
  hasMore = false,
  loadMore,
  skipLoadOnMount = false,
  useWindow = false,
  loader = DEFAULT_LOADER,
  className,
  children,
}) => {
  const [loading, setLoading] = React.useState(false);

  const stopLoading = React.useCallback(() => {
    setLoading(false);
  }, []);

  const load = React.useCallback(() => {
    if (typeof loadMore !== 'function') {
      return;
    }

    setLoading(true);
    if (loadMore.length > 0) {
      loadMore(stopLoading);
    } else {
      (loadMore as () => Promise<unknown>)().then(stopLoading, stopLoading);
    }
  }, [loadMore, stopLoading]);

  const onEnter = React.useCallback(
    (data: IWaypointCallbackData) => {
      if (loading) {
        return;
      }

      const { previousPosition } = data;
      if (previousPosition === WaypointPosition.Below) {
        load();
      }
    },
    [load, loading]
  );

  // Run once after mount
  React.useEffect(() => {
    if (!skipLoadOnMount) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cx(`zent-infinite-scroller`, className, {
        [`zent-infinite-scroller-y`]: !useWindow,
      })}
    >
      {children}
      {hasMore && isBrowser && (
        <Waypoint
          scrollableAncestor={useWindow ? window : undefined}
          onEnter={onEnter}
        />
      )}
      {loading && loader}
    </div>
  );
};

export default InfiniteScroller;
