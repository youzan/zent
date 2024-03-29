import { Component, Children, cloneElement } from 'react';
import cx from 'classnames';

import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import Icon from '../icon';
import SwiperDots, { IDotsType, IDotsTheme } from './SwiperDots';

function setStyle(target: any, styles: any) {
  const { style } = target;

  Object.keys(styles).forEach(attribute => {
    style[attribute] = styles[attribute];
  });
}

export interface ISwiperProps {
  className?: string;
  transitionDuration?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  dots?: boolean | IDotsType;
  dotsColor?: string;
  dotsSize?: 'normal' | 'small' | 'large';
  dotsTheme?: IDotsTheme;
  arrows?: boolean | 'hover';
  arrowsDisabled?: {
    left?: boolean;
    right?: boolean;
  };
  arrowsSize: 'normal' | 'large';
  arrowsType?: 'dark' | 'light';
  onChange?: (current: number, prev: number | null) => void;
  children?: React.ReactNode;
  renderPrevArrow?: (onPrev: () => void, disabled: boolean) => React.ReactNode;
  renderNextArrow?: (onNext: () => void, disabled: boolean) => React.ReactNode;
}

export interface ISwiperState {
  currentIndex: number;
  prevProps?: ISwiperProps;
}

const defaultRenderPrevArrow: ISwiperProps['renderPrevArrow'] = (
  onPrev,
  disabled
) => {
  return (
    <div
      className={cx('zent-swiper__arrow', 'zent-swiper__arrow-left', {
        'zent-swiper__arrow--disabled': disabled,
      })}
      onClick={!disabled ? onPrev : undefined}
    >
      <Icon type="right-circle" className="zent-swiper__arrow-icon" />
    </div>
  );
};

const defaultRenderNextArrow: ISwiperProps['renderNextArrow'] = (
  onNext,
  disabled
) => {
  return (
    <div
      className={cx('zent-swiper__arrow', 'zent-swiper__arrow-right', {
        'zent-swiper__arrow--disabled': disabled,
      })}
      onClick={!disabled ? onNext : undefined}
    >
      <Icon type="right-circle" className="zent-swiper__arrow-icon" />
    </div>
  );
};

export class Swiper extends Component<ISwiperProps, ISwiperState> {
  static defaultProps = {
    className: '',
    transitionDuration: 300,
    autoplay: false,
    autoplayInterval: 3000,
    dots: true,
    dotsTheme: 'dark',
    dotsSize: 'normal',
    arrows: false,
    arrowsSize: 'normal',
    arrowsType: 'dark',
    arrowsDisabled: {
      left: false,
      right: false,
    },
    renderPrevArrow: defaultRenderPrevArrow,
    renderNextArrow: defaultRenderNextArrow,
  };

  swiper!: HTMLDivElement;
  swiperContainer!: HTMLDivElement;
  swiperWidth!: number;
  autoplayTimer?: number;
  isSwiping!: boolean;
  isMouseEnter!: boolean;

  state = {
    currentIndex: 0,
  };

  init = (isResetToOrigin = false) => {
    const { autoplay, children } = this.props;
    const { currentIndex } = this.state;
    const childrenCount = Children.count(children);
    const innerElements = this.swiperContainer.children;

    this.clearAutoplay();
    this.setSwiperWidth();
    setStyle(this.swiperContainer, {
      width: `${this.swiperWidth * innerElements.length}px`,
    });

    for (let i = 0; i < innerElements.length; i++) {
      const item = innerElements[i];
      setStyle(item, {
        width: `${100 / innerElements.length}%`,
      });
    }

    isResetToOrigin && this.translate(-1, null, true);

    if (childrenCount > 1) {
      autoplay && this.startAutoplay();
      this.translate(currentIndex, null, true);
    }
  };

  getSwiper = (swiper: HTMLDivElement) => {
    this.swiper = swiper;
  };

  getSwiperContainer = (swiperContainer: HTMLDivElement) => {
    this.swiperContainer = swiperContainer;
  };

  setSwiperWidth = () => {
    this.swiperWidth = this.swiper.getBoundingClientRect().width;
  };

  startAutoplay = () => {
    const { autoplayInterval } = this.props;
    this.autoplayTimer = setTimeout(this.next, Number(autoplayInterval)) as any;
  };

  clearAutoplay = () => {
    clearTimeout(this.autoplayTimer);
    this.autoplayTimer = undefined;
  };

  next = () => {
    const { currentIndex } = this.state;
    if (Children.count(this.props.children) === 1) {
      return;
    }
    this.swipeTo(currentIndex + 1);
  };

  prev = () => {
    const { currentIndex } = this.state;
    this.swipeTo(currentIndex - 1);
  };

  swipeTo = (index: number) => {
    /** 当index与当前index相同时，则不处理 */
    /** 当动画进行时禁用用户的切换操作 */
    if (index === this.state.currentIndex || this.isSwiping) {
      return;
    }
    this.isSwiping = true;
    this.setState({ currentIndex: index });
  };

  translate = (
    currentIndex: number,
    prevIndex: number | null,
    isSilent?: boolean
  ) => {
    const { autoplay, autoplayInterval, transitionDuration, onChange } =
      this.props;
    const { length } = this.props.children as any;
    const initIndex = -1;
    const itemWidth = this.swiperWidth;
    const translateDistance = itemWidth * (initIndex - currentIndex);
    const realDuration = isSilent ? 0 : transitionDuration;

    if (autoplay && !this.isMouseEnter) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = setTimeout(
        this.next,
        Number(autoplayInterval)
      ) as any;
    }

    setStyle(this.swiperContainer, {
      transform: `translateX(${translateDistance}px)`,
      'transition-duration': `${realDuration}ms`,
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

  resetPosition = (currentIndex: number) => {
    const { transitionDuration } = this.props;
    const { length } = this.props.children as any;

    if (currentIndex < 0) {
      setTimeout(
        () =>
          this.setState({
            currentIndex: length - 1,
          }),
        transitionDuration
      );
    } else {
      setTimeout(
        () =>
          this.setState({
            currentIndex: 0,
          }),
        transitionDuration
      );
    }
  };

  getRealPrevIndex = (index: number | null) => {
    const { length } = this.props.children as any;

    if (index === null) {
      return null;
    }

    if (index > length - 1) {
      return length - 1;
    }

    if (index < 0) {
      return 0;
    }

    return index;
  };

  cloneChildren = (children?: React.ReactNode) => {
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
    this.isMouseEnter = true;
    autoplay && this.clearAutoplay();
  };

  handleMouseLeave = () => {
    const { autoplay } = this.props;
    this.isMouseEnter = false;
    autoplay && this.startAutoplay();
  };

  handleDotsClick = (index: number) => {
    this.setState({ currentIndex: index });
  };

  handleResize = () => this.init();

  static getDerivedStateFromProps(
    props: ISwiperProps,
    state: ISwiperState
  ): Partial<ISwiperState> | null {
    if (!state.prevProps) {
      return {
        prevProps: props,
      };
    }

    const { children: newChildren } = props;
    const { children } = state.prevProps;
    if (Children.count(children) !== Children.count(newChildren)) {
      return {
        currentIndex: 0,
        prevProps: props,
      };
    }

    return null;
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: ISwiperProps, prevState: ISwiperState) {
    const { length } = this.props.children as any;
    const { currentIndex } = this.state;
    const prevIndex = prevState.currentIndex;
    // isSilent表示静默地做一次位移动画，在用户无感知的情况下从复制元素translate到真实元素
    const isSilent = prevIndex > length - 1 || prevIndex < 0;

    if (prevIndex !== currentIndex) {
      this.translate(currentIndex, prevIndex, isSilent);
    }

    // 当从两个子元素删除到一个时特殊处理位移动画
    if (
      Children.count(prevProps.children) !== Children.count(this.props.children)
    ) {
      const isTwoToOneCase =
        Children.count(prevProps.children) === 2 &&
        Children.count(this.props.children) === 1;
      this.init(isTwoToOneCase);
    }
  }

  componentWillUnmount() {
    this.clearAutoplay();
  }

  render() {
    const {
      className,
      dots,
      dotsColor,
      dotsSize,
      dotsTheme,
      arrows,
      arrowsSize,
      arrowsType,
      arrowsDisabled,
      children,
      renderNextArrow,
      renderPrevArrow,
    } = this.props;
    const { currentIndex } = this.state;

    const showDots = !!dots;
    const dotsType = dots === 'round' ? 'round' : 'line';

    const classString = cx('zent-swiper', className, {
      'zent-swiper-light': arrows && arrowsType === 'light',
      'zent-swiper--hover-show-arrow': arrows === 'hover',
      'zent-swiper--arrow-large': arrowsSize === 'large',
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
          childrenCount > 1 &&
          renderPrevArrow(this.prev, arrowsDisabled.left)}
        {arrows &&
          childrenCount > 1 &&
          renderNextArrow(this.next, arrowsDisabled.right)}
        <div ref={this.getSwiperContainer} className="zent-swiper__container">
          {Children.map(clonedChildren, (child: any, index: number) => {
            return cloneElement(child, {
              key: index - 1,
              style: { float: 'left', height: '100%' },
            });
          })}
        </div>
        {showDots && childrenCount > 1 && (
          <SwiperDots
            dotsType={dotsType}
            dotsColor={dotsColor}
            dotsTheme={dotsTheme}
            dotsSize={dotsSize}
            items={children}
            currentIndex={currentIndex}
            onDotsClick={this.handleDotsClick}
          />
        )}
        <WindowResizeHandler onResize={this.handleResize} />
      </div>
    );
  }
}

export default Swiper;
