/**
 * SelectMenu
 *
 * @author hyczzhu
 */
import * as React from 'react';
import { Component } from 'react';

import MenuList, { IMenuListObjectItem, IMenuListItem } from './MenuList';

export const caselessMatchFilterOption = (searchText, item) => {
  if (!searchText) {
    return true;
  }

  // search searchContent first if searchContent is string or number
  if (
    typeof item.searchContent === 'string' ||
    typeof item.searchContent === 'number'
  ) {
    if (
      `${item.searchContent}`.toUpperCase().includes(searchText.toUpperCase())
    ) {
      return true;
    }
    // search content second if content is string or number
  } else if (
    typeof item.content === 'string' ||
    typeof item.content === 'number'
  ) {
    if (`${item.content}`.toUpperCase().includes(searchText.toUpperCase())) {
      return true;
    }
    // else search value
  } else if (`${item.value}`.toUpperCase().includes(searchText.toUpperCase())) {
    return true;
  }
  return false;
};

export interface ISelectMenuProps {
  value?: unknown;
  searchText?: string;
  items?: IMenuListItem[];
  onSelect?: (
    value: unknown,
    item: string | number | IMenuListObjectItem
  ) => void;
  filterOption?: (searchText: string, item: IMenuListItem) => void;
  nullOptionContent?: React.ReactNode;
  onRequestClose?: () => void;
  nullOption?: boolean;
}

export interface ISelectMenuState {
  items: IMenuListItem[];
}

export class SelectMenu extends Component<ISelectMenuProps, ISelectMenuState> {
  static defaultProps = {
    filterOption: caselessMatchFilterOption,
  };

  static caselessMatchFilterOption = caselessMatchFilterOption;
  refMenuItemList: MenuList | null = null;

  constructor(props) {
    super(props);

    this.state = {
      items: this.transformItems(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    // items transform
    const { items } = nextProps;
    if (this.props.items !== items) {
      this.setState({
        items: this.transformItems(nextProps),
      });
    }
  }

  /**
   * Wrap items with its idx.
   * @param items
   * @param parentIndexes
   * @private
   */
  wrapWithIdx = (items = [], parentIndexes = []) =>
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
    items: IMenuListItem[] = [],
    nullOptionContent?: React.ReactNode
  ) =>
    // TODO null option
    items;
  // [ {
  //   content: nullOptionContent || '请选择...',
  //   value: null,
  //   idx: -1,
  //   parentIndexes: [],
  // } ].concat(items)

  /**
   * Wrap items with value callback recursively.
   *
   * NOTE: this method should be called when needed
   *
   * @param items
   * @private
   */
  wrapWithValueCallback = (items = []) =>
    items.map(item => ({
      ...{
        active: value => value === this.props.value, // set default active calculator
      },
      ...item,
      ...(item.value !== undefined
        ? {
            onClick: e => {
              this.props.onSelect && this.props.onSelect(item.value, item);
              item.onClick && item.onClick(e);
            },
          }
        : {}),
    }));

  /**
   * Transform the passed-in props.items to make it easier to use internally.
   * @param props
   * @private
   */
  transformItems = (props: ISelectMenuProps) => {
    const { items = [], nullOption, nullOptionContent } = props;
    let wrappedItems = items;
    wrappedItems = this.wrapWithIdx(wrappedItems);
    if (nullOption) {
      wrappedItems = this.wrapWithNullOption(wrappedItems, nullOptionContent);
    }
    wrappedItems = this.wrapWithValueCallback(wrappedItems);
    return wrappedItems;
  };

  /** menu list delegates */

  moveFocusIndexDown = () => {
    if (this.refMenuItemList) {
      return this.refMenuItemList.moveFocusIndexDown();
    }
  };

  moveFocusIndexUp = () => {
    if (this.refMenuItemList) {
      return this.refMenuItemList.moveFocusIndexUp();
    }
  };

  selectCurrentFocusIndex = e => {
    if (this.refMenuItemList) {
      return this.refMenuItemList.selectCurrentFocusIndex(e);
    }
  };

  render() {
    const { filterOption, searchText } = this.props;
    const { items } = this.state;

    let filteredItems = items || [];
    if (typeof filterOption === 'function') {
      filteredItems = (items || []).filter(item => {
        return filterOption(searchText, item);
      });
    }

    // this.filteredItems = filteredItems;

    return (
      <MenuList
        ref={el => (this.refMenuItemList = el)}
        items={filteredItems}
        onRequestClose={this.props.onRequestClose}
      />
    );
  }
}
