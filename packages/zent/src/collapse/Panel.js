import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AnimateHeight from 'utils/component/AnimateHeight';
import LazyMount from 'utils/component/LazyMount';

const NO_BOTTOM_BORDER = {
  borderBottomWidth: 0,
  borderBottomColor: 'rgba(255, 255, 255, 0)',
  transition:
    'border-bottom-width 200ms ease-out, border-bottom-color 200ms ease-out',
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
          className={`${prefix}-collapse-panel__title`}
          style={titleStyle}
          onClick={this.toggle}
        >
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
