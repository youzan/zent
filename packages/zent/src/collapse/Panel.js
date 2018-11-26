import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AnimateHeight from 'utils/component/AnimateHeight';
import LazyMount from 'utils/component/LazyMount';
import { EASE_IN_OUT } from 'utils/timingFunctions';

const NO_BOTTOM_BORDER = {
  borderBottomWidth: 0,
  borderBottomColor: 'rgba(255, 255, 255, 0)',
  transition: `border-bottom-width 160ms ${EASE_IN_OUT}, border-bottom-color 160ms ${EASE_IN_OUT}`,
};
const NO_STYLE = {};

export default class Panel extends PureComponent {
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
    panelTitleBackground: PropTypes.string,
    isLast: PropTypes.bool,
    bordered: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    showArrow: true,
    prefix: 'zent',
  };

  constructor(props) {
    super(props);

    this.state = {
      animateAppear: !props.active,
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
      isLast,
      bordered,
      panelTitleBackground,
    } = this.props;
    const { animateAppear } = this.state;
    const isBorderedLast = bordered && isLast;

    // border transitions are done in JS to keep height animtion in sync
    const titleStyle = isBorderedLast && !active ? NO_BOTTOM_BORDER : NO_STYLE;
    const contentBoxStyle =
      isBorderedLast || !active ? NO_BOTTOM_BORDER : NO_STYLE;

    return (
      <div
        className={cx(`${prefix}-collapse-panel`, className, {
          [`${prefix}-collapse-panel--has-arrow`]: showArrow,
          [`${prefix}-collapse-panel--active`]: active,
          [`${prefix}-collapse-panel--inactive`]: !active,
          [`${prefix}-collapse-panel--disabled`]: disabled,
        })}
        style={style}
      >
        <div
          className={cx(`${prefix}-collapse-panel__title`, {
            [`${prefix}-collapse-panel__title--bg-none`]:
              panelTitleBackground === 'none',
            [`${prefix}-collapse-panel__title--bg-default`]:
              panelTitleBackground === 'default',
          })}
          style={titleStyle}
          onClick={this.toggle}
        >
          {showArrow && <Arrow className={`${prefix}-collapse-panel__arrow`} />}
          {title}
        </div>
        <LazyMount mount={active}>
          <AnimateHeight
            appear={animateAppear}
            duration={160}
            height={active ? 'auto' : 0}
            easing={EASE_IN_OUT}
            className={`${prefix}-collapse-panel__content-box`}
            style={contentBoxStyle}
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
}

function Arrow({ className }) {
  return (
    <svg
      width="16"
      height="10"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6.77L14.37.403l1.413 1.414-6.369 6.37h.002L8 9.601.223 1.822 1.637.408 8 6.771z"
        fillRule="evenodd"
      />
    </svg>
  );
}
