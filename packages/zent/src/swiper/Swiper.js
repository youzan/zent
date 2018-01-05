import React, { PureComponent, Component, Children, cloneElement } from 'react';
import WindowResizeHandler from 'utils/component/WindowResizeHandler';
import Icon from 'icon';
import PropTypes from 'prop-types';
import cx from 'classnames';

import forEach from 'lodash/forEach';
import throttle from 'lodash/throttle';

import SwiperDots from './SwiperDots';

function setStyle(target, styles) {
  const { style } = target;

  Object.keys(styles).forEach(attribute => {
    style[attribute] = styles[attribute];
  });
}

export default class Swiper extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    transitionDuration: PropTypes.number,
    autoplay: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    dots: PropTypes.bool,
    dotsColor: PropTypes.string,
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
    dotsColor: 'black',
    dotsSize: 'normal',
    arrows: false,
    arrowsType: 'dark'
  };

  state = {
    currentIndex: 0
  };

  init = () => {
    const { autoplay, children } = this.props;
    const { currentIndex } = this.state;
    const childrenCount = Children.count(children);
    const innerElements = this.swiperContainer.children;

    this.clearAutoplay();
    this.setSwiperWidth();
    setStyle(this.swiperContainer, {
      width: `${this.swiperWidth * innerElements.length}px`
    });

    forEach(innerElements, item => {
      setStyle(item, {
        width: `${100 / innerElements.length}%`
      });
    });

    if (childrenCount > 1) {
      autoplay && this.startAutoplay();
      this.translate(currentIndex, null, true);
    }
  };

  getSwiper = swiper => {
    this.swiper = swiper;
  };

  getSwiperContainer = swiperContainer => {
    this.swiperContainer = swiperContainer;
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
    // 当动画进行时禁用用户的切换操作
    if (this.isSwiping) {
      return;
    }
    this.isSwiping = true;
    this.setState({ currentIndex: index });
  };

  translate = (currentIndex, prevIndex, isSilent) => {
    const { transitionDuration, children: { length }, onChange } = this.props;
    const initIndex = -1;
    const itemWidth = this.swiperWidth;
    const translateDistance = itemWidth * (initIndex - currentIndex);
    const realDuration = isSilent ? 0 : transitionDuration;

    setStyle(this.swiperContainer, {
      transform: `translateX(${translateDistance}px)`,
      'transition-duration': `${realDuration}ms`
    });

    if (currentIndex > length - 1 || currentIndex < 0) {
      // 如果当前元素为复制元素，则做一次复位操作，再次移动到真实元素，在此之前，不会将isSwiping的状态更改为false
      return this.resetPosition(currentIndex);
    }

    // 等待动画结束之后将isSwiping置为false
    setTimeout(() => {
      this.isSwiping = false;
    }, realDuration);

    onChange && onChange(currentIndex, this.getRealPrevIndex(prevIndex));
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

    if (index > length - 1) {
      return length - 1;
    } else if (index < 0) {
      return 0;
    }

    return index;
  };

  cloneChildren = children => {
    const length = Children.count(children);

    if (length <= 1) {
      return children;
    }

    const clonedChildren = new Array(length + 2);
    Children.forEach(children, (child, index) => {
      clonedChildren[index + 1] = child;
      if (index === 0) {
        clonedChildren[length + 1] = child;
      } else if (index === length - 1) {
        clonedChildren[0] = child;
      }
    });

    return clonedChildren;
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

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    const { children: newChildren } = nextProps;

    if (Children.count(children) !== Children.count(newChildren)) {
      this.setState(
        {
          currentIndex: 0
        },
        () => this.init()
      );
    }
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    const { children: { length } } = this.props;
    const { currentIndex } = this.state;
    const prevIndex = prevState.currentIndex;
    // isSilent表示静默地做一次位移动画，在用户无感知的情况下从复制元素translate到真实元素
    const isSilent = prevIndex > length - 1 || prevIndex < 0;

    if (prevIndex === currentIndex) {
      return;
    }

    this.translate(currentIndex, prevIndex, isSilent);
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
    const childrenCount = Children.count(children);
    const clonedChildren = this.cloneChildren(children);

    return (
      <div
        ref={this.getSwiper}
        className={classString}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {arrows &&
          childrenCount > 1 && (
            <div
              className={`${prefix}-swiper__arrow ${prefix}-swiper__arrow-left`}
              onClick={this.prev}
            >
              <Icon
                type="right-circle"
                className={`${prefix}-swiper__arrow-icon`}
              />
            </div>
          )}
        {arrows &&
          childrenCount > 1 && (
            <div
              className={`${prefix}-swiper__arrow ${prefix}-swiper__arrow-right`}
              onClick={this.next}
            >
              <Icon
                type="right-circle"
                className={`${prefix}-swiper__arrow-icon`}
              />
            </div>
          )}
        <div
          ref={this.getSwiperContainer}
          className={`${prefix}-swiper__container`}
        >
          {Children.map(clonedChildren, (child, index) => {
            return cloneElement(child, {
              key: index - 1,
              style: { float: 'left', height: '100%' }
            });
          })}
        </div>
        {dots &&
          childrenCount > 1 && (
            <SwiperDots
              prefix={prefix}
              dotsColor={dotsColor}
              dotsSize={dotsSize}
              items={children}
              currentIndex={currentIndex}
              onDotsClick={this.handleDotsClick}
            />
          )}
        <WindowResizeHandler onResize={throttle(this.init, 1000 / 60)} />
      </div>
    );
  }
}
