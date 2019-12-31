import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import BlockLoading from '../loading/BlockLoading';
import { addEventListener } from '../utils/component/event-handler';

export interface IInfiniteScrollerProps {
  className?: string;
  prefix?: string;
  hasMore?: boolean;
  loadMore?: (() => Promise<unknown>) | ((stopLoading?: () => void) => void);
  offset?: number;
  initialLoad?: boolean;
  useWindow?: boolean;
  useCapture?: boolean;
  loader?: React.ReactNode;
}

export class InfiniteScroller extends Component<IInfiniteScrollerProps> {
  static defaultProps = {
    prefix: 'zent',
    hasMore: true,
    offset: 20,
    initialLoad: true,
    useWindow: true,
    useCapture: false,
    loader: <BlockLoading height={60} loading icon="circle" />,
  };

  scroller = React.createRef<HTMLDivElement>();
  eventCancelList = [] as Array<() => void>;

  state = {
    isLoading: false,
  };

  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  calculateTopPosition = el => {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  };

  getWindowScrollTop = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
          document.documentElement ||
          (document.body.parentNode as HTMLHtmlElement) ||
          document.body
        ).scrollTop;
  };

  isScrollAtBottom = () => {
    const { offset, useWindow } = this.props;
    let offsetDistance;

    if (useWindow) {
      const windowScrollTop = this.getWindowScrollTop();
      offsetDistance =
        this.calculateTopPosition(this.scroller.current) +
        this.scroller.current.offsetHeight -
        windowScrollTop -
        window.innerHeight;
    } else {
      const { scrollHeight, clientHeight, scrollTop } = this.scroller.current;
      offsetDistance = scrollHeight - clientHeight - scrollTop;
    }

    return offsetDistance <= offset;
  };

  handleScroll = () => {
    const { hasMore, loadMore } = this.props;
    const { isLoading } = this.state;
    if (!hasMore || !this.isScrollAtBottom() || isLoading) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    if (loadMore.length > 0) {
      loadMore(this.stopLoading);
    } else {
      (loadMore() as Promise<unknown>)
        .then(this.stopLoading)
        .catch(this.stopLoading);
    }
  };

  addScrollListener = () => {
    const { useWindow, useCapture } = this.props;

    let scrollEl: Window | HTMLDivElement = window;
    if (!useWindow) {
      scrollEl = this.scroller.current;
    }

    this.eventCancelList.push(
      addEventListener(scrollEl, 'scroll', this.handleScroll, {
        capture: useCapture,
        passive: true,
      })
    );
    this.eventCancelList.push(
      addEventListener(scrollEl, 'resize', this.handleScroll, {
        capture: useCapture,
        passive: true,
      })
    );
  };

  removeScrollListener = () => {
    this.eventCancelList.forEach(cancel => cancel());
    this.eventCancelList = [];
  };

  componentDidMount() {
    const { loadMore, initialLoad } = this.props;

    this.addScrollListener();

    if (initialLoad && loadMore) {
      loadMore();
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  render() {
    const {
      prefix,
      className,
      children,
      hasMore,
      loader,
      useWindow,
    } = this.props;
    const { isLoading } = this.state;
    const classString = cx(`${prefix}-infinite-scroller`, className, {
      [`${prefix}-infinite-scroller-y`]: !useWindow,
    });
    return (
      <div ref={this.scroller} className={classString}>
        {children}
        {hasMore && isLoading && loader}
      </div>
    );
  }
}

export default InfiniteScroller;
