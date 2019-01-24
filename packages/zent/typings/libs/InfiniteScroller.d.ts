/// <reference types="react" />

declare module 'zent/lib/infinite-scroller' {
  interface IInfiniteScrollerProps {
    className?: string;
    prefix?: string;
    hasMore?: boolean;
    loadMore?: (() => Promise<any>) | ((stopLoading: () => void) => void);
    offset?: number;
    initialLoad?: boolean;
    useWindow?: boolean;
    useCapture?: boolean;
    loader?: React.ReactNode;
  }

  export default class InfiniteScroller extends React.Component<
    IInfiniteScrollerProps,
    any
  > {}
}
