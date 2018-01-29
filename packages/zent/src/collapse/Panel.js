import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AnimateHeight from 'utils/component/AnimateHeight';
import LazyMount from 'utils/component/LazyMount';

const NO_BOTTOM_BORDER = {
  borderBottomWidth: 0,
  transition: 'border-bottom-width 50ms ease'
};
const NO_STYLE = {};

export default class Panel extends (PureComponent || Component) {
  static propTypes = {
    title: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    showArrow: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string,
    children: PropTypes.node,

    // Internal props
    active: PropTypes.bool,
    onChange: PropTypes.func,
    panelKey: PropTypes.string,
    isLast: PropTypes.bool,
    isFirst: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    showArrow: true,
    prefix: 'zent'
  };

  constructor(props) {
    super(props);

    this.state = {
      animating: false,
      animateAppear: !props.active
    };
  }

  render() {
    const {
      children,
      title,
      style,
      active,
      disabled,
      prefix,
      showArrow,
      className,
      isLast
    } = this.props;
    const { animating, animateAppear } = this.state;

    const titleStyle =
      !animating && isLast && !active ? NO_BOTTOM_BORDER : NO_STYLE;
    const contentBoxStyle = !animating && isLast ? NO_BOTTOM_BORDER : NO_STYLE;

    return (
      <div
        className={cx(`${prefix}-collapse-panel`, className, {
          [`${prefix}-collapse-panel--has-arrow`]: showArrow,
          [`${prefix}-collapse-panel--active`]: active,
          [`${prefix}-collapse-panel--inactive`]: !active,
          [`${prefix}-collapse-panel--disabled`]: disabled
        })}
        style={style}
        onClick={this.toggle}
      >
        <div className={`${prefix}-collapse-panel__title`} style={titleStyle}>
          {showArrow && <Arrow className={`${prefix}-collapse-panel__arrow`} />}
          {title}
        </div>
        <LazyMount mount={active}>
          <AnimateHeight
            appear={animateAppear}
            duration={150}
            height={active ? 'auto' : 0}
            className={`${prefix}-collapse-panel__content-box`}
            style={contentBoxStyle}
            onAnimationStart={this.onAnimationStart}
            onAnimationEnd={this.onAnimationEnd}
          >
            <div className={`${prefix}-collapse-panel__content`}>
              {children}
            </div>
          </AnimateHeight>
        </LazyMount>
      </div>
    );
  }

  toggle = () => {
    const { onChange, panelKey, active } = this.props;
    onChange(panelKey, !active);
  };

  onAnimationEnd = () => {
    this.setState({
      animating: false
    });
  };

  onAnimationStart = () => {
    this.setState({
      animating: true
    });
  };
}

function Arrow({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M478.312 644.16c24.38 26.901 64.507 26.538 88.507-.89l270.57-309.222c7.758-8.867 6.86-22.344-2.008-30.103-8.866-7.759-22.344-6.86-30.103 2.007L534.71 615.173c-7.202 8.231-17.541 8.325-24.782.335L229.14 305.674c-7.912-8.73-21.403-9.394-30.133-1.482s-9.394 21.403-1.482 30.134l280.786 309.833z" />
    </svg>
  );
}
