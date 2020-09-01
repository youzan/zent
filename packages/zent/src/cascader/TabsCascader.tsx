import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';
import TabsContent from './components/TabsContent';
import {
  ITabsCascaderProps,
  ICascaderItem,
  CascaderTabsClickHandler,
  CascaderValue,
  CascaderChangeAction,
} from './types';
import { getPathInTree, getOptionsLabel } from './utils';
import { SingleTrigger } from './trigger/SingleTrigger';

interface ICascaderState {
  value: CascaderValue[];
  activeValue: CascaderValue[];

  /**
   * starts from 1, not zero
   */
  activeId: number;
  options: ICascaderItem[];
  visible: boolean;
  loadingLevel?: number;
  prevProps: ITabsCascaderProps;
}

export class TabsCascader extends React.Component<
  ITabsCascaderProps,
  ICascaderState
> {
  static defaultProps = {
    value: [],
    options: [],
    changeOnSelect: false,
    renderValue: getOptionsLabel,
    clearable: false,
    title: [],
  };

  constructor(props: ITabsCascaderProps) {
    super(props);

    const { value } = props;

    this.state = {
      value,
      activeValue: value,
      activeId: value.length || 1,
      options: props.options ?? [],
      visible: false,
      prevProps: props,
    };
  }

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
    return this.props.disabled ?? this.context.value;
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
  onClick: CascaderTabsClickHandler = (
    item: ICascaderItem,
    level: number,
    closePopup
  ) => {
    const { loadOptions, options, changeOnSelect } = this.props;
    const { activeValue } = this.state;
    const needLoading =
      item.isLeaf === false &&
      loadOptions &&
      (!item.children || item.children.length === 0);

    const newValues = activeValue.slice(0, level - 1) as CascaderValue[];
    newValues.push(item.value);
    const selectedOptions = getPathInTree(options, newValues);

    const newState: Partial<ICascaderState> = {
      activeValue: newValues,
    };

    const needClose = !(item.children || item.isLeaf === false);
    const needTriggerChange = needClose || changeOnSelect;

    if (needTriggerChange) {
      newState.value = [...newValues];
    }

    const nextLevel = level + 1;
    if (!needLoading && !needClose) {
      newState.activeId = nextLevel;
    }

    this.setState(newState as ICascaderState, () => {
      if (needLoading) {
        this.setState({
          loadingLevel: level,
        });
        loadOptions(selectedOptions).then(
          () => {
            this.setState({
              activeId: nextLevel,
              loadingLevel: null,
            });
          },
          () => {
            this.setState({
              loadingLevel: null,
            });
          }
        );
      }

      if (needTriggerChange) {
        this.props.onChange(newState.value, selectedOptions, {
          action: CascaderChangeAction.Change,
        });
      }

      if (needClose) {
        closePopup();
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
        this.props.onChange([], [], { action: CascaderChangeAction.Clear });
      }
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
      title,
      options,
    } = this.props;
    const { visible, activeValue, loadingLevel, activeId } = this.state;
    const selectedPath = getPathInTree(options, value);
    const selectedPaths = selectedPath.length > 0 ? [selectedPath] : [];
    const hasValue = selectedPaths.length > 0;

    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          return (
            <Popover
              className={cx('zent-cascader__popup', popupClassName)}
              position={Popover.Position.AutoBottomLeftInViewport}
              visible={visible}
              onVisibleChange={this.onVisibleChange}
              cushion={4}
            >
              <Popover.Trigger.Click toggle>
                <SingleTrigger
                  className={className}
                  placeholder={placeholder}
                  renderValue={renderValue}
                  disabled={this.disabled}
                  selectedPaths={selectedPaths}
                  visible={visible}
                  clearable={clearable}
                  i18n={i18n}
                  onClear={this.onClear}
                  hasValue={hasValue}
                />
              </Popover.Trigger.Click>
              <Popover.Content>
                <TabsContent
                  i18n={i18n}
                  value={activeValue}
                  loadingLevel={loadingLevel}
                  onClick={this.onClick}
                  activeId={activeId}
                  onTabsChange={this.onTabsChange}
                  title={title}
                  options={options}
                />
              </Popover.Content>
            </Popover>
          );
        }}
      </Receiver>
    );
  }
}

export default TabsCascader;
