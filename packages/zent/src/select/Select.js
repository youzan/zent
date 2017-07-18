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
// import Button from 'button';

import Trigger from './triggers';
import PopContent from './PopContent';
// import Popup from './Popup';
// import SimpleTrigger from './triggers/SimpleTrigger';
// import SelectTrigger from './triggers/SelectTrigger';
// import InputTrigger from './triggers/InputTrigger';
// import TagsTrigger from './triggers/TagsTrigger';
import { KEY_ESC } from './constants';

class Select extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    let data = this.uniformData(props);

    /**
     * data支持字符串数组和对象数组两种模式
     *
     * 字符串数组默认value为下标
     * 对象数组需提供value和text
     *
     * @return {object}
     */

    if (props.simple) {
      this.TRIGGER_TYPE = 'Simple';
    } else if (props.search) {
      this.TRIGGER_TYPE = 'Input';
    } else if (props.tags) {
      this.TRIGGER_TYPE = 'Tags';
    } else {
      this.TRIGGER_TYPE = 'Select';
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

    this.formateData(data);

    this.blurHandler = this.blurHandler.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
    this.triggerChangeHandler = this.triggerChangeHandler.bind(this);
    this.triggerDeleteHandler = this.triggerDeleteHandler.bind(this);
    this.optionChangedHandler = this.optionChangedHandler.bind(this);
    this.popupFocusHandler = this.popupFocusHandler.bind(this);
    this.popupBlurHandler = this.popupBlurHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let data = this.uniformData(nextProps);
    // 重置组件data

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
      state.sItems.push(item);
    } else if (typeof value === 'object' && isEqual(value, item.value)) {
      state.sItem = item;
    } else if (
      (typeof value !== 'undefined' &&
        typeof value !== 'object' &&
        `${item.value}` === `${value}`) ||
      (index !== 'undefined' && `${i}` === `${index}`)
    ) {
      state.sItem = item;
    }
    return state;
  }

  // 对data进行处理，增加cid
  // 此方法仅在 constructor 与 componentWillReceiveProps 中调用，因此可以直接对state进行赋值。
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
    const s = { sItem: selectedItem, sItems: selectedItems };

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
        if (selectedItems.length === 0 && !selectedItem.cid) {
          that.getOptions(
            s,
            { value: initialValue, index: initialIndex },
            item,
            i
          );
        }

        // 与受控逻辑(index, value)
        that.getOptions(s, { value, index }, item, i);
        return item;
      });
    this.state.selectedItem = s.sItem;
    this.state.selectedItems = s.sItems;
    return this.sourceData;
  }

  // 接收trigger改变后的数据，将数据传给popup
  triggerChangeHandler(data) {
    if (data.open) {
      this.props.onOpen();
    }
    this.setState(data);
  }

  triggerDeleteHandler(data) {
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
  }

  // 将被选中的option的数据传给trigger
  optionChangedHandler(ev, selectedItem) {
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
    this.setState({
      keyword: null,
      selectedItems,
      selectedItem,
      open: this.focus
    });
  }

  popupFocusHandler() {
    this.focus = this.state.open;
  }

  popupBlurHandler() {
    this.focus = false;
  }

  // 焦点丢失处理
  blurHandler() {
    // blurHandler(e, event) {
    // setTimeout(() => {
    //   this.setState({
    //     open: this.focus
    //   });
    // }, 0);
  }

  keyupHandler(ev) {
    const { visible } = this.popover.state;
    let code = ev.keyCode;
    if (visible && code === KEY_ESC) this.popover.close();
  }

  render() {
    let {
      placeholder,
      className,
      disabled,
      emptyText,
      filter = this.props.onFilter,
      onAsyncFilter,
      searchPlaceholder
    } = this.props;

    let {
      selectedItems,
      selectedItem = {},
      extraFilter,
      open,
      keyword = null
    } = this.state;

    let { cid = '' } = selectedItem;

    let openCls = open && !disabled ? 'open' : '';
    let disabledCls = disabled ? 'disabled' : '';
    let prefixCls = `${this.props.prefix}-select`;

    return (
      <div
        tabIndex="0"
        className={`${prefixCls} ${className} ${openCls} ${disabledCls}`}
        onBlur={this.blurHandler}
        onKeyDown={this.keyupHandler}
      >
        <Popover
          position={Popover.Position.BottomLeft}
          display="inline"
          cushion={1}
          ref={popover => (this.popover = popover)}
        >
          <Trigger
            prefixCls={prefixCls}
            triggerType={this.TRIGGER_TYPE}
            placeholder={placeholder}
            selectedItems={selectedItems}
            keyword={keyword}
            {...selectedItem}
            onChange={this.triggerChangeHandler}
            onDelete={this.triggerDeleteHandler}
            disabled={disabled}
          />
          <Popover.Content>
            <div className="zent-select zent-select-popup-wrapper">
              <PopContent
                cid={cid}
                prefixCls={prefixCls}
                data={this.sourceData}
                selectedItem={selectedItem}
                selectedItems={selectedItems}
                extraFilter={extraFilter}
                searchPlaceholder={searchPlaceholder}
                emptyText={emptyText}
                keyword={keyword}
                filter={filter}
                onAsyncFilter={onAsyncFilter}
                onChange={this.optionChangedHandler}
                onFocus={this.popupFocusHandler}
                onBlur={this.popupBlurHandler}
              />
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

Select.propTypes = {
  data: PropTypes.array,
  prefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
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
  // trigger: SelectTrigger,
  open: false,
  placeholder: '请选择',
  searchPlaceholder: '',
  emptyText: '没有找到匹配项',
  optionValue: 'value',
  optionText: 'text',
  onChange: noop,
  onDelete: noop,
  onEmptySelected: noop,
  onOpen: noop
};

export default Select;
