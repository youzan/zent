import React, { Component, PureComponent } from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SubPopupMenu from './SubPopupMenu';

export default class SubMenu extends (PureComponent || Component) {
  static propTypes = {
    title: PropTypes.node,
    prefix: PropTypes.string,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    className: '',
    prefix: 'zent'
  };

  state = {
    subMenuVisible: false
  };

  handleClick = (e, index) => {
    const { onClick } = this.props;
    this.setState({ subMenuVisible: false });
    onClick(e, index);
  };

  titleClickHandler = e => {
    e.stopPropagation();
  };

  onMouseEnter = () => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
    }
    this.enterTimer = setTimeout(() => {
      this.setState({ subMenuVisible: true });
    }, 200);
  };

  onMouseLeave = () => {
    if (this.enterTimer) {
      clearTimeout(this.enterTimer);
    }
    this.leaveTimer = setTimeout(() => {
      this.setState({ subMenuVisible: false });
    }, 200);
  };

  renderContent = () => {
    const { prefix, children, index, overlayClassName } = this.props;

    return (
      <SubPopupMenu
        prefix={prefix}
        visible={this.state.subMenuVisible}
        onClick={this.handleClick}
        index={index}
        overlayCx={overlayClassName}
      >
        {children}
      </SubPopupMenu>
    );
  };

  render() {
    const { prefix, className, disabled, title } = this.props;

    const mouseEvents = disabled
      ? {}
      : {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        };
    const cls = cx(`${prefix}-menu-item`, `${prefix}-submenu`, className, {
      [`${prefix}-menu-item-disabled`]: disabled
    });

    return (
      <li className={cls} {...mouseEvents}>
        <div
          className={cx(`${prefix}-submenu-title`, {
            [`${prefix}-submenu-disabled`]: disabled
          })}
          onClick={this.titleClickHandler}
        >
          {title}
          {!disabled && (
            <Icon
              className={`${prefix}-submenu-title-operate-icon`}
              type="right"
            />
          )}
        </div>
        {!disabled && this.renderContent()}
      </li>
    );
  }
}
