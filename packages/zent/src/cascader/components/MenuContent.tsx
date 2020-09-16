import * as React from 'react';
import classnames from 'classnames';

import Popover from '../../popover';
import Icon from '../../icon';
import Checkbox from '../../checkbox';
import { getNodeChildren, getNodeKey } from '../node-fns';
import {
  CascaderMenuClickHandler,
  ICascaderItem,
  CascaderValue,
  CascaderMenuHoverHandler,
} from '../types';
import InfiniteScroller from '../../infinite-scroller';
import { II18nLocaleCascader } from '../../i18n';
import BlockLoading from '../../loading/BlockLoading';

const withPopover = Popover.withPopover;

export interface IMenuContentCommonProps {
  // injected by withPopover
  popover: Popover;

  options: ICascaderItem[];
  expandTrigger?: 'click' | 'hover';
  i18n: II18nLocaleCascader;
  scrollable: boolean;
  scrollLoad: (parent: ICascaderItem | null) => Promise<void>;
  loadChildrenOnScroll: boolean;
  onOptionToggle: (node: ICascaderItem, checked: boolean) => void;
  onOptionHover: CascaderMenuHoverHandler;
  onOptionClick: CascaderMenuClickHandler;
  className?: string;

  loading: string[];

  // 节点选中状态
  selectionMap: Map<string, 'on' | 'off' | 'partial'>;
}

export interface IMenuContentMultipleProps extends IMenuContentCommonProps {
  multiple: true;
  value: Array<CascaderValue[]>;
}

export interface IMenuContentSingleProps extends IMenuContentCommonProps {
  multiple: false;
  value: CascaderValue[];
}

export type IMenuContentProps =
  | IMenuContentMultipleProps
  | IMenuContentSingleProps;

class MenuContent extends React.Component<IMenuContentProps> {
  render() {
    return (
      <div className="zent-cascader-v2__popup-inner zent-cascader-v2__popup-inner-menu">
        {this.renderPanels()}
      </div>
    );
  }

  closePopup = () => this.props.popover?.close();

  getMenuItemIcon(node: ICascaderItem, isActive: boolean) {
    const { loading } = this.props;

    if (node.loadChildrenOnExpand) {
      const nodeKey = getNodeKey(node);
      if (loading.indexOf(nodeKey) !== -1 && isActive) {
        return <i className="zent-cascader-v2__menu-item-loading zenticon" />;
      }
    }

    // 有 children 或者需要加载 children 的时候说明非叶子节点
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren || node.loadChildrenOnExpand) {
      return <Icon className="zent-cascader-v2__menu-item-icon" type="right" />;
    }

    return null;
  }

  renderCascaderItems(
    path: ICascaderItem[],
    level: number,
    parent: ICascaderItem | null
  ) {
    const { i18n } = this.props;
    if (!path || path?.length === 0) {
      return (
        <div className="zent-cascader-v2__menu-empty" key="menu-empty">
          {i18n.empty}
        </div>
      );
    }

    const {
      value,
      onOptionClick,
      onOptionHover,
      expandTrigger,
      scrollLoad,
      loadChildrenOnScroll,
      scrollable,
      multiple,
      selectionMap,
    } = this.props;

    const hasMore =
      parent === null ? loadChildrenOnScroll : parent.loadChildrenOnScroll;
    const cascaderItems = path.map(node => {
      const isActive = node.value === value[level - 1];
      const cascaderItemCls = classnames('zent-cascader-v2__menu-item', {
        'zent-cascader-v2__menu-item--active': isActive,
        'zent-cascader-v2__menu-item--disabled': node.disabled,
        'zent-cascader-v2__menu-item--multiple': multiple,
        'zent-cascader-v2__menu-item--leaf':
          node.children.length === 0 && !node.loadChildrenOnExpand,
      });

      let checkState: 'on' | 'off' | 'partial' | undefined;
      if (multiple) {
        checkState = selectionMap.get(getNodeKey(node));
      }

      return (
        <div
          className={cascaderItemCls}
          title={node.label}
          key={node.value}
          onClick={
            node.disabled
              ? undefined
              : () => onOptionClick(node, this.closePopup)
          }
          onMouseEnter={
            node.disabled || expandTrigger !== 'hover'
              ? undefined
              : () => onOptionHover(node)
          }
        >
          {multiple && (
            <Checkbox
              value={node.value}
              onChange={e => this.props.onOptionToggle(node, e.target.checked)}
              checked={checkState === 'on'}
              indeterminate={checkState === 'partial'}
              disabled={node.disabled}
            />
          )}
          <span className="zent-cascader-v2__menu-item-label">
            {node.label}
          </span>
          {this.getMenuItemIcon(node, isActive)}
        </div>
      );
    });

    return (
      <div
        key={`menu-${value.slice(0, level - 1).join('-')}`}
        className="zent-cascader-v2__menu"
      >
        {scrollable && hasMore ? (
          <InfiniteScroller
            className="zent-cascader-v2__menu-scroller"
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
            loadMore={() => scrollLoad(parent)}
            skipLoadOnMount
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
        options = getNodeChildren(options, value[i]);

        if (options.length > 0) {
          PanelEls.push(this.renderCascaderItems(options, level, parent));
        }
      }
    }

    return PanelEls;
  }
}

export default withPopover(MenuContent);
