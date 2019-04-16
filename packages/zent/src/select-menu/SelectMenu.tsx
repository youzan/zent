/**
 * SelectMenu
 *
 * @author hyczzhu
 */
import * as React from 'react';
import { Component } from 'react';
import isString from 'lodash-es/isString';
import isNumber from 'lodash-es/isNumber';

import memoize from '../utils/memorize-one';
import MenuList from './MenuList';
import { IMenuListItem } from './MenuListItem';

export interface ISelectMenuItem extends IMenuListItem {
  searchContent?: React.ReactNode;
  items?: ISelectMenuItem[];
}

export interface ISelectMenuNestedItem extends ISelectMenuItem {
  idx: number;
  parentIndexes: number[];
  items?: ISelectMenuNestedItem[];
}

export interface ISelectMenuProps {
  value?: unknown;
  searchText?: string;
  items: ISelectMenuItem[];
  onSelect?: (value: unknown, item: ISelectMenuItem) => void;
  filterOption?: (searchText: string, item: ISelectMenuItem) => void;
  onRequestClose?: () => void;
  nullOptionContent?: React.ReactNode;
  nullOption: boolean;
}

export interface ISelectMenuState {
  items: IMenuListItem[];
}

const isStringOrNumber = (x: any) => isString(x) || isNumber(x);

export function caselessMatchFilterOption(
  searchText: string,
  item: ISelectMenuItem
) {
  if (!searchText) {
    return true;
  }

  if (isStringOrNumber(item.searchContent)) {
    // search searchContent first if searchContent is string or number
    return `${item.searchContent}`
      .toUpperCase()
      .includes(searchText.toUpperCase());
  } else if (isStringOrNumber(item.content)) {
    // search content second if content is string or number
    return `${item.content}`.toUpperCase().includes(searchText.toUpperCase());
  } else if (isStringOrNumber(item.value)) {
    // otherwise search value
    return `${item.value}`.toUpperCase().includes(searchText.toUpperCase());
  }

  return false;
}

export class SelectMenu extends Component<ISelectMenuProps, ISelectMenuState> {
  static defaultProps = {
    filterOption: caselessMatchFilterOption,
    nullOption: false,
  };

  static caselessMatchFilterOption = caselessMatchFilterOption;

  private refMenuItemList = React.createRef<MenuList>();

  /**
   * Wrap items with its idx.
   * @param items
   * @param parentIndexes
   * @private
   */
  wrapWithIdx = (
    items: ISelectMenuItem[] = [],
    parentIndexes: number[] = []
  ): ISelectMenuNestedItem[] =>
    items.map((item, idx) => ({
      ...item,
      idx,
      parentIndexes,
      items: item.items
        ? this.wrapWithIdx(item.items, parentIndexes.concat([idx]))
        : undefined,
    }));

  /**
   * Wrap items with null option on its head.
   * @param items
   * @param nullOptionContent
   * @private
   */
  wrapWithNullOption = (
    items: ISelectMenuNestedItem[] = [],
    nullOptionContent?: React.ReactNode
  ): ISelectMenuNestedItem[] =>
    [
      {
        content: nullOptionContent,
        value: null,
        idx: -1,
        parentIndexes: [],
      } as ISelectMenuNestedItem,
    ].concat(items);

  /**
   * Wrap items with value callback recursively.
   *
   * NOTE: this method should be called when needed
   *
   * @param items
   * @private
   */
  wrapWithValueCallback = (items: ISelectMenuNestedItem[] = []) =>
    items.map(item => ({
      active: value => value === this.props.value, // set default active calculator
      ...item,
      ...(item.value !== undefined
        ? {
            onClick: e => {
              this.props.onSelect && this.props.onSelect(item.value, item);
              item.onClick && item.onClick(e);
            },
          }
        : {}),
      items: this.wrapWithValueCallback(item.items),
    }));

  /**
   * Transform the passed-in props.items to make it easier to use internally.
   * @private
   */
  transformItems = memoize(
    (
      items: ISelectMenuItem[],
      nullOption: boolean,
      nullOptionContent?: React.ReactNode
    ) => {
      let wrappedItems = this.wrapWithIdx(items);
      if (nullOption) {
        wrappedItems = this.wrapWithNullOption(wrappedItems, nullOptionContent);
      }
      wrappedItems = this.wrapWithValueCallback(wrappedItems);
      return wrappedItems;
    }
  );

  /** menu list delegates */

  moveFocusIndexDown = () => {
    const menuList = this.refMenuItemList.current;
    if (menuList) {
      return menuList.moveFocusIndexDown();
    }
  };

  moveFocusIndexUp = () => {
    const menuList = this.refMenuItemList.current;

    if (menuList) {
      return menuList.moveFocusIndexUp();
    }
  };

  selectCurrentFocusIndex = e => {
    const menuList = this.refMenuItemList.current;

    if (menuList) {
      return menuList.selectCurrentFocusIndex(e);
    }
  };

  render() {
    const {
      filterOption,
      searchText,
      items: rawItems,
      nullOption,
      nullOptionContent,
    } = this.props;
    const items = this.transformItems(rawItems, nullOption, nullOptionContent);

    let filteredItems = items || [];
    if (typeof filterOption === 'function') {
      filteredItems = (items || []).filter(item => {
        return filterOption(searchText, item);
      });
    }

    return (
      <MenuList
        ref={this.refMenuItemList}
        items={filteredItems}
        onRequestClose={this.props.onRequestClose}
      />
    );
  }
}
