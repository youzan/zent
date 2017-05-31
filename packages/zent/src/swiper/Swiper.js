import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SwiperItem from './SwiperItem';
import SwiperDots from './SwiperDots';

export default class Swiper extends Component {
  static PropTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    transition: PropTypes.oneOf([
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
      'linear',
      'step-start',
      'step-end'
    ]),
    autoplay: PropTypes.bool,
    autoplayIterval: PropTypes.number,
    dots: PropTypes.bool,
    dotsColor: PropTypes.oneOf(['default', 'primary', 'success', 'danger']),
    dotsSize: PropTypes.oneOf(['normal', 'small', 'large']),
    onChange: PropTypes.func
  };

  static childContextTypes = {
    component: PropTypes.any
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    transition: 'ease-in-out',
    autoplay: false,
    autoplayIterval: 3000,
    dots: true,
    dotsColor: 'default',
    dotsSize: 'normal'
  };

  state = {
    childs: [],
    currentIndex: null
  };

  swipeChildren = prevIndex => {
    const { childs, currentIndex } = this.state;
    childs.forEach((item, index) => {
      item.translate(index, currentIndex, prevIndex);
    });
  };

  addChild = child => {
    this.state.childs.push(child);
    this.swipeTo(0);
  };

  removeChild = child => {
    const { childs } = this.state;
    const index = childs.indexOf(child);
    childs.splice(index, 1);
    this.swipeTo(0);
  };

  startAutoplay = () => {
    const { autoplayIterval } = this.props;
    this.autoplayTimer = setInterval(this.next, Number(autoplayIterval));
  };

  clearAutoplay = () => {
    clearInterval(this.autoplayTimer);
  };

  next = () => {
    const { currentIndex } = this.state;
    this.swipeTo(currentIndex + 1);
  };

  prev = () => {
    const { currentIndex } = this.state;
    this.swipeTo(currentIndex - 1);
  };

  swipeTo = index => {
    const { childs } = this.state;
    let currentIndex = index;
    if (index > childs.length - 1) {
      currentIndex = 0;
    }
    this.setState({ currentIndex });
  };

  handleMouseEnter = () => {
    const { autoplay } = this.props;
    autoplay && this.clearAutoplay();
  };

  handleMouseLeave = () => {
    const { autoplay } = this.props;
    autoplay && this.startAutoplay();
  };

  handleDotsClick = index => {
    this.setState({ currentIndex: index });
  };

  getChildContext() {
    return {
      component: this
    };
  }

  componentDidMount() {
    const { autoplay } = this.props;
    autoplay && this.startAutoplay();
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;
    const { currentIndex } = this.state;
    const prevIndex = prevState.currentIndex;

    prevIndex !== currentIndex && this.swipeChildren(prevIndex);
    onChange && onChange(currentIndex, prevIndex);
  }

  componentWillUnmount() {
    this.clearAutoplay();
  }

  render() {
    const {
      className,
      prefix,
      transition,
      dots,
      dotsColor,
      dotsSize,
      children
    } = this.props;
    const { childs, currentIndex } = this.state;

    const classString = cx(`${prefix}-swiper`, className);

    return (
      <div
        className={classString}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={`${prefix}-swiper__container`}>
          {Children.map(children, (child, index) => {
            return (
              <SwiperItem key={index} prefix={prefix} transition={transition}>
                {child}
              </SwiperItem>
            );
          })}
        </div>
        {dots &&
          childs.length > 1 &&
          <SwiperDots
            prefix={prefix}
            dotsColor={dotsColor}
            dotsSize={dotsSize}
            items={childs}
            currentIndex={currentIndex}
            onDotsClick={this.handleDotsClick}
          />}
      </div>
    );
  }
}
