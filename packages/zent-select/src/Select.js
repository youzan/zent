/**
 * Select
 */

import React, { Component, PropTypes } from 'react';
import assign from 'zent-utils/lodash/assign';
import omit from 'zent-utils/lodash/omit';
import cloneDeep from 'zent-utils/lodash/cloneDeep';
import isEqual from 'zent-utils/lodash/isEqual';
import isArray from 'zent-utils/lodash/isArray';
import Trigger from './triggers/Index';
import Popup from './Popup';
import SimpleTrigger from './triggers/SimpleTrigger';
import SelectTrigger from './triggers/SelectTrigger';
import InputTrigger from './triggers/InputTrigger';
import TagsTrigger from './triggers/TagsTrigger';
import { KEY_ESC, KEY_EN, KEY_UP, KEY_DOWN } from './constants';

const noop = () => void 0;

class Select extends Component {

  constructor(props) {
    super(props);

    let data = [];

    /**
     * data支持字符串数组和对象数组两种模式
     *
     * 字符串数组默认value为下标
     * 对象数组需提供value和text
     *
     * @return {object}
     */

    if (props.children) {
      let children = props.children;
      if (!isArray(children)) {
        children = [children];
      }
      data = children.map((item) => {
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

    if (props.simple) {
      this.trigger = SimpleTrigger;
    } else if (props.search) {
      this.trigger = InputTrigger;
    } else if (props.tags) {
      this.trigger = TagsTrigger;
    } else {
      this.trigger = props.trigger;
    }

    this.state = assign({
      selectedItems: []
    }, props);

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
    let { open } = this.state;
    // 重置组件data
    let nextState = { ...nextProps, open };
    let selectedItems = [];
    if (nextProps.data === this.state.data
      && nextProps.value === this.state.value
      && nextProps.index === this.state.index
    ) return;
    if (`${nextProps.value}` || `${nextProps.index}`) {
      this.state.selectedItem = this.props.selectedItem;
    }
    this.formateData(nextProps.data, nextProps);
    if (isArray(nextProps.value)) {
      this.sourceData.forEach(item => {
        if (nextProps.value.indexOf(item.value) > -1) {
          selectedItems.push(item);
        }
      });
    }
    nextState.selectedItem = this.state.selectedItem;
    nextState.selectedItems = selectedItems;
    this.setState(nextState);
  }

  // 对data进行处理，增加cid
  formateData(data, props) {
    data = data || this.sourceData;
    props = props || this.props;
    let that = this;
    this.sourceData = cloneDeep(data).map((item) => {
      let result = {};
      if (typeof item === 'object') {
        result.value = item[props.optionValue];
        result.text = item[props.optionText];
      } else {
        result.value = item;
        result.text = item;
      }
      return assign(item, result);
    }).map((item, index) => {
      // 显示当前选项，支持value和index
      item.cid = `${index}`;
      if (isArray(props.value) && props.value.indexOf(item.value) > -1) {
        that.state.selectedItems.push(item);
      } else if (typeof props.value === 'object' && isEqual(props.value, item.value)) {
        that.state.selectedItem = item;
      } else if (typeof props.value !== 'undefined' && typeof props.value !== 'object' && `${item.value}` === `${props.value}` ||
          props.index !== 'undefined' && `${index}` === `${props.index}`) {
        that.state.selectedItem = item;
      }

      return item;
    });
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
    this.setState({
      selectedItems
    }, () => {
      this.props.onDelete(data);
    });
  }

  // 将被选中的option的数据传给trigger
  optionChangedHandler(ev, selectedItem) {
    let result = {};
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
    let data = { ...args, result };
    if (tags) {
      if (!selectedItems.some(item => item.cid === selectedItem.cid)) {
        selectedItems.push(selectedItem);
      }
    }
    onChange(ev, data);
    this.setState({
      selectedItems,
      selectedItem,
      open: this.focus
    });
  }

  popupFocusHandler() {
    this.focus = true;
  }

  popupBlurHandler() {
    this.focus = false;
  }

  // 焦点丢失处理
  blurHandler() {
    let that = this;
    setTimeout(() => {
      that.setState({
        open: this.focus
      });
    }, 0);
  }

  keyupHandler(ev) {
    let code = ev.keyCode;
    let keyword = ev.target.value;
    if (code === KEY_ESC) {
      this.setState({
        open: false
      });
    } else if ([KEY_EN, KEY_UP, KEY_DOWN].indexOf(code) > -1) {
      ev.preventDefault();
      this.setState({
        keyCode: code,
        keyword
      });
    } else {
      this.setState({
        keyCode: code
      });
    }
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
      keyCode,
      keyword
    } = this.state;

    let {
      cid = '',
      value
    } = selectedItem;

    let openCls = open && !disabled ? 'open' : '';
    let disabledCls = disabled ? 'disabled' : '';
    let prefixCls = `${this.props.prefix}-select`;

    return (
      <div tabIndex="0" className={`${prefixCls} ${className} ${openCls} ${disabledCls}`} onBlur={this.blurHandler} onKeyDown={this.keyupHandler}>
        <Trigger
          prefixCls={prefixCls}
          trigger={this.trigger}
          placeholder={placeholder}
          selectedItems={selectedItems}
          open={open}
          {...selectedItem}
          onChange={this.triggerChangeHandler}
          onDelete={this.triggerDeleteHandler}
        />
        <Popup
          cid={cid}
          prefixCls={prefixCls}
          data={this.sourceData}
          selectedItems={selectedItems}
          extraFilter={extraFilter}
          searchPlaceholder={searchPlaceholder}
          value={value}
          emptyText={emptyText}
          keyCode={keyCode}
          keyword={keyword}
          filter={filter}
          onAsyncFilter={onAsyncFilter}
          onChange={this.optionChangedHandler}
          onFocus={this.popupFocusHandler}
          onBlur={this.popupBlurHandler}
        />
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
  trigger: SelectTrigger,
  open: false,
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
  onOpen: noop
};

export default Select;
