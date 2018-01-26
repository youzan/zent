import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
    panelKey: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    showArrow: true,
    prefix: 'zent'
  };

  render() {
    const {
      children,
      title,
      style,
      active,
      disabled,
      prefix,
      showArrow,
      className
    } = this.props;

    return (
      <div
        className={cx(`${prefix}-collapse-panel`, className, {
          [`${prefix}-collapse-panel--has-arrow`]: showArrow,
          [`${prefix}-collapse-panel--active`]: active,
          [`${prefix}-collapse-panel--disabled`]: disabled
        })}
        style={style}
        onClick={this.toggle}
      >
        <div className={`${prefix}-collapse-panel__title`}>{title}</div>
        {active && (
          <div className={`${prefix}-collapse-panel__content`}>{children}</div>
        )}
      </div>
    );
  }

  toggle = () => {
    const { onChange, panelKey, active } = this.props;
    onChange(panelKey, !active);
  };
}
