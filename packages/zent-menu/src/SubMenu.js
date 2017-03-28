import React, { Component, PropTypes } from 'react';
import Icon from 'zent-icon';
import cx from 'zent-utils/classnames';
import SubPopupMenu from './SubPopupMenu';

export default class SubMenu extends Component {
  static propTypes = {
    title: PropTypes.string,
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
  }

  handleClick = (e, index) => {
    const { onClick } = this.props;
    this.setState({ subMenuVisible: false });
    onClick(e, index);
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
    const {
      prefix,
      children,
      index,
      overlayClassName
    } = this.props;

    return (
      <SubPopupMenu prefix={prefix} visible={this.state.subMenuVisible} onClick={this.handleClick} index={index} overlayCx={overlayClassName}>
        {children}
      </SubPopupMenu>
    );
  };

  render() {
    const {
      prefix,
      className,
      disabled,
      title
    } = this.props;

    const mouseEvents = disabled ? {} : {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };
    const cls = cx(
      `${prefix}-menu-item`,
      `${prefix}-submenu`,
      className,
      {
        [`${prefix}-menu-item-disabled`]: disabled
      }
    );

    return (
      <li
        className={cls} {...mouseEvents}
      >
        <div className={cx(`${prefix}-submenu-title`, { [`${prefix}-submenu-disabled`]: disabled })}>
          {title}
          {!disabled && <Icon type="right" />}
        </div>
        {!disabled && this.renderContent()}
      </li>
    );
  }
}
