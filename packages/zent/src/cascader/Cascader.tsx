import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';

import noop from '../utils/noop';
import Popover from '../popover';
import Icon from '../icon';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import { ICascaderItem, CascaderHandler, CascaderValue } from './types';
import TabsPopoverContent from './components/TabsContent';
import MenuPopoverContent from './components/MenuContent';
import { IPopoverClickTriggerProps } from '../popover/trigger/ClickTrigger';
import { DisabledContext, IDisabledContext } from '../disabled';

const PopoverContent = Popover.Content;

export interface IPopverClickTriggerProps extends IPopoverClickTriggerProps {
  disabled: boolean;
}

class PopoverClickTrigger extends Popover.Trigger.Click<
  IPopverClickTriggerProps
> {
  getTriggerProps(child) {
    return {
      onClick: evt => {
        const { disabled, contentVisible } = this.props;
        if (!disabled) {
          if (contentVisible) {
            this.props.close();
          } else {
            this.props.open();
          }
          this.triggerEvent(child, 'onClick', evt);
        }
      },
    };
  }
}

export interface ICascaderProps<Item extends ICascaderItem = ICascaderItem> {
  type?: 'tabs' | 'menu';
  value?: CascaderValue[];
  options?: Item[];
  title?: React.ReactNode[];
  onChange?: (value: Item[]) => void;
  loadMore?: (item: Item, stage: number) => Promise<Item[]>;
  changeOnSelect?: boolean;
  placeholder?: string;
  className?: string;
  popClassName?: string;
  displayText?: (value: Item[]) => React.ReactNode;
  expandTrigger?: 'click' | 'hover';
  disabled?: boolean;
}

export interface ICascaderState<Item extends ICascaderItem = ICascaderItem> {
  value: CascaderValue[];
  options: Item[];
  activeValue: Item[];
  activeId: number;
  open: boolean;
  isLoading?: boolean;
  loadingStage?: number;
  prevProps: ICascaderProps<Item>;
}

function resetCascaderValue<Item extends ICascaderItem>(
  value: unknown[],
  options?: Item[],
  chooseNext?: boolean
) {
  const activeValue: Item[] = [];
  let activeId = 1;

  if (options && options.length > 0 && value && value.length > 0) {
    activeId = 0;
    for (let i = 0; i < value.length; i++) {
      const id = value[i];
      const nextOption = options.find(it => it.id === id);
      if (!nextOption) break;
      activeId++;

      options = (nextOption.children as Item[]) || [];
      activeValue.push(nextOption);
    }
  }

  if (chooseNext) activeId++;

  return {
    activeValue,
    activeId,
  };
}

export class Cascader<
  Item extends ICascaderItem = ICascaderItem
> extends PureComponent<ICascaderProps<Item>, ICascaderState<Item>> {
  static defaultProps = {
    className: '',
    popClassName: 'zent-cascader__popup',
    onChange: noop,
    value: [],
    options: [],
    placeholder: '',
    changeOnSelect: false,
    title: [],
    type: 'tabs',
    expandTrigger: 'click',
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  static getDerivedStateFromProps(
    nextProps: ICascaderProps,
    { prevProps, open }: ICascaderState
  ) {
    let newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };

    if (nextProps !== prevProps) {
      newState.value = nextProps.value || [];
      newState.options = nextProps.options || [];

      // 在即时选中状态，展示通过计算的下一个 tab
      const chooseNext = open && nextProps.changeOnSelect;

      newState = Object.assign(
        newState,
        resetCascaderValue(nextProps.value, nextProps.options, chooseNext)
      );
    }

    return newState;
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || [],
      options: props.options || [],
      activeValue: [],
      activeId: 1,
      open: false,
      prevProps: props,
    };
  }

  componentDidMount() {
    const { value, options } = this.state;
    this.setState(resetCascaderValue(value, options));
  }

  recursiveNextOptions(options: Item[], id: unknown) {
    if (options && options.length > 0) {
      const currOptions = options.find(it => it.id === id);
      if (currOptions && currOptions.children) {
        return currOptions.children;
      }
    }

    return null;
  }

  onShow = () => {
    this.setState({
      open: true,
    });
  };

  onClose = () => {
    const { value } = this.props;
    this.setState({
      open: false,
      value: Array.isArray(value) ? value : [],
    });
  };

  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };

  clickHandler: CascaderHandler<Item> = (
    item,
    stage,
    popover,
    triggerType = 'click'
  ) => {
    const { loadMore } = this.props;
    const { options } = this.state;
    const needLoading =
      !item.isLeaf &&
      loadMore &&
      (!item.children || item.children.length === 0);

    this.expandHandler(item, stage, popover, needLoading, triggerType);

    if (needLoading) {
      this.setState({
        isLoading: true,
        loadingStage: stage,
      });
      loadMore(item, stage).then(children => {
        item.children = children;
        this.expandHandler(item, stage, popover, false);
        this.setState({
          options,
          isLoading: false,
        });
      });
    }
  };

  expandHandler = (
    item: Item,
    stage: number,
    popover: Popover,
    willLoading: boolean,
    triggerType?: 'click' | 'hover'
  ) => {
    let { value, options } = this.state;
    const { changeOnSelect } = this.props;
    let hasClose = false;

    value = value.slice(0, stage - 1);
    value.push(item.id);

    const obj: Partial<ICascaderState<Item>> = {
      value,
    };

    if (item.children || item.isLeaf === false) {
      if (!willLoading) {
        obj.activeId = ++stage;
      }
    } else if (triggerType === 'click') {
      // 只有click的时候才关闭
      hasClose = true;
      popover.close();
    }

    // 选择即改变只针对click
    if (hasClose || (changeOnSelect && triggerType === 'click')) {
      const activeObj = resetCascaderValue(value, options);
      Object.assign(obj, activeObj);
      this.setState(obj as ICascaderState<Item>, () => {
        this.props.onChange(activeObj.activeValue);
      });
    } else {
      this.setState(obj as ICascaderState<Item>);
    }
  };

  getPopoverContent(i18n: II18nLocaleCascader) {
    const { type, title, options, expandTrigger } = this.props;
    const { activeId, value, isLoading, loadingStage } = this.state;
    let PopoverContentType:
      | typeof TabsPopoverContent
      | typeof MenuPopoverContent
      | null = null;
    if (type === 'tabs') {
      PopoverContentType = TabsPopoverContent;
    } else if (type === 'menu') {
      PopoverContentType = MenuPopoverContent;
    } else {
      throw new Error(
        'Invalid type found in Cascader, only tabs and menu are allowed'
      );
    }

    return (
      <PopoverContent>
        <PopoverContentType
          i18n={i18n}
          value={value}
          isLoading={isLoading}
          loadingStage={loadingStage}
          clickHandler={this.clickHandler}
          activeId={activeId}
          onTabChange={this.onTabChange}
          title={title}
          recursiveNextOptions={this.recursiveNextOptions}
          options={options}
          expandTrigger={expandTrigger}
        />
      </PopoverContent>
    );
  }

  render() {
    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          const {
            className,
            popClassName,
            placeholder,
            disabled = this.context.value,
          } = this.props;
          const { activeValue, open } = this.state;

          let cascaderValue: React.ReactNode = placeholder || i18n.placeholder;
          let hasValue = false;
          if (activeValue && activeValue.length > 0) {
            hasValue = true;
            if (this.props.displayText) {
              cascaderValue = this.props.displayText(activeValue);
            } else {
              cascaderValue = activeValue.map(valueItem => {
                return valueItem.title;
              });
              cascaderValue = (cascaderValue as string[]).join(' / ');
            }
          }

          const cascaderCls = classnames('zent-cascader', className, {
            'zent-cascader--disabled': disabled,
            'zent-cascader--open': open,
          });

          const selectTextCls = classnames('zent-cascader__select-text', {
            'zent-cascader--placeholder': !hasValue,
          });

          return (
            <div className={cascaderCls}>
              <Popover
                className={popClassName}
                position={Popover.Position.BottomLeft}
                onShow={this.onShow}
                onClose={this.onClose}
                cushion={4}
              >
                <PopoverClickTrigger disabled={disabled}>
                  <div className="zent-cascader__select">
                    <div className={selectTextCls}>
                      <span className="zent-cascader__select-text-content">
                        {cascaderValue}
                      </span>
                      <Icon type="caret-down" />
                    </div>
                  </div>
                </PopoverClickTrigger>
                {this.getPopoverContent(i18n)}
              </Popover>
            </div>
          );
        }}
      </Receiver>
    );
  }
}

export default Cascader;
