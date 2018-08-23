/**
 * AutoComplete
 */

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import keycode from 'keycode';

import Input from 'input';
import Popover from 'popover';
import SelectMenu from 'select-menu';

const { caselessMatchFilterOption } = SelectMenu;

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

      items: this.getTransformedItemConfigs(props),
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
        items: this.getTransformedItemConfigs(nextProps),
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
      case 'tab':
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

  onSelect = value => {
    this.blurHandlerPrevented = true; // ugly way to prevent blur handler
    this.setState({
      value,
    });

    this.props.onSelect && this.props.onSelect(value);
    this.props.onChange && this.props.onChange(value);

    this.close();
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
      className,
      popupClassName,
      disabled,
    } = this.props;
    const { open, items, searchText } = this.state;

    const prefixCls = 'zent-auto-complete';

    const displayValue = this.getDisplayText();

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
          <SelectMenu
            ref={el => (this.refMenuItemList = el)}
            items={items}
            value={this.state.value}
            searchText={this.state.searchText}
            onSelect={this.onSelect}
            filterOption={this.props.filterOption}
            onRequestClose={this.close}
          />
        </Popover.Content>
      </Popover>
    );
  }
}
