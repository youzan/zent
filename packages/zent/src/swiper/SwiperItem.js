import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class SwiperItem extends Component {
  static contextTypes = {
    component: PropTypes.any
  };

  state = {
    isAcitve: false,
    isReady: false,
    translateDistance: 0
  };

  getParent = () => {
    return this.context.component;
  };

  componentDidMount() {
    this.getParent().addChild(this);
  }

  componentWillUnMount() {
    this.getParent().removeChild(this);
  }

  calculateIndex = (index, currentIndex, length) => {
    if (currentIndex === 0 && index === length - 1) {
      return -1;
    } else if (currentIndex === length - 1 && index === 0) {
      return length;
    }

    return index;
  };

  translate = (index, currentIndex) => {
    const parent = findDOMNode(this.getParent());
    const parentWidth = parent.offsetWidth;
    const length = this.getParent().state.childs.length;

    if (index !== currentIndex && length > 2) {
      index = this.calculateIndex(index, currentIndex, length);
    }

    const isActive = index === currentIndex;
    const translateDistance = parentWidth * (index - currentIndex);
    const isReady = true;

    this.setState({ isActive, translateDistance, isReady });
  };

  render() {
    const { prefix, transition, children } = this.props;
    const { isActive, isReady, translateDistance } = this.state;

    const classString = cx(`${prefix}-swiper__item`, {
      [`${prefix}-swiper__item-active`]: isActive
    });
    const translateString = `translateX(${translateDistance}px)`;

    return (
      <div
        className={classString}
        style={{
          transitionTimingFunction: transition,
          msTransform: { translateString },
          WebkitTransform: { translateString },
          transform: { translateString },
          display: isReady ? 'inlineBlock' : 'none'
        }}
      >
        {children}
      </div>
    );
  }
}
