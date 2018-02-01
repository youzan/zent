import React from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';
import AnimateHeight from 'utils/component/AnimateHeight';
import CommonMenu from './CommonMenu';
import SubPopupMenu from './SubPopupMenu';
import { getExtraStyle } from './utils';

export default class SubMenu extends CommonMenu {
  static propTypes = {
    title: PropTypes.node,
    prefix: PropTypes.string,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isInline: PropTypes.bool,

    // inline模式独有props
    depth: PropTypes.number,
    expandKeys: PropTypes.array,
    inlineIndent: PropTypes.number,
    toggleExpand: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    prefix: 'zent',
  };

  state = {
    isExpand:
      this.props.isInline &&
      this.props.expandKeys.indexOf(this.props.specKey) !== -1,
    subMenuVisible: false,
  };

  getEventHanders = (disabled, isInline) => {
    let eventHanders = {};

    if (!disabled && !isInline) {
      eventHanders = {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
      };
    }

    return eventHanders;
  };

  handleClick = (e, index) => {
    const { onClick, isInline } = this.props;
    !isInline && this.setState({ subMenuVisible: false });
    onClick(e, index);
  };

  titleClickHandler = e => {
    const { isInline, specKey, toggleExpand } = this.props;
    if (isInline) {
      toggleExpand(specKey);
    }

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

  renderInlineChild = (component, index) => {
    const {
      depth,
      isInline,
      inlineIndent,
      selectedKey,
      expandKeys,
      handleSelect,
      toggleExpand,
      specKey,
    } = this.props;

    return this.renderCommonMenuItem(component, index, specKey, {
      depth: depth + 1,
      isInline,
      inlineIndent,
      selectedKey,
      expandKeys,
      handleSelect,
      toggleExpand,
    });
  };

  renderContent = () => {
    const {
      prefix,
      children,
      specKey,
      overlayClassName,
      isInline,
    } = this.props;

    const { isExpand } = this.state;

    if (!isInline) {
      return (
        <SubPopupMenu
          prefix={prefix}
          visible={this.state.subMenuVisible}
          onClick={this.handleClick}
          specKey={specKey}
          overlayCx={overlayClassName}
        >
          {children}
        </SubPopupMenu>
      );
    }

    return (
      <AnimateHeight duration={200} height={isExpand ? 'auto' : 0}>
        <ul className={`${prefix}-menu__inner`}>
          {React.Children.map(children, this.renderInlineChild)}
        </ul>
      </AnimateHeight>
    );
  };

  componentWillReceiveProps({ expandKeys: nextExpandKeys }) {
    const { specKey, expandKeys } = this.props;

    // 一次只能展开一个subMenu，因此可以只通过length判断是否改变
    if (expandKeys.length === nextExpandKeys.length) {
      return;
    }

    const isExpand = nextExpandKeys.indexOf(specKey) !== -1;

    this.setState({
      isExpand,
    });
  }

  render() {
    const {
      prefix,
      className,
      disabled,
      title,
      isInline,
      depth,
      inlineIndent,
    } = this.props;
    const { isExpand } = this.state;

    const eventHanders = this.getEventHanders(disabled, isInline);
    const styleObj = getExtraStyle({ isInline, depth, inlineIndent });

    const cls = cx(className, {
      [`${prefix}-menu-item`]: !isInline,
      [`${prefix}-menu-item-disabled`]: disabled,
      [`${prefix}-submenu`]: !isInline,
      [`${prefix}-menu__inline-submenu`]: isInline,
      [`${prefix}-menu__inline-item-disabled`]: disabled && isInline,
    });

    return (
      <li className={cls} {...eventHanders}>
        <div
          className={cx({
            [`${prefix}-submenu-title`]: !isInline,
            [`${prefix}-menu__inline-submenu-title`]: isInline,
            [`${prefix}-submenu-disabled`]: disabled,
          })}
          style={styleObj}
          onClick={this.titleClickHandler}
        >
          {title}
          {!disabled && (
            <Icon
              className={cx(`${prefix}-submenu-title-operate-icon`, {
                [`${prefix}-menu__inline-submenu-icon--expand`]:
                  isInline && isExpand,
              })}
              type="right"
            />
          )}
        </div>
        {!disabled && this.renderContent()}
      </li>
    );
  }
}
