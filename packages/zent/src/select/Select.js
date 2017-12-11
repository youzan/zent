/**
 * Select
 */

import React, { Component, PureComponent, Children } from 'react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';

import Popover from 'popover';
import Trigger from './trigger';
import Popup from './Popup';
import SimpleTrigger from './trigger/SimpleTrigger';
import SelectTrigger from './trigger/SelectTrigger';
import InputTrigger from './trigger/InputTrigger';
import TagsTrigger from './trigger/TagsTrigger';

class PopoverClickTrigger extends Popover.Trigger.Click {
  getTriggerProps(child) {
    return {
      onClick: evt => {
        evt.preventDefault();
        if (this.props.contentVisible) {
          this.props.close();
        } else if (!child.props.disabled) {
          this.props.open();
          this.triggerEvent(child, 'onClick', evt);
        }
      }
    };
  }
}

class Select extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    if (props.simple) {
      this.trigger = SimpleTrigger;
    } else if (props.search) {
      this.trigger = InputTrigger;
    } else if (props.tags) {
      this.trigger = TagsTrigger;
    } else {
      this.trigger = props.trigger;
    }

    this.state = Object.assign(
      {
        selectedItems: [],
        selectedItem: {
          value: '',
          text: ''
        }
      },
      props
    );
  }

  componentWillMount() {
    /**
     * data支持字符串数组和对象数组两种模式
     *
     * 字符串数组默认value为下标
     * 对象数组需提供value和text, 或者通过 optionValue(prop) optionText(prop) 自定义
     *
     */
    this.uniformedData = this.uniformData(this.props);
    this.traverseData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.uniformedData = this.uniformData(nextProps);
    this.traverseData(nextProps);
  }

  /**
   * 将使用 child-element 传入的 Options 格式化为对象数组(未严格约束)
   * data-prop 的优先级高于 child-element
   *
   * @param {object} props - props of Select
   * @returns {object[]} uniformedData - 格式化后对象数组
   * @returns {string} uniformedData[].cid - internal id of option
   * @returns {string} uniformedData[].text - text of an option
   * @returns {any} uniformedData[].value - token of an option
   * @memberof Select
   */
  uniformData(props) {
    const {
      data,
      children,
      optionValue,
      optionText,
      resetOption,
      resetText
    } = props;

    // 在需要时插入重置选项。
    let uniformedData =
      resetOption && (data || children)
        ? [{ cid: '-1', value: null, text: resetText }] // insert reset option
        : [];

    // data-prop 高优先级, 格式化 optionValue、optionText
    if (data) {
      uniformedData = uniformedData.concat(
        data.map((option, index) => {
          // 处理字符串数组
          if (typeof option !== 'object') {
            return { text: option, value: option, cid: `${index}` };
          }

          // hacky the quirk when optionText = 'value' and avoid modify props
          const optCopy = cloneDeep(option);

          optCopy.cid = `${index}`;
          if (optionValue) {
            optCopy.value = option[optionValue];
          }
          if (optionText) {
            optCopy.text = option[optionText];
          }
          return optCopy;
        })
      );
      return uniformedData;
    }

    // 格式化 child-element
    if (children) {
      uniformedData = uniformedData.concat(
        Children.map(children, (item, index) => {
          let value = item.props.value;
          value = typeof value === 'undefined' ? item : value;
          return Object.assign({}, item.props, {
            value,
            cid: `${index}`,
            text: item.props.children
          });
        })
      );
    }

    return uniformedData;
  }

  /**
   * accept uniformed data to traverse then inject selected option or options to next state
   *
   * @param {object[]} data - uniformed data
   * @param {object} props - props of Select
   * @memberof Select
   */
  traverseData(props, data = this.uniformedData) {
    // option 数组置空后重置组件状态
    if (!data || !data.length) {
      return this.setState({
        selectedItem: {},
        selectedItems: []
      });
    }

    const { selectedItem, selectedItems } = this.state;
    const { value, index, initialIndex, initialValue } = props;

    // initialize selected internal state
    const selected = { sItem: selectedItem, sItems: [] };

    data.forEach((item, i) => {
      // 处理 quirk 默认选项(initialIndex, initialValue) , 主要用于在非受控组件模式下指定默认值
      if (
        selectedItems.length === 0 &&
        !selectedItem.cid &&
        (initialValue !== null || initialIndex !== null)
      ) {
        const coord = { value: initialValue, index: initialIndex };
        this.locateSelected(selected, coord, item, i);
      }

      // 处理受控逻辑(index, value)
      if (value !== null || index !== null) {
        this.locateSelected(selected, { value, index }, item, i);
      }
    });

    this.setState({
      selectedItem: selected.sItem,
      selectedItems: selected.sItems
    });
  }

  /**
   * judge if param 'item' selected
   *
   * @param {object} state - next state marked selected item or items
   * @param {object} coord - coordinate for seleted judging
   * @param {object} item - option object after uniformed
   * @param {number} i - index of option in options list
   * @memberof Select
   * */
  locateSelected(state, coord, item, i) {
    const { value, index } = coord;

    if (isArray(value) && value.indexOf(item.value) > -1) {
      // rerender 去重
      if (!state.sItems.find(selected => selected.value === item.value)) {
        state.sItems.push(item);
      }
    } else if (isArray(value) && value.length === 0) {
      // 多选重置
      state.sItem = {};
      state.sItems = [];
    } else if (typeof value === 'object' && isEqual(value, item.value)) {
      state.sItem = item;
    } else if (
      (typeof value !== 'undefined' &&
        typeof value !== 'object' &&
        `${item.value}` === `${value}`) ||
      (index !== 'undefined' && `${i}` === `${index}`)
    ) {
      state.sItem = item;
    } else if (!value && !index && value !== 0) {
      // github#406 修复option-value为假值数字0时的异常重置。
      // 单选重置
      state.sItem = {};
      state.sItems = [];
    }
  }

  // 接收trigger改变后的数据，将数据传给popup
  triggerChangeHandler = data => {
    this.setState(data);
  };

  triggerDeleteHandler = data => {
    let { selectedItems } = this.state;
    selectedItems = selectedItems.filter(item => item.cid !== data.cid);
    this.setState(
      {
        selectedItems
      },
      () => {
        this.props.onDelete(data);
      }
    );
  };

  // 将被选中的option的数据传给trigger
  optionChangedHandler = (ev, selectedItem) => {
    const result = {};
    ev = ev || {
      preventDefault: noop,
      stopPropagation: noop
    };
    const {
      onEmptySelected,
      optionValue,
      optionText,
      tags,
      onChange
    } = this.props;
    const { selectedItems } = this.state;
    if (!selectedItem) {
      onEmptySelected(ev);
      return;
    }
    const args = omit(selectedItem, ['cid']);
    result[optionValue] = selectedItem.value;
    result[optionText] = selectedItem.text;
    const data = { ...args, ...result };
    if (tags) {
      if (!selectedItems.some(item => item.cid === selectedItem.cid)) {
        selectedItems.push(selectedItem);
      }
    } else if (selectedItem.value === null) {
      // customize reset option
      selectedItem = {};
    }
    this.setState(
      {
        keyword: null,
        selectedItems,
        selectedItem
      },
      () => {
        onChange(
          {
            target: {
              ...this.props,
              type: tags ? 'select-multiple' : 'select-one',
              value: selectedItem.value
            },

            preventDefault() {
              ev.preventDefault();
            },

            stopPropagation() {
              ev.stopPropagation();
            }
          },
          data
        );
      }
    );
  };

  handlePopoverVisibleChange = visible => {
    if (visible) {
      this.props.onOpen();
    }
    this.setState({ open: visible });
  };

  render() {
    const {
      placeholder,
      maxToShow,
      className,
      popupClassName,
      disabled,
      emptyText,
      filter = this.props.onFilter,
      onAsyncFilter,
      searchPlaceholder,
      autoWidth,
      width
    } = this.props;

    const {
      open,
      selectedItems,
      selectedItem = {},
      extraFilter,
      keyword = null
    } = this.state;

    const { cid = '' } = selectedItem;

    const disabledCls = disabled ? 'disabled' : '';
    const prefixCls = `${this.props.prefix}-select`;
    return (
      <Popover
        display="inline-block"
        position={Popover.Position.AutoBottomLeft}
        visible={open}
        className={`${prefixCls} ${popupClassName}`}
        wrapperClassName={`${prefixCls} ${className} ${disabledCls}`}
        onVisibleChange={this.handlePopoverVisibleChange}
        width={width}
      >
        <PopoverClickTrigger>
          <Trigger
            disabled={disabled}
            prefixCls={prefixCls}
            trigger={this.trigger}
            placeholder={placeholder}
            selectedItems={selectedItems}
            keyword={keyword}
            {...selectedItem}
            onChange={this.triggerChangeHandler}
            onDelete={this.triggerDeleteHandler}
          />
        </PopoverClickTrigger>
        <Popover.Content>
          <Popup
            ref={ref => (this.popup = ref)}
            cid={cid}
            prefixCls={prefixCls}
            data={this.uniformedData}
            selectedItems={selectedItems}
            extraFilter={extraFilter}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            keyword={keyword}
            filter={filter}
            onAsyncFilter={onAsyncFilter}
            maxToShow={maxToShow}
            onChange={this.optionChangedHandler}
            onFocus={this.popupFocusHandler}
            onBlur={this.popupBlurHandler}
            autoWidth={autoWidth}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

Select.propTypes = {
  data: PropTypes.array,
  prefix: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool,
  popupClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxToShow: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.node,
  selectedItem: PropTypes.shape({
    value: PropTypes.any,
    text: PropTypes.string
  }),
  trigger: PropTypes.func,
  optionValue: PropTypes.string,
  optionText: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  filter: PropTypes.func,
  onAsyncFilter: PropTypes.func,
  onEmptySelected: PropTypes.func,
  onOpen: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // 自动根据ref计算弹层宽度
  autoWidth: PropTypes.bool,

  // 自动添加重置选项
  resetOption: PropTypes.bool,

  // 重置选项展示文本
  resetText: PropTypes.string
};

Select.defaultProps = {
  prefix: 'zent',
  disabled: false,
  className: '',
  open: false,
  popupClassName: '',
  trigger: SelectTrigger,
  placeholder: '请选择',
  searchPlaceholder: '',
  emptyText: '没有找到匹配项',
  selectedItem: {
    value: '',
    text: ''
  },
  selectedItems: [],
  optionValue: 'value',
  optionText: 'text',
  onChange: noop,
  onDelete: noop,
  onEmptySelected: noop,
  onOpen: noop,
  autoWidth: false,

  // 重置为默认值
  resetOption: false,
  resetText: '请选择',

  // 内部状态标记，默认初始值为 null
  value: null,
  index: null,
  initialValue: null,
  initialIndex: null
};

export default Select;
