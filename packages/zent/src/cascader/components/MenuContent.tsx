import * as React from 'react';
import classnames from 'classnames';

import Popover from '../../popover';
import Icon from '../../icon';
import Checkbox from '../../checkbox';
import { findNextOptions } from '../utils';
import {
  CascaderHandler,
  ICascaderItem,
  CascaderValue,
  CascaderScrollHandler,
} from '../types';
import InfiniteScroller from '../../infinite-scroller';
import { II18nLocaleCascader } from '../../i18n';
import BlockLoading from '../../loading/BlockLoading';

const withPopover = Popover.withPopover;

export interface IMenuContentProps {
  // injected by withPopover
  popover: Popover;

  className?: string;
  onClick: CascaderHandler;
  value: CascaderValue[] | Array<CascaderValue[]>;
  options: ICascaderItem[];
  expandTrigger?: 'click' | 'hover';
  i18n: II18nLocaleCascader;
  scrollable: boolean;
  scrollLoad: CascaderScrollHandler;
  firstLevelHasMore: boolean;
  multiple: boolean;
  handleChecked: (item: ICascaderItem, checked: boolean) => void;
}

class MenuContent extends React.Component<IMenuContentProps> {
  closePopup = () => this.props.popover?.close();

  getMenuItemIcon(item: ICascaderItem, isActive: boolean) {
    if (item.children || item.isLeaf === false) {
      if (item.loading && isActive) {
        return <i className="zent-cascader__menu-item-loading zenticon" />;
      }

      return <Icon className="zent-cascader__menu-item-icon" type="right" />;
    }

    return null;
  }

  renderItemCheckbox(item: ICascaderItem) {
    const { multiple } = this.props;
    const { value, checked, indeterminate, disabled } = item;

    if (!multiple) {
      return null;
    }

    return (
      <Checkbox
        value={value}
        onChange={e => this.props.handleChecked(item, e.target.checked)}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
      ></Checkbox>
    );
  }

  renderCascaderItems(
    items: ICascaderItem[],
    level: number,
    parent: ICascaderItem | null
  ) {
    const { i18n } = this.props;
    if (!items || items?.length === 0) {
      return (
        <div className="zent-cascader__menu-empty" key="menu-empty">
          {i18n.empty}
        </div>
      );
    }

    const {
      value,
      onClick: clickHandler,
      expandTrigger,
      scrollLoad,
      firstLevelHasMore,
      scrollable,
      multiple,
    } = this.props;

    const hasMore = parent === null ? firstLevelHasMore : parent.hasMore;
    const cascaderItems = items.map(item => {
      const isActive = item.value === value[level - 1];
      const cascaderItemCls = classnames('zent-cascader__menu-item', {
        'zent-cascader__menu-item--active': isActive,
        'zent-cascader__menu-item--disabled': item.disabled,
        'zent-cascader__menu-item--multiple': multiple,
        'zent-cascader__menu-item--leaf': item.isLeaf,
      });
      const menuItemProps = item.disabled
        ? {}
        : {
            onClick: () => clickHandler(item, level, this.closePopup, 'click'),
            onMouseEnter: () =>
              expandTrigger === 'hover' &&
              clickHandler(item, level, this.closePopup, 'hover'),
          };

      return (
        <div
          className={cascaderItemCls}
          title={item.label}
          key={item.value}
          {...menuItemProps}
        >
          {this.renderItemCheckbox(item)}
          <span className="zent-cascader__menu-item-label">{item.label}</span>
          {this.getMenuItemIcon(item, isActive)}
        </div>
      );
    });

    return (
      <div
        key={`menu-${value.slice(0, level - 1).join('-')}`}
        className="zent-cascader__menu"
      >
        {scrollable && hasMore ? (
          <InfiniteScroller
            className="zent-cascader__menu-scroller"
            hasMore={hasMore}
            loader={
              <BlockLoading
                height={32}
                iconSize={18}
                loading
                colorPreset="grey"
                icon="circle"
              />
            }
            loadMore={() => scrollLoad(parent, level)}
          >
            {cascaderItems}
          </InfiniteScroller>
        ) : (
          cascaderItems
        )}
      </div>
    );
  }

  renderPanels() {
    const PanelEls = [];
    const { value } = this.props;
    let { options } = this.props;
    let level = 1;

    PanelEls.push(this.renderCascaderItems(options, level, null));

    if (value?.length > 0 && options?.length > 0) {
      for (let i = 0; i < value.length; i++) {
        level++;
        // 记录滚动加载的父元素
        const parent = options.find(it => it.value === value[i]);
        options = findNextOptions(options, value[i]);

        if (options) {
          PanelEls.push(this.renderCascaderItems(options, level, parent));
        }
      }
    }

    return PanelEls;
  }

  render() {
    return (
      <div className="zent-cascader__popup-inner zent-cascader__popup-inner-menu">
        {this.renderPanels()}
      </div>
    );
  }
}

export default withPopover(MenuContent);
