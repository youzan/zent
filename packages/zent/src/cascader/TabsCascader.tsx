import * as React from 'react';
import { Component } from 'react';
import Popover from '../popover';
import { II18nLocaleCascader } from '../i18n';
import TabsContent from './components/TabsContent';
import { commonProps } from './common/constants';
import {
  ITabsCascaderProps,
  ICascaderItem,
  ICascaderHandler,
  ICascaderValue,
} from './types';
import CascaderTrigger from './trigger';
import { isEqualArrays, arrayTreeFilter } from './common/utils';

const PopoverContent = Popover.Content;

interface ICascaderState<Item extends ICascaderItem = ICascaderItem> {
  value: ICascaderValue[];
  activeValue: ICascaderValue[];
  activeId: number;
  options: Item[];
  open: boolean;
  loadingStage?: number;
  prevProps: ITabsCascaderProps;
}

export class TabsCascader<
  Item extends ICascaderItem = ICascaderItem
> extends Component<ITabsCascaderProps, ICascaderState> {
  static defaultProps = {
    ...commonProps,
    title: [],
  };

  static getDerivedStateFromProps(
    nextProps: ITabsCascaderProps,
    { prevProps, open }: ICascaderState
  ) {
    const newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };

    if (prevProps.options !== nextProps.options) {
      newState.options = nextProps.options || [];
    }

    if (!open && !isEqualArrays(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value || [];
      Object.assign(newState, {
        ...newState,
        value: newValue,
        activeValue: newValue,
        activeId: newValue.length || 1,
      });
    }

    return newState;
  }

  constructor(props) {
    super(props);
    const value = props.value || [];

    this.state = {
      value,
      activeValue: value,
      activeId: value.length || 1,
      options: props.options || [],
      open: false,
      prevProps: props,
    };
  }

  onVisibleChange = (open: boolean) => {
    this.setState({
      open,
    });
  };

  onTabsChange = (activeId: number) => {
    this.setState({
      activeId,
    });
  };

  clickHandler: ICascaderHandler<Item> = (item, stage, popover) => {
    const { loadOptions, options, changeOnSelect } = this.props;
    const { activeValue } = this.state;
    const needLoading =
      item.isLeaf === false &&
      loadOptions &&
      (!item.children || item.children.length === 0);

    const newValues = activeValue.slice(0, stage - 1) as ICascaderValue[];
    newValues.push(item.value);
    const selectedOptions = arrayTreeFilter(newValues, options);
    let needClose = false;

    const obj: Partial<ICascaderState<Item>> = {
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

    const nextStage = stage + 1;
    if (!needLoading && !needClose) {
      obj.activeId = nextStage;
    }

    this.setState(obj as ICascaderState<Item>, () => {
      if (needLoading) {
        this.setState({
          loadingStage: stage,
        });
        loadOptions(selectedOptions, { action: 'next' }).then(() => {
          this.setState({
            activeId: nextStage,
            loadingStage: -1, // 标识取消 loading 状态
          });
        });
      }

      if (needTriggerChange) {
        this.props.onChange(obj.value, selectedOptions, { action: 'change' });
      }
    });
  };

  onClear = () => {
    this.setState(
      {
        value: [],
        activeValue: [],
        open: false,
      },
      () => {
        this.props.onChange(null, null, { action: 'clear' });
      }
    );
  };

  getPopoverContent = (i18n: II18nLocaleCascader) => {
    const { title, options } = this.props;
    const { activeValue, loadingStage, activeId } = this.state;

    return (
      <PopoverContent>
        <TabsContent
          i18n={i18n}
          value={activeValue}
          loadingStage={loadingStage}
          clickHandler={this.clickHandler}
          activeId={activeId}
          onTabsChange={this.onTabsChange}
          title={title}
          options={options}
        />
      </PopoverContent>
    );
  };

  render() {
    const {
      className,
      popupClassName,
      placeholder,
      displayRender,
      disabled,
      clearable,
      value,
      options,
    } = this.props;
    const { open } = this.state;
    const selectedOptions = arrayTreeFilter(value, options);
    const passProps = {
      className,
      popupClassName,
      placeholder,
      displayRender,
      disabled,
      selectedOptions,
      open,
      clearable,
      value,
    };

    return (
      <CascaderTrigger
        {...passProps}
        onClear={this.onClear}
        onVisibleChange={this.onVisibleChange}
        getPopoverContent={this.getPopoverContent}
        position={Popover.Position.BottomLeft}
      />
    );
  }
}

export default TabsCascader;
