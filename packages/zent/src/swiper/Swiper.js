import React, { PureComponent, Children, cloneElement } from 'react';
import WindowResizeHandler from 'utils/component/WindowResizeHandler';
import Icon from 'icon';
import PropTypes from 'prop-types';
import cx from 'classnames';
import throttle from 'lodash/throttle';

import SwiperDots from './SwiperDots';

export default class Swiper extends PureComponent {
  static PropTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    transitionDuration: PropTypes.number,
    autoplay: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    dots: PropTypes.bool,
    dotsColor: PropTypes.oneOf(['default', 'primary', 'success', 'danger']),
    dotsSize: PropTypes.oneOf(['normal', 'small', 'large']),
    arrows: PropTypes.bool,
    arrowsType: PropTypes.oneOf(['dark', 'light']),
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
    transitionDuration: 300,
    autoplay: false,
    autoplayInterval: 3000,
    dots: true,
    dotsColor: 'default',
    dotsSize: 'normal',
    arrows: false,
    arrowsType: 'dark'
  };

  state = {
    currentIndex: 0
  };

  init = () => {
    const { currentIndex } = this.state;
    const innerElements = [].slice.call(this.swiperContainer.children);

    this.setSwiperWidth();
    this.setStyle(this.swiperContainer, {
      width: `${this.swiperWidth * innerElements.length}px`
    });

    for (let i = 0; i < innerElements.length; i++) {
      this.setStyle(innerElements[i], {
        width: `${100 / innerElements.length}%`
      });
    }

    this.translate(currentIndex, true);
  };

  getSwiper = swiper => {
    this.swiper = swiper;
  };

  getSwiperContainer = swiperContainer => {
    this.swiperContainer = swiperContainer;
  };

  setStyle = (target, styles) => {
    Object.keys(styles).forEach(attribute => {
      target.style[attribute] = styles[attribute];
    });
  };

  setSwiperWidth = () => {
    this.swiperWidth = this.swiper.getBoundingClientRect().width;
  };

  startAutoplay = () => {
    const { autoplayInterval } = this.props;
    this.autoplayTimer = setInterval(this.next, Number(autoplayInterval));
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
    let currentIndex = index;
    this.setState({ currentIndex });
  };

  translate = (currentIndex = 0, isSilent = false) => {
    const { transitionDuration } = this.props;
    const initIndex = -1;
    const itemWidth = this.swiperWidth;
    const translateDistance = itemWidth * (initIndex - currentIndex);

    this.setStyle(this.swiperContainer, {
      transform: `translateX(${translateDistance}px)`,
      'transition-duration': isSilent ? '0ms' : `${transitionDuration}ms`
    });
  };

  resetPosition = currentIndex => {
    const { transitionDuration, children: { length } } = this.props;
    if (currentIndex < 0) {
      setTimeout(
        () =>
          this.setState({
            currentIndex: length - 1
          }),
        transitionDuration
      );
    } else {
      setTimeout(
        () =>
          this.setState({
            currentIndex: 0
          }),
        transitionDuration
      );
    }
  };

  getRealPrevIndex = index => {
    const { children: { length } } = this.props;
    let realIndex = index;

    if (realIndex > length - 1) {
      realIndex = length - 1;
    } else if (realIndex < 0) {
      realIndex = 0;
    }

    return realIndex;
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

  componentDidMount() {
    const { autoplay } = this.props;
    autoplay && this.startAutoplay();
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange, children: { length } } = this.props;
    const { currentIndex } = this.state;
    const prevIndex = prevState.currentIndex;

    if (prevIndex === currentIndex) {
      return;
    }

    const isSilent = prevIndex > length - 1 || prevIndex < 0;
    this.translate(currentIndex, isSilent);

    if (currentIndex > length - 1 || currentIndex < 0) {
      return this.resetPosition(currentIndex);
    }

    onChange && onChange(currentIndex, this.getRealPrevIndex(prevIndex));
  }

  componentWillUnmount() {
    this.clearAutoplay();
  }

  render() {
    const {
      className,
      prefix,
      dots,
      dotsColor,
      dotsSize,
      arrows,
      arrowsType,
      children
    } = this.props;
    const { currentIndex } = this.state;

    const classString = cx(`${prefix}-swiper`, className, {
      [`${prefix}-swiper-light`]: arrows && arrowsType === 'light'
    });

    return (
      <div
        ref={this.getSwiper}
        className={classString}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {arrows &&
          Children.count(children) > 1 &&
          <div
            className={`${prefix}-swiper__arrow ${prefix}-swiper__arrow-left`}
            onClick={this.prev}
          >
            <Icon
              type="right-circle"
              className={`${prefix}-swiper__arrow-icon`}
            />
          </div>}
        {arrows &&
          Children.count(children) > 1 &&
          <div
            className={`${prefix}-swiper__arrow ${prefix}-swiper__arrow-right`}
            onClick={this.next}
          >
            <Icon
              type="right-circle"
              className={`${prefix}-swiper__arrow-icon`}
            />
          </div>}
        <div
          ref={this.getSwiperContainer}
          className={`${prefix}-swiper__container`}
        >
          {Children.count(children) > 1 &&
            cloneElement(children[children.length - 1], {
              key: -1,
              style: { float: 'left', height: '100%' }
            })}
          {Children.map(children, (child, index) => {
            return cloneElement(child, {
              key: index,
              style: { float: 'left', height: '100%' }
            });
          })}
          {Children.count(children) > 1 &&
            cloneElement(children[0], {
              key: children.lenght,
              style: { float: 'left', height: '100%' }
            })}
        </div>
        {dots &&
          children &&
          children.length > 1 &&
          <SwiperDots
            prefix={prefix}
            dotsColor={dotsColor}
            dotsSize={dotsSize}
            items={children}
            currentIndex={currentIndex}
            onDotsClick={this.handleDotsClick}
          />}
        <WindowResizeHandler onResize={throttle(this.init, 300)} />
      </div>
    );
  }
}
