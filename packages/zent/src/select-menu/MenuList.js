/**
 * MenuList
 *
 * @author hyczzhu
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import keycode from 'keycode';

const menuListPaddingTop = 0;

// css file: _popup-menu.pcss
export default class MenuList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          value: PropTypes.any,
          content: PropTypes.node,
          isGroup: PropTypes.bool,
          isDivider: PropTypes.bool,
          onClick: PropTypes.func,

          // the props below are preserved for future refactor
          searchContent: PropTypes.string,
          icon: PropTypes.string,
          disabled: PropTypes.bool,
          active: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        }),
      ])
    ),
    onRequestClose: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      focusIdx: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setControlled(nextProps, 'value');
  }

  componentDidUpdate() {
    const itemsLength = (this.props.items || []).length;
    // Auto scroll logic
    if (
      itemsLength &&
      this.state.focusIdx !== null &&
      this.state.focusIdx === this.state.autoScrollFocusIdx &&
      this.refMenuItemList &&
      this.refMenuScrollContainer
    ) {
      const focusedItemNode = this.refMenuItemList.childNodes[
        this.state.focusIdx
      ];
      const scrollContainer = this.refMenuScrollContainer;

      const itemOffsetTop = focusedItemNode.offsetTop;
      const itemOffsetHeight = focusedItemNode.offsetHeight;
      const containerOffsetHeight = scrollContainer.offsetHeight;
      const containerScrollTop = scrollContainer.scrollTop;

      // if scroll down needed
      if (
        containerOffsetHeight + containerScrollTop <
        itemOffsetTop + itemOffsetHeight
      ) {
        scrollContainer.scrollTop =
          itemOffsetTop +
          itemOffsetHeight -
          containerOffsetHeight -
          menuListPaddingTop;
        // if scroll up needed
      } else if (containerScrollTop > itemOffsetTop) {
        scrollContainer.scrollTop = itemOffsetTop - menuListPaddingTop;
      }
    }
  }

  onKeyDown = e => {
    switch (keycode(e)) {
      case 'esc':
        this.close();
        break;
      case 'down':
        e.preventDefault();
        if (this.state.open) {
          this.moveFocusIndexDown();
        }
        break;
      case 'up': {
        e.preventDefault();
        if (this.state.open) {
          this.moveFocusIndexUp();
        }
        break;
      }
      case 'enter': {
        if (this.state.open) {
          this.selectCurrentFocusIndex(e);
        }
        break;
      }
      default:
    }
  };

  /** Helpers */

  /**
   * Set the controlled props if needed.
   * @param nextProps
   * @param k
   */
  setControlled = (nextProps, k) => {
    if (nextProps[k] !== undefined) {
      this.setState({
        [k]: nextProps[k],
      });
    }
  };

  /** focus idx */

  setFocusIndex = (focusIdx, autoScroll = true) => {
    this.setState({
      focusIdx: focusIdx == null ? null : this.getItemIdxInItems(focusIdx),
      autoScrollFocusIdx: autoScroll ? focusIdx : null,
    });
  };

  getItemIdxInItems = idx => {
    const { items } = this.props;
    let targetIdx = idx % items.length;
    if (targetIdx < 0) {
      targetIdx += items.length;
    }
    return targetIdx;
  };

  getValidItemIdx = (idx, searchDown = true) => {
    const { items } = this.props;
    if (
      !(items && items.length) ||
      !items.some(item => !(item.isDivider && item.isGroup)) ||
      isNaN(idx) ||
      idx == null
    ) {
      return null;
    }

    let targetIdx = this.getItemIdxInItems(idx);
    let item = items[targetIdx];

    // try to ignore: divider/group/disabled
    if (!item || (item.isDivider || item.isGroup) || item.disabled) {
      const initialIdx = targetIdx;

      targetIdx = this.getItemIdxInItems(
        searchDown ? targetIdx + 1 : targetIdx - 1
      );
      item = items[targetIdx];

      while (
        !item ||
        ((item.isDivider || item.isGroup || item.disabled) &&
          targetIdx !== initialIdx)
      ) {
        targetIdx = this.getItemIdxInItems(
          searchDown ? targetIdx + 1 : targetIdx - 1
        );
        item = items[targetIdx];
      }
    }

    return targetIdx;
  };

  getTopMenu = () => {
    let ins = this;
    // TODO find the topped menu when there are sub menus
    // while (_ins && _ins.state.lastOpenIndex != null && _ins.refs[`sub_${_ins.state.lastOpenIndex}`]) {
    //   _ins = _ins.refs[`sub_${_ins.state.lastOpenIndex}`]
    // }
    return ins;
  };

  moveFocusIndex = offset => {
    const { focusIdx } = this.state;
    // if (this.props.items && this.props.items.length) {
    if (focusIdx !== null) {
      this.setFocusIndex(this.getValidItemIdx(focusIdx + offset, offset > 0));
    } else {
      this.setFocusIndex(this.getValidItemIdx(0));
    }
    // }
  };

  moveFocusIndexDown = () => {
    this.getTopMenu().moveFocusIndex(1);
  };

  moveFocusIndexUp = () => {
    this.getTopMenu().moveFocusIndex(-1);
  };

  selectCurrentFocusIndex = e => {
    const ins = this.getTopMenu();
    const { focusIdx } = ins.state;
    if (focusIdx !== null) {
      const callbackKey = `${focusIdx}_callback`;
      ins[callbackKey] && ins[callbackKey](e);
    }
  };

  renderItems = (items = []) => {
    return items.map((item, index) => {
      if (!item) {
        return null;
      }

      if (item.isDivider) {
        return <div key={index} className={cn('zent-divider-line')} />;
      }

      if (item.isGroup) {
        return (
          <li key={index} className={cn('zent-menu-item-group-header')}>
            <span>{item.content}</span>
          </li>
        );
      }

      const callbackKey = `${index}_callback`;

      // auto closes
      const onClick = e => {
        if (item.disabled) {
          return;
        }

        if (item.onClick) {
          // Item has a touch tap handler, Close it when it's done
          item.onClick(e);
          // closeHandler() // Close sub menus
          if (!e.defaultPrevented) {
            e.preventDefault();
            e.stopPropagation();
            // this._onRequestCloseAll('menu item finish', e) // Try to close all
            this.props.onRequestClose && this.props.onRequestClose();
          }
        }
      };
      const onMouseEnter = () => {
        this.setFocusIndex(index, false);
      };
      const onMouseLeave = () => {
        this.setFocusIndex(null);
      };

      const title = typeof item.content === 'string' ? item.content : undefined;
      const active =
        typeof item.active === 'function'
          ? item.active(item.value)
          : !!item.active;
      const hoverable = item.hoverable === undefined ? true : !!item.hoverable;

      this[callbackKey] = onClick;

      return (
        <li
          key={item.value || index} // eslint-disable-line
          className={cn(
            'zent-popup-menu-item',
            {
              hoverable,
              disabled: item.disabled,
              active,
              hover: this.state.focusIdx === index,
            },
            item.className
          )}
          onClick={this[callbackKey]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {item.icon ? <i className={cn('zent-popup-menu-item-icon')} /> : null}
          <span title={title}>{item.content}</span>
        </li>
      );
    });
  };

  render() {
    const { items } = this.props;

    return (
      <div
        ref={el => (this.refMenuScrollContainer = el)}
        className="zent-popup-menu"
        tabIndex={0}
        onKeyDown={this.onKeyDown}
      >
        {items && items.length ? (
          <ul ref={el => (this.refMenuItemList = el)}>
            {this.renderItems(items)}
          </ul>
        ) : null}
      </div>
    );
  }
}
