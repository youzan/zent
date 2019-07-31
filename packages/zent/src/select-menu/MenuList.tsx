/**
 * MenuList
 *
 * @author hyczzhu
 */
import * as React from 'react';
import { Component } from 'react';
import isNumber from 'lodash-es/isNumber';
import { IMenuListItem, MenuListItem, handleItemClick } from './MenuListItem';

const menuListPaddingTop = 0;

export interface IMenuListProps {
  items?: IMenuListItem[];
  onRequestClose?: () => void;
}

export interface IMenuListState {
  focusIdx: number | null;
  autoScrollFocusIdx?: number;
  open?: boolean;
}

// css file: _popup-menu.scss
export default class MenuList extends Component<
  IMenuListProps,
  IMenuListState
> {
  private refMenuScrollContainer = React.createRef<HTMLDivElement>();
  private refMenuItemList = React.createRef<HTMLUListElement>();

  constructor(props) {
    super(props);

    this.state = {
      focusIdx: null,
    };
  }

  componentDidUpdate() {
    this.autoScroll();
  }

  autoScroll() {
    const itemsLength = (this.props.items || []).length;
    const { focusIdx, autoScrollFocusIdx } = this.state;
    const menuListNode = this.refMenuItemList.current;
    const scrollContainer = this.refMenuScrollContainer.current;

    // Auto scroll logic
    if (
      itemsLength &&
      focusIdx !== null &&
      focusIdx === autoScrollFocusIdx &&
      menuListNode &&
      scrollContainer
    ) {
      const focusedItemNode = menuListNode.childNodes[
        this.state.focusIdx
      ] as HTMLElement;

      if (!focusedItemNode) {
        return;
      }

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
    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.state.open) {
          this.moveFocusIndexDown();
        }
        break;
      case 'ArrowUp': {
        e.preventDefault();
        if (this.state.open) {
          this.moveFocusIndexUp();
        }
        break;
      }
      case 'Enter': {
        if (this.state.open) {
          this.selectCurrentFocusIndex(e);
        }
        break;
      }
      default:
    }
  };

  setFocusIndex = (focusIdx: number | null, autoScroll = true) => {
    this.setState({
      focusIdx: focusIdx == null ? null : this.getItemIdxInItems(focusIdx),
      autoScrollFocusIdx: autoScroll ? focusIdx : null,
    });
  };

  getItemIdxInItems = (idx: number) => {
    const { items } = this.props;
    let targetIdx = idx % items.length;
    if (targetIdx < 0) {
      targetIdx += items.length;
    }
    return targetIdx;
  };

  getValidItemIdx = (idx: number, searchDown = true) => {
    const { items } = this.props;
    if (
      !(items && items.length) ||
      items.every((item: any) => item.isDivider && item.isGroup) ||
      !isNumber(idx) ||
      Number.isNaN(idx)
    ) {
      return null;
    }

    let targetIdx = this.getItemIdxInItems(idx);
    let item: any = items[targetIdx];

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
    const ins = this;
    // TODO find the topped menu when there are sub menus
    // while (_ins && _ins.state.lastOpenIndex != null && _ins.refs[`sub_${_ins.state.lastOpenIndex}`]) {
    //   _ins = _ins.refs[`sub_${_ins.state.lastOpenIndex}`]
    // }
    return ins;
  };

  moveFocusIndex = (offset: number) => {
    const { focusIdx } = this.state;

    if (focusIdx !== null) {
      this.setFocusIndex(this.getValidItemIdx(focusIdx + offset, offset > 0));
    } else {
      this.setFocusIndex(this.getValidItemIdx(0));
    }
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
      const { items, onRequestClose } = this.props;
      const item = items[focusIdx];

      handleItemClick({ item, event: e, onRequestClose });
    }
  };

  close = () => {
    this.setState({
      open: false,
    });
  };

  renderItems = (items: IMenuListItem[] = []) => {
    const { onRequestClose } = this.props;
    const { focusIdx } = this.state;

    return items.map((item, index) => {
      return (
        <MenuListItem
          key={item.value === undefined ? index : item.value}
          index={index}
          item={item}
          onRequestClose={onRequestClose}
          focusTo={this.setFocusIndex}
          hover={focusIdx === index}
        />
      );
    });
  };

  render() {
    const { items } = this.props;

    return (
      <div
        ref={this.refMenuScrollContainer}
        className="zent-popup-menu"
        tabIndex={0}
        onKeyDown={this.onKeyDown}
      >
        {items && items.length ? (
          <ul ref={this.refMenuItemList}>{this.renderItems(items)}</ul>
        ) : null}
      </div>
    );
  }
}
