import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';
import TabsContent from './components/TabsContent';
import {
  ICascaderItem,
  CascaderTabsClickHandler,
  CascaderValue,
  CascaderChangeAction,
  ICascaderChangeMeta,
  ICascaderBaseProps,
  IPublicCascaderItem,
} from './types';
import { getPathInTree, getOptionsLabel } from './utils';
import { SingleTrigger } from './trigger/SingleTrigger';

export interface ITabsCascaderProps extends ICascaderBaseProps {
  value?: CascaderValue[];
  onChange: (
    value: CascaderValue[],
    selectedOptions: IPublicCascaderItem[],
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (selectedOptions: IPublicCascaderItem[]) => Promise<void>;
  title?: string[];
}

interface ICascaderState {
  activeValue: CascaderValue[];

  /**
   * starts from 1, not zero
   */
  activeId: number;

  /**
   * Is popup open
   */
  visible: boolean;

  prevProps: ITabsCascaderProps;

  /**
   * Loading data on this level
   */
  loadingLevel: number | null;
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
      activeValue: value,
      activeId: value.length || 1,
      visible: false,
      prevProps: props,
      loadingLevel: null,
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

    if (!visible && !shallowEqual(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value;
      Object.assign(newState, {
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
    const hasChildren = item.children && item.children.length > 0;
    const needLoading = item.isLeaf === false && !hasChildren && loadOptions;

    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    newValue.push(item.value);
    const selectedOptions = getPathInTree(options, newValue);

    const newState: Partial<ICascaderState> = {
      activeValue: newValue,
    };

    const needClose = !(hasChildren || item.isLeaf === false);
    const needTriggerChange = needClose || changeOnSelect;
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
        this.props.onChange(newValue, selectedOptions, {
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
                  selectedPath={selectedPath}
                  visible={visible}
                  clearable={clearable}
                  i18n={i18n}
                  onClear={this.onClear}
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
