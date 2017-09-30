import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

export default class InfiniteScroller extends (PureComponent || Component) {
  static PropTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    canLoadMore: PropTypes.bool,
    loadMore: PropTypes.func,
    offset: PropTypes.num
  };

  static defaultProps = {
    prefix: 'zent',
    canLoadMore: true,
    offset: 20
  };

  isScrollAtBottom = () => {
    const { offset } = this.props;
    const { scrollHeight, clientHeight, scrollTop } = this.scroller;
    let isScrollAtBottom = false;

    if (scrollHeight - clientHeight - scrollTop <= offset) {
      isScrollAtBottom = true;
    }

    return isScrollAtBottom;
  };

  handleScroll = () => {
    const { canLoadMore, loadMore } = this.props;
    if (!canLoadMore) {
      return;
    }

    if (this.isScrollAtBottom()) {
      loadMore();
    }
  };

  render() {
    const { prefix, className, children } = this.props;
    return (
      <div
        ref={scroller => (this.scroller = scroller)}
        className={`${prefix}-infinite-scroller ${className}`}
        onScroll={throttle(this.handleScroll, 200)}
      >
        {children}
      </div>
    );
  }
}
