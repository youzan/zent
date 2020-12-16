import { Component } from 'react';
import cx from 'classnames';

import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import { DisabledContext, IDisabledContext } from '../disabled';
import TabsContent from './components/TabsContent';
import {
  CascaderTabsClickHandler,
  CascaderValue,
  CascaderChangeAction,
  ICascaderChangeMeta,
  ICascaderBaseProps,
  IPublicCascaderItem,
} from './types';
import { getPathLabel, getPathToNode } from './path-fns';
import { SingleTrigger } from './trigger/SingleTrigger';
import { Forest } from './forest';
import { getNodeDepth } from './node-fns';

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

interface ITabsCascaderState {
  options: Forest;

  /**
   * value to highlight
   */
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

function isControlled(props: ITabsCascaderProps) {
  return (
    'visible' in props &&
    'onVisibleChange' in props &&
    typeof props.onVisibleChange === 'function'
  );
}

function getVisible(
  props: ITabsCascaderProps,
  state: ITabsCascaderState
): boolean {
  if (isControlled(props)) {
    return props.visible;
  }

  return state.visible;
}

export class TabsCascader extends Component<
  ITabsCascaderProps,
  ITabsCascaderState
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
    props: ITabsCascaderProps,
    state: ITabsCascaderState
  ) {
    const newState: Partial<ITabsCascaderState> = {
      prevProps: props,
    };
    const { prevProps } = state;
    const visible = getVisible(props, state);

    if (!visible) {
      const newValue = props.value;
      newState.activeValue = newValue;
      newState.activeTab = newValue.length || 1;
    }

    if (props.options !== prevProps.options) {
      newState.options = new Forest(props.options);
    }

    return newState;
  }

  get disabled() {
    return this.props.disabled ?? this.context.value;
  }

  isControlled(): boolean {
    return isControlled(this.props);
  }

  getVisible(): boolean {
    return getVisible(this.props, this.state);
  }

  setVisible(visible: boolean): void {
    if (this.isControlled()) {
      this.props.onVisibleChange(visible);
    } else {
      this.setState({
        visible,
      });
    }
  }

  onVisibleChange = (visible: boolean) => {
    if (this.disabled) {
      return;
    }

    this.setVisible(visible);
  };

  onTabsChange = (activeId: number) => {
    this.setState({
      activeTab: activeId,
    });
  };

  /**
   * 城市级联某一层级的子节点点击事件
   * @param node 点击的节点
   * @param level 当前的层级，从 1 开始计数
   */
  onClick: CascaderTabsClickHandler = (node, closePopup) => {
    const { loadOptions, changeOnSelect } = this.props;
    const needLoading = node.loadChildrenOnExpand && loadOptions;

    const selectedOptions = getPathToNode(node);
    const newValue = selectedOptions.map(n => n.value);

    const newState: Partial<ITabsCascaderState> = {
      activeValue: newValue,
    };

    const hasChildren = node.children && node.children.length > 0;
    const needClose = !node.loadChildrenOnExpand && !hasChildren;
    const needTriggerChange = needClose || changeOnSelect;
    const level = getNodeDepth(node);
    const nextLevel = level + 1;

    if (!needLoading && !needClose) {
      newState.activeTab = nextLevel;
    }

    this.setState(newState as ITabsCascaderState, () => {
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
        this.props.onChange(
          selectedOptions.map(n => n.value),
          selectedOptions,
          {
            action: CascaderChangeAction.Change,
          }
        );
      }

      if (needClose) {
        closePopup();
      }
    });
  };

  onClear = () => {
    this.setVisible(false);
    this.setState(
      {
        activeValue: [],
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
      renderItemContent,
      getItemTooltip,
      renderList,
    } = this.props;
    const { activeValue, loadingLevel, activeTab, options } = this.state;
    const visible = this.getVisible();
    const selectedPath = options.getPathByValue(value);

    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          return (
            <Popover
              className={cx('zent-cascader-v2__popup', popupClassName)}
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
                  renderItemContent={renderItemContent}
                  getItemTooltip={getItemTooltip}
                  renderList={renderList}
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
