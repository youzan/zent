/**
 * Select
 */

import React, { Component, PureComponent, Children } from 'react';
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';

import Popover from 'popover';
import Trigger from './triggers/Index';
import Popup from './Popup';
import SimpleTrigger from './triggers/SimpleTrigger';
import SelectTrigger from './triggers/SelectTrigger';
import InputTrigger from './triggers/InputTrigger';
import TagsTrigger from './triggers/TagsTrigger';

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

    this.state = assign(
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
     * 对象数组需提供value和text
     *
     * @return {object}
     */
    let data = this.uniformData(this.props);
    this.formateData(data);
  }

  componentWillReceiveProps(nextProps) {
    let data = this.uniformData(nextProps);
    // 重置组件data
    // let selectedItems = [];

    this.formateData(data, nextProps);
    // if (isArray(nextProps.value)) {
    //   this.sourceData.forEach(item => {
    //     if (nextProps.value.indexOf(item.value) > -1) {
    //       selectedItems.push(item);
    //     }
    //   });
    // }
    // this.setState({
    //   selectedItems
    // });
  }

  // 统一children和data中的数据
  uniformData(props) {
    let data = [];
    if (props.children) {
      data = Children.map(props.children, item => {
        let value = item.props.value;
        value = typeof value === 'undefined' ? item : value;
        return assign({}, item.props, {
          value,
          text: item.props.children
        });
      });
    }

    // props.data会将子元素覆盖
    if (props.data) {
      data = props.data;
    }
    return data;
  }

  // 显示当前选项，支持通过value和index进行外部控制
  getOptions(state, props, item, i) {
    let { value, index } = props;
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
    } else if (!value && !index) {
      // 单选重置
      state.sItem = {};
      state.sItems = [];
    }
    return state;
  }

  // 对data进行处理，增加cid
  formateData(data, props) {
    data = data || this.sourceData;
    props = props || this.props;
    let that = this;
    const { selectedItem, selectedItems } = this.state;
    const {
      value,
      index,
      initialIndex,
      initialValue,
      optionValue,
      optionText
    } = props;
    const selected = { sItem: selectedItem, sItems: [] };

    this.sourceData = cloneDeep(data)
      .map(item => {
        let result = {};
        if (typeof item === 'object') {
          result.value = item[optionValue];
          result.text = item[optionText];
          result = { ...item, ...result };
        } else {
          result.value = item;
          result.text = item;
        }
        return result;
      })
      .map((item, i) => {
        item.cid = `${i}`;

        // 处理默认选项(initialIndex, initialValue)
        if (
          selectedItems.length === 0 &&
          !selectedItem.cid &&
          (initialValue !== null || initialIndex !== null)
        ) {
          that.getOptions(
            selected,
            { value: initialValue, index: initialIndex },
            item,
            i
          );
        }

        // 与受控逻辑(index, value)
        if (value !== null || index !== null) {
          that.getOptions(selected, { value, index }, item, i);
        }
        return item;
      });
    this.setState({
      selectedItem: selected.sItem,
      selectedItems: selected.sItems
    });
    return this.sourceData;
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
    let result = {};
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
    let { selectedItems } = this.state;
    if (!selectedItem) {
      onEmptySelected(ev);
      return;
    }
    let args = omit(selectedItem, ['cid']);
    result[optionValue] = selectedItem.value;
    result[optionText] = selectedItem.text;
    let data = { ...args, ...result };
    if (tags) {
      if (!selectedItems.some(item => item.cid === selectedItem.cid)) {
        selectedItems.push(selectedItem);
      }
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
    let {
      placeholder,
      maxToShow,
      className,
      wrapperClassName,
      disabled,
      emptyText,
      filter = this.props.onFilter,
      onAsyncFilter,
      searchPlaceholder
    } = this.props;

    let {
      open,
      selectedItems,
      selectedItem = {},
      extraFilter,
      keyword = null
    } = this.state;

    let { cid = '' } = selectedItem;

    let disabledCls = disabled ? 'disabled' : '';
    let prefixCls = `${this.props.prefix}-select`;
    return (
      <Popover
        display="inline-block"
        position={Popover.Position.AutoBottomLeft}
        visible={open}
        className={`${prefixCls} ${className}`}
        wrapperClassName={`${prefixCls} ${wrapperClassName} ${disabledCls}`}
        onVisibleChange={this.handlePopoverVisibleChange}
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
            data={this.sourceData}
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
  wrapperClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxToShow: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
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
  onOpen: PropTypes.func
};

Select.defaultProps = {
  prefix: 'zent',
  disabled: false,
  className: '',
  open: false,
  wrapperClassName: '',
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

  // HACK
  value: null,
  index: null,
  initialValue: null,
  initialIndex: null,

  onChange: noop,
  onDelete: noop,
  onEmptySelected: noop,
  onOpen: noop
};

export default Select;
