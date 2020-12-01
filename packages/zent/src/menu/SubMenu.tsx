import cx from 'classnames';
import { Children } from 'react';
import Icon from '../icon';
import { AnimateHeight } from '../utils/component/AnimateHeight';
import CommonMenu from './CommonMenu';
import SubPopupMenu from './SubPopupMenu';
import { getExtraStyle } from './utils';

export interface ISubMenuProps {
  key?: string;
  title: React.ReactNode;
  disabled?: boolean;
  overlayClassName?: string;
  className?: string;
  isInline?: boolean;
  onClick?: (e: React.MouseEvent, index: string) => void;
  specKey?: string;
  onSubMenuClick?: (index?: string | number) => void;
  toggleExpand?: (index: string) => void;
  depth?: number;
  expandKeys?: string[];
  inlineIndent?: number;
  selectedKey?: string;
  handleSelect?: (specKey: string) => void;
}

export interface ISubMenuState {
  subMenuVisible: boolean;
}

export default class SubMenu extends CommonMenu<ISubMenuProps, ISubMenuState> {
  static defaultProps = {
    className: '',
  };

  leaveTimer: number;
  enterTimer: number;

  state = {
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
    this.props.onSubMenuClick(specKey);
    if (isInline) {
      toggleExpand(specKey);
    }

    e.stopPropagation();
  };

  onMouseEnter = () => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
    }
    this.enterTimer = (setTimeout(() => {
      this.setState({ subMenuVisible: true });
    }, 200) as unknown) as number;
  };

  onMouseLeave = () => {
    if (this.enterTimer) {
      clearTimeout(this.enterTimer);
    }
    this.leaveTimer = (setTimeout(() => {
      this.setState({ subMenuVisible: false });
    }, 200) as unknown) as number;
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
      onSubMenuClick: this.props.onSubMenuClick,
    });
  };

  renderContent() {
    const {
      children,
      specKey,
      overlayClassName,
      isInline,
      expandKeys,
    } = this.props;
    const isExpand = expandKeys && expandKeys.indexOf(specKey) !== -1;

    if (!isInline) {
      return (
        <SubPopupMenu
          visible={this.state.subMenuVisible}
          onClick={this.handleClick}
          specKey={specKey}
          overlayCx={overlayClassName}
          onSubMenuClick={this.props.onSubMenuClick}
        >
          {children}
        </SubPopupMenu>
      );
    }

    return (
      <AnimateHeight duration={200} height={isExpand ? 'auto' : 0}>
        <ul className="zent-menu__inner">
          {Children.map(children, this.renderInlineChild)}
        </ul>
      </AnimateHeight>
    );
  }

  render() {
    const {
      className,
      disabled,
      title,
      isInline,
      depth,
      inlineIndent,
      expandKeys,
      specKey,
    } = this.props;
    const isExpand = expandKeys && expandKeys.indexOf(specKey) !== -1;

    const eventHanders = this.getEventHanders(disabled, isInline);
    const styleObj = getExtraStyle({ isInline, depth, inlineIndent });

    const cls = cx(className, {
      'zent-menu-item': !isInline,
      'zent-menu-item-disabled': disabled,
      'zent-submenu': !isInline,
      'zent-menu__inline-submenu': isInline,
      'zent-menu__inline-item-disabled': disabled && isInline,
    });

    return (
      <li className={cls} {...eventHanders}>
        <div
          className={cx({
            'zent-submenu-title': !isInline,
            'zent-menu__inline-submenu-title': isInline,
            'zent-submenu-disabled': disabled,
          })}
          style={styleObj}
          onClick={this.titleClickHandler}
        >
          {title}
          {!disabled && (
            <Icon
              className={cx('zent-submenu-title-operate-icon', {
                'zent-menu__inline-submenu-icon--expand': isInline && isExpand,
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
