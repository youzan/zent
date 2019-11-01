/**
 * Select 垃圾代码，需要清理
 */

import * as React from 'react';
import cx from 'classnames';
import omit from 'lodash-es/omit';
import isEqual from 'lodash-es/isEqual';
import noop from 'lodash-es/noop';
import cloneDeep from 'lodash-es/cloneDeep';
import assign from 'lodash-es/assign';

import Popover from '../popover';
import Option from './components/Option';
import Trigger from './trigger';
import Popup from './Popup';
import SelectTrigger from './trigger/BaseTrigger';
import InputTrigger from './trigger/InputTrigger';
import TagsTrigger from './trigger/TagsTrigger';
import { DisabledContext, IDisabledContext } from '../disabled';

const { Content } = Popover;

export interface ISelectProps {
  data: unknown[];
  tags?: boolean;
  value?: any;
  index?: any;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  trigger?: React.ComponentType<any>;
  optionText?: string;
  optionValue?: string;
  onChange?: (
    event: {
      target: { type: any; value: any };
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    value: any
  ) => void;
  onDelete?: (date: any) => void;
  filter?: (item: any, keyword?: string) => boolean;
  onFilter?: (item: any, keyword?: string) => boolean;
  maxToShow?: number;
  onAsyncFilter?: (keyword: string, callback: (data: any) => void) => void;
  onEmptySelected?: (
    event: React.SyntheticEvent<HTMLSpanElement>,
    value?: unknown
  ) => void;
  onOpen?: () => void;
  className?: string;
  popupClassName?: string;
  autoWidth?: boolean;
  resetOption?: boolean;
  resetText?: string;
  width?: number | string;
  prefix?: string;
  simple?: boolean;
  search?: boolean;
}

export class Select extends React.Component<ISelectProps, any> {
  static defaultProps = {
    prefix: 'zent',
    open: false,
    optionValue: 'value',
    optionText: 'text',
    onChange: noop,
    onDelete: noop,
    onEmptySelected: noop,
    onOpen: noop,
    autoWidth: false,

    // 重置为默认值
    resetOption: false,
    resetText: '...',

    // 内部状态标记，默认初始值为 null
    value: null,
    index: null,
    initialValue: null,
    initialIndex: null,
  };

  static Option = Option;
  static SelectTrigger = SelectTrigger;
  static InputTrigger = InputTrigger;
  static TagsTrigger = TagsTrigger;

  static contextType = DisabledContext;
  context!: IDisabledContext;

  popover: Popover | null = null;
  popup: React.ComponentType<any> | null = null;

  constructor(props) {
    super(props);

    this.state = assign(
      {
        selectedItems: [],
        selectedItem: {
          value: '',
          text: '',
        },

        // popover content 位置就绪可以进行 focus 操作的标记.
        optionsReady: false,
      },
      props
    );
  }

  uniformedData: any;

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
      resetText,
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
        React.Children.map(children, (item, index) => {
          let value = item.props.value;
          value = typeof value === 'undefined' ? item : value;
          return assign({}, item.props, {
            value,
            cid: `${index}`,
            text: item.props.children,
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
        selectedItems: [],
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
      selectedItems: selected.sItems,
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

    if (Array.isArray(value)) {
      const valueIndex = value.indexOf(item.value);
      // rerender 去重
      if (
        valueIndex > -1 &&
        !state.sItems.find(
          selected => selected && selected.value === item.value
        )
      ) {
        state.sItems[valueIndex] = item;
      } else if (value.length === 0) {
        // 多选重置
        state.sItem = {};
        state.sItems = [];
      }
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
        selectedItems,
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
      stopPropagation: noop,
    };
    const {
      onEmptySelected,
      optionValue,
      optionText,
      tags,
      onChange,
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
        selectedItem,
      },
      () => {
        onChange(
          {
            target: {
              ...this.props,
              type: tags ? 'select-multiple' : 'select-one',
              value: selectedItem.value,
            },

            preventDefault() {
              ev.preventDefault();
            },

            stopPropagation() {
              ev.stopPropagation();
            },
          },
          data
        );
      }
    );
  };

  handlePopoverVisibleChange = visible => {
    if (visible) {
      this.props.onOpen();
    } else {
      this.setState({ optionsReady: false });
    }
    this.setState({ open: visible });
  };

  render() {
    const {
      placeholder,
      maxToShow,
      className,
      popupClassName,
      disabled = this.context.value,
      emptyText,
      filter = this.props.onFilter, // TODO: confusing code
      onAsyncFilter,
      searchPlaceholder,
      autoWidth,
      width,

      // Old API about trigger
      simple,
      search,
      tags,
      trigger,
    } = this.props;

    const {
      open,
      selectedItems,
      selectedItem = {},
      extraFilter,
      optionsReady,
      keyword = null,
    } = this.state;

    const { cid = '' } = selectedItem;

    const disabledCls = disabled ? 'disabled' : '';
    const prefixCls = `${this.props.prefix}-select`;
    return (
      <Popover
        display="inline-block"
        cushion={4}
        ref={ref => (this.popover = ref)}
        position={Popover.Position.AutoBottomLeft}
        visible={open}
        className={cx(`${prefixCls}__popover`, popupClassName, {
          'auto-width': autoWidth,
        })}
        wrapperClassName={cx(prefixCls, className, disabledCls)}
        onVisibleChange={this.handlePopoverVisibleChange}
        width={width}
        onPositionReady={() => {
          this.setState({
            optionsReady: true,
          });
        }}
      >
        <Trigger
          visible={open}
          disabled={disabled}
          prefixCls={prefixCls}
          placeholder={placeholder}
          selectedItems={selectedItems}
          keyword={keyword}
          {...selectedItem}
          trigger={{
            simple,
            search,
            tags,
            trigger,
          }}
          onChange={this.triggerChangeHandler}
          onDelete={this.triggerDeleteHandler}
        />
        <Content>
          <Popup
            ref={ref => (this.popup = ref)}
            cid={cid}
            prefixCls={prefixCls}
            data={this.uniformedData}
            ready={optionsReady}
            selectedItems={selectedItems}
            extraFilter={extraFilter}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            keyword={keyword}
            filter={filter}
            onAsyncFilter={onAsyncFilter}
            maxToShow={maxToShow}
            onChange={this.optionChangedHandler}
            // WTF
            // onFocus={this.popupFocusHandler}
            // onBlur={this.popupBlurHandler}
            autoWidth={autoWidth}
            adjustPosition={
              this.popover && this.popover.adjustPosition.bind(this.popover)
            }
          />
        </Content>
      </Popover>
    );
  }
}

export default Select;
