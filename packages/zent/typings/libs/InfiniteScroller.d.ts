/// <reference types="react" />

declare module 'zent/lib/infinite-scroller' {
  interface InfiniteScrollerProps {
    className?: string
    prefix?: string
    hasMore?: boolean
    loadMore?: Function
    offset?: number
    initialLoad?: boolean
    useWindow?: boolean
    useCapture?: boolean
    loader?: React.ReactNode
  }

  export default class InfiniteScroller extends React.Component<IInfiniteScroller, any> {}
}
