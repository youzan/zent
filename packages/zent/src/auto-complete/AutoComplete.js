/**
 * AutoComplete
 */

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import keycode from 'keycode';

import Input from 'input';
import Popover from 'popover';

/**
 * Wrap items with its idx.
 * @param items
 * @param parentIndexes
 * @private
 */
const wrapWithIdx = (items = [], parentIndexes = []) =>
  items.map((item, idx) => ({
    ...item,
    idx,
    parentIndexes,
    items: item.items
      ? wrapWithIdx(item.items, parentIndexes.concat([idx]))
      : undefined,
  }));

/**
 * Wrap items with null option on its head.
 * @param items
 * @param nullOptionContent
 * @private
 */
const wrapWithNullOption = (items = [] /* , nullOptionContent */) =>
  // TODO null option
  items;
// [ {
//   content: nullOptionContent || '请选择...',
//   value: null,
//   idx: -1,
//   parentIndexes: [],
// } ].concat(items)

const menuListPaddingTop = 0;

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

class MenuList extends Component {
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
    // const { items } = this.props
    const items = this.filteredItems;
    let targetIdx = idx % items.length;
    if (targetIdx < 0) {
      targetIdx += items.length;
    }
    return targetIdx;
  };

  getValidItemIdx = (idx, searchDown = true) => {
    // const { items } = this.props
    const items = this.filteredItems;
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
    const { items, filterOption, searchText } = this.props;

    let filteredItems = items || [];
    if (typeof filterOption === 'function') {
      filteredItems = (items || []).filter(item => {
        return filterOption(searchText, item);
      });
    }

    this.filteredItems = filteredItems;

    return (
      <div
        ref={el => (this.refMenuScrollContainer = el)}
        className="zent-popup-menu"
        tabIndex={0}
        onKeyDown={this.onKeyDown}
      >
        {filteredItems && filteredItems.length ? (
          <ul ref={el => (this.refMenuItemList = el)}>
            {this.renderItems(filteredItems)}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default class AutoComplete extends Component {
  static propTypes = {
    // auto complete props
    value: PropTypes.any,
    initialValue: PropTypes.any,
    placeholder: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
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
        }),
      ])
    ),
    valueField: PropTypes.string,
    contentField: PropTypes.string,
    textField: PropTypes.string,
    onChange: PropTypes.func, // function (value) => {} | callback when input value change or option is selected
    onSearch: PropTypes.func, // function (searchText) => {} | callback during input
    onSelect: PropTypes.func, // function (value, option) => {} | callback when select option
    filterOption: PropTypes.func, // function (searchText, { value, content }) => bool
    valueFromOptions: PropTypes.bool, // only change value to the ones in options

    // view
    className: PropTypes.string,
    popupClassName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    prefix: 'zent',
    filterOption: caselessMatchFilterOption,
    valueFromOptions: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: props.initialValue || props.value || null,
      searchText: '', // combo specific

      items: this.transformItems(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setControlled(nextProps, 'value');

    // items transform
    const { items, data } = nextProps;
    if (
      this.props.data !== data ||
      this.props.items !== items ||
      !!nextProps.children
    ) {
      this.setState({
        items: this.transformItems(nextProps),
      });
    }
  }

  onSearchTextChange = e => {
    const searchText = e.target.value;
    const value = this.props.valueFromOptions
      ? this.getSelectedValueFromSearchText(searchText)
      : searchText; //
    this.setState({
      searchText,
      value,
    });

    if (!this.state.open) {
      this.open();
    }

    this.props.onSearch && this.props.onSearch(searchText);
    this.props.onChange && this.props.onChange(value);
  };

  onSearchKeyDown = e => {
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

  onSearchBlur = () => {
    if (this.props.valueFromOptions) {
      setTimeout(() => {
        if (!this.blurHandlerPrevented) {
          // Try to match searchText to item value
          const { searchText, value } = this.state;
          let selectedValue = this.getSelectedValueFromSearchText(searchText);
          if (selectedValue) {
            if (selectedValue !== value) {
              this.props.onSelect && this.props.onSelect(selectedValue);
              this.props.onChange && this.props.onChange(selectedValue);
            }
          } else {
            this.props.onSelect && this.props.onSelect(null);
            this.props.onChange && this.props.onChange(null);
          }
        }
        this.blurHandlerPrevented = false;
      }, 100); // delay the blur event handler until the click handler is done
    }
  };

  // callback for menu item click
  onValueChange = (e, value, item) => {
    this.blurHandlerPrevented = true; // ugly way to prevent blur handler
    this.setState({
      value,
      selectedItem: item,
    });
    this.props.onSelect && this.props.onSelect(value);
    this.props.onChange && this.props.onChange(value);
  };

  // onSelect = value => {
  //   this.blurHandlerPrevented = true; // ugly way to prevent blur handler
  //   this.setState({
  //     value,
  //   });
  //
  //   this.props.onSelect && this.props.onSelect(value);
  //   this.props.onChange && this.props.onChange(value);
  //
  //   this.close();
  // };

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

  getPropsItems(props) {
    return props.items || props.data || [];
  }

  /**
   * Convert passed in data to item config list.
   *
   * @param props
   * @returns {*}
   * @private
   */
  getTransformedItemConfigs = (props = this.props) => {
    let transformedItems = this.getPropsItems(props);

    // handle items
    transformedItems = transformedItems.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          value: item,
          content: item,
        };
      } else if (typeof item === 'object') {
        const {
          valueField = 'value',
          textField = 'text',
          contentField = 'content',
        } = props;
        return {
          ...item,
          value: item[valueField],
          content: item[contentField] || item[textField] || item[valueField],
        };
        /* eslint-disable no-else-return */
      } else {
        throw new Error('AutoComplete unresolvable option!', item);
      }
      /* eslint-enable no-else-return */
    });

    // handle option children
    if (props.children) {
      transformedItems = transformedItems.concat(
        Children.map(props.children, item => {
          let value = item.props.value;
          value = typeof value === 'undefined' ? item : value;
          return {
            ...item.props,
            value,
            content: item.props.children,
          };
        })
      );
    }
    return transformedItems;
  };

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
        active: value => value === this.state.value, // set default active calculator
      },
      ...item,
      ...(item.value !== undefined
        ? {
            onClick: e => {
              this.onValueChange(e, item.value, item);
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
    const { nullOption, nullOptionContent } = props;
    let wrappedItems = this.getTransformedItemConfigs(props);
    wrappedItems = wrapWithIdx(wrappedItems);
    if (nullOption) {
      wrappedItems = wrapWithNullOption(wrappedItems, nullOptionContent);
    }
    wrappedItems = this.wrapWithValueCallback(wrappedItems);
    return wrappedItems;
  };

  /**
   * Get the display text of selected value, since the value and content might be different, and content might be node.
   *
   * Use item.searchContent prior to item.content prior to item.value
   *
   * @returns {*}
   * @private
   */
  getDisplayText = () => {
    const { value } = this.state;
    let displayValue = value || '';
    const item = this.getItemByValue(value);
    if (item) {
      if (typeof item.searchContent === 'string') {
        displayValue = item.searchContent;
      } else if (typeof item.content === 'string') {
        displayValue = item.content;
      }
    }
    return displayValue;
  };

  /** methods */

  open = () => {
    const newState = {
      open: true,
      searchText: this.getDisplayText() || '',
    };

    this.setState(newState);
  };

  close = () => {
    this.setState({
      open: false,
      // do not clear searchText so that it could be reused for other event handlers.
    });
  };

  togglePopoverOpen = () => {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  };

  /** menu list delegates */

  getSelectedValueFromSearchText = searchText => {
    let selectedValue = null;
    (this.state.items || []).some(item => {
      if (
        item.searchContent === searchText ||
        item.content === searchText ||
        item.value === searchText
      ) {
        selectedValue = item.value;
        return true;
      }
      return false;
    });
    return selectedValue;
  };

  /**
   * Iteration function to get the item whose value
   * equals to the passed-in value, recursively.
   *
   * @param items
   * @param value
   * @returns {*}
   * @private
   */
  iterateItems = (items, value) => {
    let result = null;
    (items || []).some(item => {
      if (item && item.value === value) {
        result = item;
        return true;
      }

      // if (item.items && item.items.length) {
      //   const innerResult = this.iterateItems(item.items, value)
      //   if (innerResult != null) {
      //     result = innerResult
      //     return true
      //   }
      // }

      return false;
    });
    return result;
  };

  /**
   * Get the item whose value equals to the passed-in value, recursively.
   *
   * @param value
   * @private
   */
  getItemByValue = value => this.iterateItems(this.state.items, value);

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
    const {
      width,
      placeholder,
      filterOption,
      className,
      popupClassName,
      disabled,
    } = this.props;
    const { open, items, searchText } = this.state;

    const prefixCls = 'zent-auto-complete';

    const displayValue = this.getDisplayText();

    let filteredItems = items || [];
    if (typeof filterOption === 'function') {
      filteredItems = (items || []).filter(item => {
        return filterOption(searchText, item);
      });
    }

    this.filteredItems = filteredItems;

    return (
      <Popover
        display="inline-block"
        position={Popover.Position.AutoBottomLeft}
        visible={open}
        className={cn(prefixCls, popupClassName)}
        wrapperClassName={cn(prefixCls, className, { disabled })}
        onVisibleChange={this.togglePopoverOpen}
        width={width}
      >
        <Popover.Trigger.Click>
          <Input
            className={cn('btn', {
              active: open,
            })}
            value={(open ? searchText : displayValue) || ''}
            placeholder={placeholder}
            onChange={this.onSearchTextChange}
            onKeyDown={this.onSearchKeyDown}
            onBlur={this.onSearchBlur}
            disabled={disabled}
          />
        </Popover.Trigger.Click>
        <Popover.Content>
          <MenuList
            ref={el => (this.refMenuItemList = el)}
            items={items}
            value={this.state.value}
            searchText={this.state.searchText}
            valueField={this.props.valueField}
            contentField={this.props.contentField}
            textField={this.props.textField}
            onSelect={this.onSelect}
            filterOption={this.props.filterOption}
            onRequestClose={() => this.close()}
          />
        </Popover.Content>
      </Popover>
    );
  }
}
