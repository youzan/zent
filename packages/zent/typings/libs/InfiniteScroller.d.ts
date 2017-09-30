/// <reference types="react" />

declare module 'zent/lib/infinite-scroller' {
  interface InfiniteScrollerProps {
    className?: string
    prefix?: string
    canLoadMore?: boolean
    loadMore?: Function
    offset?: number
  }

  export default class InfiniteScroller extends React.Component<IInfiniteScroller, any> {}
}
