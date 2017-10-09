import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

export default class InfiniteScroller extends (PureComponent || Component) {
  static PropTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    offset: PropTypes.num
  };

  static defaultProps = {
    prefix: 'zent',
    hasMore: true,
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
    const { hasMore, loadMore } = this.props;
    if (!hasMore) {
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
