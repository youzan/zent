import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import noop from 'lodash-es/noop';

import Popover from '../popover';
import Icon from '../icon';
import { I18nReceiver as Receiver } from '../i18n';
import { ICascaderItem, CascaderHandler, CascaderValue } from './types';
import TabsPopoverContent from './components/TabsContent';
import MenuPopoverContent from './components/MenuContent';

const PopoverContent = Popover.Content;

class PopoverClickTrigger extends Popover.Trigger.Click {
  getTriggerProps(child) {
    return {
      onClick: evt => {
        if (this.props.contentVisible) {
          this.props.close();
        } else {
          this.props.open();
        }
        this.triggerEvent(child, 'onClick', evt);
      },
    };
  }
}

export interface ICascaderProps {
  type?: 'tabs' | 'menu';
  value?: CascaderValue[];
  options?: ICascaderItem[];
  title?: React.ReactNode[];
  onChange?: (value: ICascaderItem[]) => void;
  loadMore?: (item: ICascaderItem, stage: number) => Promise<ICascaderItem[]>;
  changeOnSelect?: boolean;
  placeholder?: string;
  prefix?: string;
  className?: string;
  popClassName?: string;
  displayText?: (value: ICascaderItem[]) => React.ReactNode;
  expandTrigger?: 'click' | 'hover';
}

export interface ICascaderState {
  value: CascaderValue[];
  options: ICascaderItem[];
  activeValue: ICascaderItem[];
  activeId: number;
  open: boolean;
  isLoading?: boolean;
  loadingStage?: number;
}

export class Cascader extends PureComponent<ICascaderProps, ICascaderState> {
  static defaultProps = {
    prefix: 'zent',
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

  constructor(props) {
    super(props);

    this.state = {
      value: Array.isArray(props.value) ? props.value : [],
      options: Array.isArray(props.options) ? props.options : [],
      activeValue: [],
      activeId: 1,
      open: false,
    };
  }

  componentWillMount() {
    this.resetCascaderValue(null, null, false);
  }

  componentWillReceiveProps(nextProps) {
    const { loadMore } = this.props;

    if (nextProps.hasOwnProperty('value')) {
      const nextValue = Array.isArray(nextProps.value) ? nextProps.value : [];
      if (!loadMore) {
        this.setState({
          value: nextValue,
        });
      }
      this.resetCascaderValue(nextValue, nextProps.options, false);
    }
    if (this.props.options !== nextProps.options) {
      this.setState({
        options: Array.isArray(nextProps.options) ? nextProps.options : [],
      });
    }
  }

  recursiveNextOptions(options: ICascaderItem[], id: unknown) {
    if (options && options.length > 0) {
      const currOptions = options.find(it => it.id === id);
      if (currOptions && currOptions.children) {
        return currOptions.children;
      }
    }

    return null;
  }

  resetCascaderValue(
    value: unknown[],
    options?: ICascaderItem[],
    isTriggerChange = true
  ) {
    const activeValue = [];
    let activeId = 1;
    const { onChange } = this.props;
    const state = this.state;
    value = value || state.value;
    options = options || state.options;

    if (options && options.length > 0 && value && value.length > 0) {
      activeId = 0;
      for (let i = 0; i < value.length; i++) {
        const id = value[i];
        const nextOption = options.find(it => it.id === id);
        activeId++;
        if (!nextOption) break;

        options = nextOption.children;
        activeValue.push({
          id: nextOption.id,
          title: nextOption.title,
        });
      }
    }

    if (isTriggerChange) {
      onChange(activeValue);
    }

    this.setState({
      activeValue,
      activeId,
    });
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
      activeId: 1,
    });
  };

  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };

  clickHandler: CascaderHandler = (
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
    item: ICascaderItem,
    stage: number,
    popover: Popover,
    willLoading: boolean,
    triggerType?: 'click' | 'hover'
  ) => {
    let { value } = this.state;
    const { changeOnSelect } = this.props;
    let hasClose = false;

    value = value.slice(0, stage - 1);
    value.push(item.id);

    const obj: Partial<ICascaderState> = {
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
      this.resetCascaderValue(value);
    }

    this.setState(obj as any);
  };

  getPopoverContent(i18n) {
    const { type, prefix, title, options, expandTrigger } = this.props;
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
          prefix={prefix}
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
        {i18n => {
          const { prefix, className, popClassName, placeholder } = this.props;
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

          const cascaderCls = classnames({
            [`${prefix}-cascader`]: true,
            [className]: true,
            open,
          });

          const selectTextCls = classnames({
            [`${prefix}-cascader__select-text`]: true,
            'is-placeholder': !hasValue,
          });

          return (
            <div className={cascaderCls}>
              <Popover
                className={popClassName}
                position={Popover.Position.BottomLeft}
                onShow={this.onShow}
                onClose={this.onClose}
              >
                <PopoverClickTrigger>
                  <div className={`${prefix}-cascader__select`}>
                    <div className={selectTextCls}>
                      <span
                        className={`${prefix}-cascader__select-text-content`}
                      >
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
