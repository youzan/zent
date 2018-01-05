import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Loading from 'loading';

export default class InfiniteScroller extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    offset: PropTypes.number,
    initialLoad: PropTypes.bool,
    useWindow: PropTypes.bool,
    useCapture: PropTypes.bool,
    loader: PropTypes.node
  };

  static defaultProps = {
    prefix: 'zent',
    hasMore: true,
    offset: 20,
    initialLoad: true,
    useWindow: true,
    useCapture: false,
    loader: <Loading className="zent-infinite-scroller-loading" show />
  };

  state = {
    isLoadingShow: false
  };

  stopLoading = () => {
    this.setState({ isLoadingShow: false });
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
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  };

  isScrollAtBottom = () => {
    const { offset, useWindow } = this.props;
    let offsetDistance;

    if (useWindow) {
      const windowScrollTop = this.getWindowScrollTop();
      offsetDistance =
        this.calculateTopPosition(this.scroller) +
        this.scroller.offsetHeight -
        windowScrollTop -
        window.innerHeight;
    } else {
      const { scrollHeight, clientHeight, scrollTop } = this.scroller;
      offsetDistance = scrollHeight - clientHeight - scrollTop;
    }

    return offsetDistance <= offset;
  };

  handleScroll = () => {
    const { hasMore, loadMore } = this.props;
    if (!hasMore || !this.isScrollAtBottom()) {
      return;
    }

    this.setState({
      isLoadingShow: true
    });

    if (loadMore.length > 0) {
      loadMore(this.stopLoading);
    } else {
      loadMore()
        .then(() => {
          this.setState({ isLoadingShow: false });
        })
        .catch(() => {
          this.setState({ isLoadingShow: false });
        });
    }
  };

  addScrollListener = () => {
    const { useWindow, useCapture } = this.props;

    let scrollEl = window;
    if (!useWindow) {
      scrollEl = this.scroller;
    }

    scrollEl.addEventListener('scroll', this.handleScroll, useCapture);
    scrollEl.addEventListener('resize', this.handleScroll, useCapture);
  };

  removeScrollListener = () => {
    const { useWindow, useCapture } = this.props;

    let scrollEl = window;
    if (!useWindow) {
      scrollEl = this.scroller;
    }

    scrollEl.removeEventListener('scroll', this.handleScroll, useCapture);
    scrollEl.removeEventListener('resize', this.handleScroll, useCapture);
  };

  componentDidMount() {
    const { loadMore, initialLoad } = this.props;

    this.addScrollListener();

    if (initialLoad) {
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
      useWindow
    } = this.props;
    const { isLoadingShow } = this.state;
    const classString = cx(`${prefix}-infinite-scroller`, className, {
      [`${prefix}-infinite-scroller-y`]: !useWindow
    });
    return (
      <div ref={scroller => (this.scroller = scroller)} className={classString}>
        {children}
        {hasMore && isLoadingShow && loader}
      </div>
    );
  }
}
