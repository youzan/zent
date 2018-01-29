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
            duration={200}
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
    const { onChange, panelKey, active, disabled } = this.props;

    if (!disabled) {
      onChange(panelKey, !active);
    }
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
      width="10"
      height="5"
      viewBox="0 0 10 5"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.01.268a.26.26 0 0 0 .077.189l4.329 4.325a.754.754 0 0 0 1.043.013L9.912.461A.26.26 0 0 0 9.91.085a.283.283 0 0 0-.39.001L5.07 4.418a.186.186 0 0 1-.129.049.186.186 0 0 1-.129-.054L.483.087a.283.283 0 0 0-.39-.006.26.26 0 0 0-.083.187z"
        fillRule="nonzero"
      />
    </svg>
  );
}
