import * as React from 'react';
import { Component } from 'react';
import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import TabsContent from './components/TabsContent';
import { commonProps } from './common/constants';
import {
  ITabsCascaderProps,
  ICascaderItem,
  CascaderHandler,
  CascaderValue,
  CascaderChangeAction,
  CascaderLoadAction,
} from './types';
import CascaderTrigger from './trigger';
import { getPathInTree } from './common/utils';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';

interface ICascaderState {
  value: CascaderValue[];
  activeValue: CascaderValue[];
  activeId: number;
  options: ICascaderItem[];
  visible: boolean;
  loadingLevel?: number;
  prevProps: ITabsCascaderProps;
}

export class TabsCascader extends Component<
  ITabsCascaderProps,
  ICascaderState
> {
  constructor(props) {
    super(props);
    const value = props.value || [];

    this.state = {
      value,
      activeValue: value,
      activeId: value.length || 1,
      options: props.options || [],
      visible: false,
      prevProps: props,
    };
  }

  static defaultProps = {
    ...commonProps,
    title: [],
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  static getDerivedStateFromProps(
    nextProps: ITabsCascaderProps,
    { prevProps, visible }: ICascaderState
  ) {
    const newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };

    if (prevProps.options !== nextProps.options) {
      newState.options = nextProps.options || [];
    }

    if (!visible && !shallowEqual(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value || [];
      Object.assign(newState, {
        value: newValue,
        activeValue: newValue,
        activeId: newValue.length || 1,
      });
    }

    return newState;
  }

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  onVisibleChange = (visible: boolean) => {
    if (this.disabled) {
      return;
    }

    this.setState({
      visible,
    });
  };

  onTabsChange = (activeId: number) => {
    this.setState({
      activeId,
    });
  };

  /**
   * 城市级联某一层级的子节点点击事件
   * @param item 点击的节点
   * @param level 当前的层级，从 1 开始计数
   */
  clickHandler: CascaderHandler = (
    item: ICascaderItem,
    level: number,
    popover
  ) => {
    const { loadOptions, options, changeOnSelect } = this.props;
    const { activeValue } = this.state;
    const needLoading =
      item.isLeaf === false &&
      loadOptions &&
      (!item.children || item.children.length === 0);

    const newValues = activeValue.slice(0, level - 1) as CascaderValue[];
    newValues.push(item.value);
    const selectedOptions = getPathInTree(newValues, options);
    let needClose = false;

    const obj: Partial<ICascaderState> = {
      activeValue: newValues,
    };

    if (!(item.children || item.isLeaf === false)) {
      needClose = true;
      popover.close();
    }

    const needTriggerChange = needClose || changeOnSelect;

    if (needTriggerChange) {
      obj.value = [...newValues];
    }

    const nextLevel = level + 1;
    if (!needLoading && !needClose) {
      obj.activeId = nextLevel;
    }

    this.setState(obj as ICascaderState, () => {
      if (needLoading) {
        this.setState({
          loadingLevel: level,
        });
        loadOptions(selectedOptions, { action: CascaderLoadAction.Next }).then(
          () => {
            this.setState({
              activeId: nextLevel,
              loadingLevel: null, // 标识取消 loading 状态
            });
          }
        );
      }

      if (needTriggerChange) {
        this.props.onChange(obj.value, selectedOptions, {
          action: CascaderChangeAction.Change,
        });
      }
    });
  };

  onClear = () => {
    this.setState(
      {
        value: [],
        activeValue: [],
        visible: false,
      },
      () => {
        this.props.onChange(null, null, { action: CascaderChangeAction.Clear });
      }
    );
  };

  getPopoverContent = (i18n: II18nLocaleCascader) => {
    const { title, options } = this.props;
    const { activeValue, loadingLevel, activeId } = this.state;

    return (
      <Popover.Content>
        <TabsContent
          i18n={i18n}
          value={activeValue}
          loadingLevel={loadingLevel}
          clickHandler={this.clickHandler}
          activeId={activeId}
          onTabsChange={this.onTabsChange}
          title={title}
          options={options}
        />
      </Popover.Content>
    );
  };

  render() {
    const {
      className,
      popupClassName,
      placeholder,
      renderValue,
      clearable,
      value,
      options,
    } = this.props;
    const { visible } = this.state;
    const selectedOptions = getPathInTree(value, options);

    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          return (
            <Popover
              className={popupClassName}
              position={Popover.Position.AutoBottomLeftSticky}
              visible={visible}
              onVisibleChange={this.onVisibleChange}
              cushion={4}
            >
              <Popover.Trigger.Click toggle>
                <CascaderTrigger
                  className={className}
                  placeholder={placeholder}
                  renderValue={renderValue}
                  disabled={this.disabled}
                  selectedOptions={selectedOptions}
                  visible={visible}
                  clearable={clearable}
                  value={value}
                  i18n={i18n}
                  onClear={this.onClear}
                />
              </Popover.Trigger.Click>
              {this.getPopoverContent(i18n)}
            </Popover>
          );
        }}
      </Receiver>
    );
  }
}

export default TabsCascader;
