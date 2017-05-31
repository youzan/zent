import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class SwiperItem extends Component {
  static contextTypes = {
    component: PropTypes.any
  };

  static generateArray(from, to) {
    let result = [];
    for (let i = from; i <= to; i++) {
      result.push(i);
    }
    return result;
  }

  static setStyle(target, styles) {
    Object.keys(styles).forEach(attribute => {
      target.style[attribute] = styles[attribute];
    });
  }

  state = {
    isAcitve: false,
    isReady: false,
    isOnProgress: false,
    translateDistance: 0
  };

  getParent = () => {
    return this.context.component;
  };

  calculateIndex = (rawIndex, currentIndex, length) => {
    let index = rawIndex;

    if (index === currentIndex || length < 2) {
      return index;
    } else if (currentIndex === 0 && rawIndex === length - 1) {
      index = -1;
    } else if (currentIndex === length - 1 && rawIndex === 0) {
      index = length;
    }

    return index;
  };

  calculateOnProgress = (currentIndex, prevIndex, length) => {
    let onProgressIndex;
    if (
      (currentIndex === 0 && prevIndex === length - 1) ||
      (currentIndex === length - 1 && prevIndex === 0)
    ) {
      onProgressIndex = [currentIndex, prevIndex];
    } else {
      onProgressIndex = currentIndex > prevIndex
        ? this.constructor.generateArray(prevIndex, currentIndex)
        : this.constructor.generateArray(currentIndex, prevIndex);
    }

    return onProgressIndex;
  };

  translate = (rawIndex, currentIndex, prevIndex) => {
    const parent = findDOMNode(this.getParent());
    const parentWidth = parent.offsetWidth;
    const length = this.getParent().state.childs.length;

    const index = this.calculateIndex(rawIndex, currentIndex, length);

    const isActive = index === currentIndex;
    const isOnProgress =
      this.calculateOnProgress(currentIndex, prevIndex, length).indexOf(index) >
      -1;
    const translateDistance = parentWidth * (index - currentIndex);
    const isReady = true;

    this.setState({ isActive, isOnProgress, translateDistance, isReady });
  };

  componentDidMount() {
    this.getParent().addChild(this);
    this.drag = {
      start: 0,
      end: 0,
      isOnProgress: false
    };
  }

  componentWillUnmount() {
    this.getParent().removeChild(this);
  }

  render() {
    const { prefix, transition, children } = this.props;
    const { isActive, isReady, isOnProgress, translateDistance } = this.state;

    const classString = cx(`${prefix}-swiper__item`, {
      [`${prefix}-swiper__item-active`]: isActive,
      [`${prefix}-swiper__item-progress`]: isOnProgress
    });

    return (
      <div
        ref={swiperItem => (this.swiperItem = swiperItem)}
        className={classString}
        style={{
          transitionTimingFunction: transition,
          msTransform: `translateX(${translateDistance}px)`,
          WebkitTransform: `translateX(${translateDistance}px)`,
          transform: `translateX(${translateDistance}px)`,
          display: !isReady && 'none'
        }}
      >
        {children}
      </div>
    );
  }
}
