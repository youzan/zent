/**
MIT License

Copyright (c) 2017 - today Stanko Tadić

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash-es/isFunction';
import isString from 'lodash-es/isString';
import * as raf from 'raf';

const ANIMATION_STATE_CLASSES = {
  animating: 'rah-animating',
  animatingUp: 'rah-animating--up',
  animatingDown: 'rah-animating--down',
  animatingToHeightZero: 'rah-animating--to-height-zero',
  animatingToHeightAuto: 'rah-animating--to-height-auto',
  animatingToHeightSpecific: 'rah-animating--to-height-specific',
  static: 'rah-static',
  staticHeightZero: 'rah-static--height-zero',
  staticHeightAuto: 'rah-static--height-auto',
  staticHeightSpecific: 'rah-static--height-specific',
};

export interface IAnimateHeightNoAppearProps {
  appear?: boolean;
  className: string;
  contentClassName: string;
  duration: number;
  easing: string;
  height: string | number;
  style: React.CSSProperties;
  applyInlineTransitions?: boolean;
  animationStateClasses: typeof ANIMATION_STATE_CLASSES;
}

export interface IAnimateHeightNoAppearState {
  animationStateClasses: string;
  height: string | number;
  overflow: string;
  shouldUseTransitions?: boolean;
}

function omitProps(props: IAnimateHeightNoAppearProps) {
  const {
    height,
    duration,
    easing,
    contentClassName,
    animationStateClasses,
    applyInlineTransitions,
    ...otherProps
  } = props;
  return otherProps;
}

export class AnimateHeightNoAppear extends PureComponent<
  IAnimateHeightNoAppearProps,
  IAnimateHeightNoAppearState
> {
  static propTypes = {
    animationStateClasses: PropTypes.object,
    applyInlineTransitions: PropTypes.bool,
    children: PropTypes.any.isRequired,
    contentClassName: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onAnimationEnd: PropTypes.func,
    onAnimationStart: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    duration: 250,
    easing: 'ease',
    style: {},
    animationStateClasses: ANIMATION_STATE_CLASSES,
    applyInlineTransitions: true,
  };

  animationStateClasses: typeof ANIMATION_STATE_CLASSES;
  contentElement: HTMLDivElement | null = null;
  timeoutID: number;
  animationClassesTimeoutID: number;

  constructor(props: IAnimateHeightNoAppearProps) {
    super(props);

    let height: string | number = 'auto';
    let overflow = 'visible';

    if (isNumber(props.height)) {
      height = props.height < 0 ? 0 : props.height;
      overflow = 'hidden';
    } else if (isPercentageHeight(props.height)) {
      height = props.height;
      overflow = 'hidden';
    }

    this.animationStateClasses = {
      ...ANIMATION_STATE_CLASSES,
      ...props.animationStateClasses,
    };

    const animationStateClasses = this.getStaticStateClasses(height);

    this.state = {
      animationStateClasses,
      height,
      overflow,
      shouldUseTransitions: false,
    };
  }

  render() {
    const {
      applyInlineTransitions,
      children,
      className,
      contentClassName,
      duration,
      easing,
      style,
    } = this.props;
    const {
      height,
      overflow,
      animationStateClasses,
      shouldUseTransitions,
    } = this.state;

    // Include transition passed through styles
    const userTransition = style.transition ? `${style.transition},` : '';
    const transitionString = `${userTransition} height ${duration}ms ${easing}`;

    const componentStyle = {
      ...style,
      height,
      overflow: overflow || style.overflow,
    };

    if (shouldUseTransitions && applyInlineTransitions) {
      componentStyle.WebkitTransition = transitionString;
      componentStyle.MozTransition = transitionString;
      componentStyle.OTransition = transitionString;
      (componentStyle as any).msTransition = transitionString;
      componentStyle.transition = transitionString;
    }

    const componentClasses = cx({
      [animationStateClasses]: true,
      [className]: className,
    });

    return (
      <div
        {...omitProps(this.props)}
        aria-hidden={height === 0}
        className={componentClasses}
        style={componentStyle}
      >
        <div className={contentClassName} ref={this.onContentElementRefChange}>
          {children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { height } = this.state;

    // Hide content if height is 0 (to prevent tabbing into it)
    // Check for contentElement is added cause this would fail in tests (react-test-renderer)
    // Read more here: https://github.com/Stanko/react-animate-height/issues/17
    if (this.contentElement && this.contentElement.style) {
      this.hideContent(height);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { height } = this.props;

    // Check if 'height' prop has changed
    if (this.contentElement && nextProps.height !== height) {
      // Remove display: none from the content div
      // if it was hidden to prevent tabbing into it
      this.showContent();

      // Cache content height
      this.contentElement.style.overflow = 'hidden';
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight = null;
      const timeoutState: {
        height: null | number | string;
        overflow: string;
        shouldUseTransitions?: boolean;
        animationStateClasses?: string;
      } = {
        height: null, // it will be always set to either 'auto' or specific number
        overflow: 'hidden',
      };
      const isCurrentHeightAuto = this.state.height === 'auto';

      if (isNumber(nextProps.height)) {
        // If new height is a number
        newHeight = nextProps.height < 0 ? 0 : nextProps.height;
        timeoutState.height = newHeight;
      } else if (isPercentageHeight(nextProps.height)) {
        newHeight = nextProps.height;
        timeoutState.height = newHeight;
      } else {
        // If not, animate to content height
        // and then reset to auto
        newHeight = contentHeight;
        timeoutState.height = 'auto';
        timeoutState.overflow = null;
      }

      if (isCurrentHeightAuto) {
        // This is the height to be animated to
        timeoutState.height = newHeight;

        // If previous height was 'auto'
        // set starting height explicitly to be able to use transition
        newHeight = contentHeight;
      }

      // Animation classes
      const animationStateClasses = cx({
        [this.animationStateClasses.animating]: true,
        [this.animationStateClasses.animatingUp]:
          height === 'auto' || nextProps.height < height,
        [this.animationStateClasses.animatingDown]:
          nextProps.height === 'auto' || nextProps.height > height,
        [this.animationStateClasses.animatingToHeightZero]:
          timeoutState.height === 0,
        [this.animationStateClasses.animatingToHeightAuto]:
          timeoutState.height === 'auto',
        [this.animationStateClasses.animatingToHeightSpecific]:
          timeoutState.height > 0,
      });

      // Animation classes to be put after animation is complete
      const timeoutAnimationStateClasses = this.getStaticStateClasses(
        timeoutState.height
      );

      // Set starting height and animating classes
      this.setState({
        animationStateClasses,
        height: newHeight,
        overflow: 'hidden',
        // When animating from 'auto' we first need to set fixed height
        // that change should be animated
        shouldUseTransitions: !isCurrentHeightAuto,
      });

      // Clear timeouts
      clearTimeout(this.timeoutID);
      clearTimeout(this.animationClassesTimeoutID);

      if (isCurrentHeightAuto) {
        // When animating from 'auto' we use a short timeout to start animation
        // after setting fixed height above
        timeoutState.shouldUseTransitions = true;

        startAnimationHelper(() => {
          this.setState(timeoutState as any);

          // ANIMATION STARTS, run a callback if it exists
          this.runCallback(nextProps.onAnimationStart);
        });

        // Set static classes and remove transitions when animation ends
        this.animationClassesTimeoutID = (setTimeout(() => {
          this.setState({
            animationStateClasses: timeoutAnimationStateClasses,
            shouldUseTransitions: false,
          });

          // ANIMATION ENDS
          // Hide content if height is 0 (to prevent tabbing into it)
          this.hideContent(timeoutState.height);
          // Run a callback if it exists
          this.runCallback(nextProps.onAnimationEnd);
        }, nextProps.duration) as unknown) as number;
      } else {
        // ANIMATION STARTS, run a callback if it exists
        this.runCallback(nextProps.onAnimationStart);

        // Set end height, classes and remove transitions when animation is complete
        this.timeoutID = (setTimeout(() => {
          timeoutState.animationStateClasses = timeoutAnimationStateClasses;
          timeoutState.shouldUseTransitions = false;

          this.setState(timeoutState as any);

          // ANIMATION ENDS
          // Hide content if height is 0 (to prevent tabbing into it)
          this.hideContent(newHeight);
          // Run a callback if it exists
          this.runCallback(nextProps.onAnimationEnd);
        }, nextProps.duration) as unknown) as number;
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
    clearTimeout(this.animationClassesTimeoutID);
    this.timeoutID = null;
    this.animationClassesTimeoutID = null;
    this.animationStateClasses = null;
  }

  runCallback(callback) {
    if (isFunction(callback)) {
      callback();
    }
  }

  showContent() {
    if (this.state.height === 0) {
      this.contentElement.style.display = '';
    }
  }

  hideContent(newHeight) {
    if (newHeight === 0) {
      this.contentElement.style.display = 'none';
    }
  }

  getStaticStateClasses(height) {
    return cx({
      [this.animationStateClasses.static]: true,
      [this.animationStateClasses.staticHeightZero]: height === 0,
      [this.animationStateClasses.staticHeightSpecific]: height > 0,
      [this.animationStateClasses.staticHeightAuto]: height === 'auto',
    });
  }

  onContentElementRefChange = el => {
    this.contentElement = el;
  };
}

export class AnimateHeightAppear extends PureComponent<
  IAnimateHeightNoAppearProps
> {
  state = {
    mounted: false,
  };

  render() {
    const { mounted } = this.state;
    const heightProp = mounted ? {} : { height: 0 };
    return <AnimateHeightNoAppear {...this.props} {...heightProp} />;
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({
      mounted: true,
    });
  }
}

export default class AnimateHeight extends PureComponent<
  IAnimateHeightNoAppearProps
> {
  render() {
    const { appear, ...props } = this.props;
    const Animate = appear ? AnimateHeightAppear : AnimateHeightNoAppear;

    return <Animate {...props} />;
  }
}

// Start animation helper using nested requestAnimationFrames
function startAnimationHelper(callback) {
  raf(() => {
    raf(callback);
  });
}

function isNumber(value) {
  return isFinite(parseFloat(value));
}

function isPercentageHeight(height) {
  return (
    isString(height) &&
    height.search('%') === height.length - 1 &&
    isNumber(height.substr(0, height.length - 1))
  );
}
