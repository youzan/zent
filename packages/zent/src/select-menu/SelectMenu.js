/**
 * SelectMenu
 *
 * @author hyczzhu
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuList from './MenuList';

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

export class SelectMenu extends Component {
  static propTypes = {
    // auto complete props
    value: PropTypes.any,
    searchText: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        content: PropTypes.node,
        isGroup: PropTypes.bool,
        isDivider: PropTypes.bool,

        // the props below are preserved for future refacter
        searchContent: PropTypes.string,
        icon: PropTypes.string,
        disabled: PropTypes.bool,
        active: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      })
    ),
    onSelect: PropTypes.func, // function (value, option) => {} | callback when select option
    filterOption: PropTypes.func, // function (searchText, { value, content }) => bool
  };

  static defaultProps = {
    filterOption: caselessMatchFilterOption,
  };

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
  wrapWithNullOption = (items = [] /* , nullOptionContent */) =>
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
  transformItems = props => {
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

    this.filteredItems = filteredItems;

    return (
      <MenuList
        ref={el => (this.refMenuItemList = el)}
        items={filteredItems}
        onRequestClose={this.props.onRequestClose}
      />
    );
  }
}
