import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import Popover from '../../popover';
import Icon from '../../icon';
import Checkbox from '../../checkbox';
import { recursiveNextOptions } from '../common/utils';
import {
  ICascaderHandler,
  ICascaderItem,
  ICascaderValue,
  ICascaderScrollHandler,
} from '../types';
import InfiniteScroller from '../../infinite-scroller';
import { II18nLocaleCascader } from '../../i18n';

const withPopover = Popover.withPopover;

export interface IMenuContentProps {
  className?: string;
  clickHandler: ICascaderHandler;
  value: ICascaderValue[] | Array<ICascaderValue[]>;
  options: ICascaderItem[];
  expandTrigger?: 'click' | 'hover';
  popover: Popover;
  i18n: II18nLocaleCascader;
  scrollable: boolean;
  scrollLoadMore: ICascaderScrollHandler;
  scrollHasMore: boolean;
  multiple: boolean;
  handleChecked: (item: ICascaderItem, checked: boolean) => void;
}

class MenuContent extends Component<IMenuContentProps> {
  getMenuItemIcon(item, isActive) {
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

    if (!multiple) {
      return null;
    }

    return (
      <Checkbox
        value={item.value}
        onChange={e => this.props.handleChecked(item, e.target.checked)}
        checked={item.checked}
        indeterminate={item.indeterminate}
        disabled={item.disabled}
      ></Checkbox>
    );
  }

  renderCascaderItems(
    items: ICascaderItem[],
    stage: number,
    popover,
    parent: ICascaderItem | null
  ) {
    const {
      value,
      clickHandler,
      expandTrigger,
      i18n,
      scrollLoadMore,
      scrollHasMore,
      scrollable,
      multiple,
    } = this.props;
    const hasMore = parent === null ? scrollHasMore : parent.hasMore;

    if (items.length === 0) {
      return (
        <div className="zent-cascader__menu-empty" key="menu-empty">
          {i18n.empty}
        </div>
      );
    }

    const cascaderItems = items.map(item => {
      const isActive = item.value === value[stage - 1];
      const cascaderItemCls = classnames('zent-cascader__menu-item', {
        'zent-cascader__menu-item--active': isActive,
        'zent-cascader__menu-item--disabled': item.disabled,
        'zent-cascader__menu-item--multiple': multiple,
        'zent-cascader__menu-item--leaf': item.isLeaf,
      });

      return (
        <div
          className={cascaderItemCls}
          title={item.label}
          onClick={() => clickHandler(item, stage, popover, 'click')}
          onMouseEnter={() =>
            expandTrigger === 'hover' &&
            clickHandler(item, stage, popover, 'hover')
          }
          key={item.value}
        >
          {this.renderItemCheckbox(item)}
          <span className="zent-cascader__menu-item-label">{item.label}</span>
          {this.getMenuItemIcon(item, isActive)}
        </div>
      );
    });

    return (
      <div key={stage} className="zent-cascader__menu">
        {scrollable && hasMore ? (
          <InfiniteScroller
            className="zent-cascader__menu-scroller"
            hasMore={hasMore}
            loader={
              <div className="zent-cascader__scroll-loading">
                {i18n.loading}
              </div>
            }
            loadMore={closeLoading =>
              scrollLoadMore(closeLoading, parent, stage)
            }
          >
            {cascaderItems}
          </InfiniteScroller>
        ) : (
          cascaderItems
        )}
      </div>
    );
  }

  renderPanels(popover) {
    const PanelEls = [];
    const { value } = this.props;
    let { options } = this.props;
    let stage = 1;

    PanelEls.push(this.renderCascaderItems(options, stage, popover, null));

    if (value?.length > 0 && options?.length > 0) {
      for (let i = 0; i < value.length; i++) {
        stage++;
        // 记录滚动加载的父元素
        const parent = options.find(it => it.value === value[i]);
        options = recursiveNextOptions(options, value[i] as number);

        if (options) {
          PanelEls.push(
            this.renderCascaderItems(options, stage, popover, parent)
          );
        }
      }
    }

    return PanelEls;
  }

  render() {
    const { popover } = this.props;
    return (
      <div className="zent-cascader__popup-inner zent-cascader__popup-inner-menu">
        {this.renderPanels(popover)}
      </div>
    );
  }
}

export default withPopover(
  MenuContent as React.ComponentType<IMenuContentProps>
);
