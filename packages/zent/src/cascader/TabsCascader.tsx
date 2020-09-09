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
import { getPathLabel } from './path-fns';
import { SingleTrigger } from './trigger/SingleTrigger';
import { Forest } from './forest';

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
  options: Forest;

  activeValue: CascaderValue[];

  /**
   * starts from 1, not zero
   */
  activeTab: number;

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
    renderValue: getPathLabel,
    clearable: false,
    title: [],
  };

  constructor(props: ITabsCascaderProps) {
    super(props);

    const { value } = props;

    this.state = {
      options: new Forest(props.options),
      activeValue: value,
      activeTab: value.length || 1,
      visible: false,
      prevProps: props,
      loadingLevel: null,
    };
  }

  static contextType = DisabledContext;
  context!: IDisabledContext;

  static getDerivedStateFromProps(
    nextProps: ITabsCascaderProps,
    { prevProps, visible, options }: ICascaderState
  ) {
    const newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };

    if (!visible && !shallowEqual(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value;
      Object.assign(newState, {
        activeValue: newValue,
        activeTab: newValue.length || 1,
      });
    }

    if (nextProps.options !== prevProps.options) {
      newState.options = new Forest(nextProps.options);
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
      activeTab: activeId,
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
    const { loadOptions, changeOnSelect } = this.props;
    const { activeValue, options } = this.state;
    const needLoading = item.loadChildrenOnExpand && loadOptions;

    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    newValue.push(item.value);
    const selectedOptions = options.getPathByValue(newValue);

    const newState: Partial<ICascaderState> = {
      activeValue: newValue,
    };

    const hasChildren = item.children && item.children.length > 0;
    const needClose = !item.loadChildrenOnExpand && !hasChildren;
    const needTriggerChange = needClose || changeOnSelect;
    const nextLevel = level + 1;

    if (!needLoading && !needClose) {
      newState.activeTab = nextLevel;
    }

    this.setState(newState as ICascaderState, () => {
      if (needLoading) {
        this.setState({
          loadingLevel: level,
        });
        loadOptions(selectedOptions).then(
          () => {
            this.setState({
              activeTab: nextLevel,
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
    } = this.props;
    const {
      visible,
      activeValue,
      loadingLevel,
      activeTab,
      options,
    } = this.state;
    const selectedPath = options.getPathByValue(value);

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
                  activeId={activeTab}
                  onTabsChange={this.onTabsChange}
                  title={title}
                  options={options.getTrees()}
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
