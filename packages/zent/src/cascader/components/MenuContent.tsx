import classnames from 'classnames';
import { Component } from 'react';

import Popover from '../../popover';
import Icon from '../../icon';
import Checkbox from '../../checkbox';
import { getNodeChildren, getNodeKey } from '../node-fns';
import {
  CascaderMenuClickHandler,
  ICascaderItem,
  CascaderValue,
  CascaderMenuHoverHandler,
  ICascaderBaseProps,
  CascaderItemSelectionState,
} from '../types';
import InfiniteScroller from '../../infinite-scroller';
import { II18nLocaleCascader } from '../../i18n';
import InlineLoading from '../../loading/InlineLoading';

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
  selectionMap: Map<string, CascaderItemSelectionState>;

  renderItemContent?: ICascaderBaseProps['renderItemContent'];
  getItemTooltip?: ICascaderBaseProps['getItemTooltip'];
  renderList?: ICascaderBaseProps['renderList'];

  multipleType?: 'normal' | 'checkbox';
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

function defaultRenderItemContent(node: ICascaderItem): React.ReactNode {
  return (
    <span className="zent-cascader-v2__menu-item-label">{node.label}</span>
  );
}

function defaultGetItemTooltip(node: ICascaderItem): string {
  return node.label;
}

class MenuContent extends Component<IMenuContentProps> {
  static defaultProps = {
    renderItemContent: defaultRenderItemContent,
    getItemTooltip: defaultGetItemTooltip,
  };

  render() {
    return (
      <div className="zent-cascader-v2__popup-inner zent-cascader-v2__popup-inner-menu">
        {this.renderPanels()}
      </div>
    );
  }

  closePopup = () => this.props.popover?.close();

  getMenuItemIcon(node: ICascaderItem, isActive: boolean, showCheck: boolean) {
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

    if (!hasChildren && isActive && showCheck) {
      return <Icon className="zent-cascader-v2__menu-item-icon" type="check" />;
    }

    return null;
  }

  handleClickOption(
    node: ICascaderItem,
    closePop: () => void,
    checkState: CascaderItemSelectionState | undefined
  ) {
    const { onOptionClick, multiple, multipleType, onOptionToggle } =
      this.props;
    onOptionClick(node, closePop);
    if (multiple && multipleType === 'normal') {
      const isLeafOption = node.children && node.children.length === 0;
      const checked = checkState === 'on';
      isLeafOption && onOptionToggle(node, !checked);
    }
  }

  renderCascaderItems(
    nodes: ICascaderItem[],
    level: number,
    parent: ICascaderItem | null
  ) {
    const { i18n } = this.props;
    if (!nodes || nodes?.length === 0) {
      return (
        <div className="zent-cascader-v2__menu-empty" key="menu-empty">
          {i18n.empty}
        </div>
      );
    }

    const {
      value,
      onOptionHover,
      expandTrigger,
      scrollLoad,
      loadChildrenOnScroll,
      scrollable,
      multiple,
      multipleType,
      selectionMap,
      renderItemContent,
      getItemTooltip,
      renderList,
    } = this.props;

    // `style` can be used to position when used with a custom virtual list renderer
    const renderItem = (node: ICascaderItem, style?: React.CSSProperties) => {
      let checkState: CascaderItemSelectionState | undefined;
      if (multiple) {
        checkState = selectionMap.get(getNodeKey(node));
      }
      const isActive = multiple
        ? checkState === 'on' || checkState === 'partial'
        : node.value === value[level - 1];
      const cascaderItemCls = classnames('zent-cascader-v2__menu-item', {
        'zent-cascader-v2__menu-item--active': isActive,
        'zent-cascader-v2__menu-item--disabled': node.disabled,
        'zent-cascader-v2__menu-item--multiple': multiple,
        'zent-cascader-v2__menu-item--multiple--checkbox':
          multiple && multipleType === 'checkbox',
        'zent-cascader-v2__menu-item--multiple--normal':
          multiple && multipleType === 'normal',
        'zent-cascader-v2__menu-item--leaf':
          node.children.length === 0 && !node.loadChildrenOnExpand,
      });
      const showCheck = multiple && multipleType !== 'checkbox';

      return (
        <div
          className={cascaderItemCls}
          title={getItemTooltip(node)}
          key={node.value}
          onClick={
            node.disabled
              ? undefined
              : () => this.handleClickOption(node, this.closePopup, checkState)
          }
          onMouseEnter={
            node.disabled || expandTrigger !== 'hover'
              ? undefined
              : () => onOptionHover(node)
          }
          style={style}
        >
          {multiple && multipleType === 'checkbox' && (
            <Checkbox
              value={node.value}
              onChange={e => this.props.onOptionToggle(node, e.target.checked)}
              checked={checkState === 'on'}
              indeterminate={checkState === 'partial'}
              disabled={node.disabled}
            />
          )}
          {renderItemContent(node)}
          {this.getMenuItemIcon(node, isActive, showCheck)}
        </div>
      );
    };

    const key = `menu-${value.slice(0, level - 1).join('-')}`;

    // bail out if custom list renderer is provided
    if (typeof renderList === 'function') {
      return (
        <div key={key} className="zent-cascader-v2__menu">
          {renderList(nodes, renderItem)}
        </div>
      );
    }

    const cascaderItems = nodes.map(node => renderItem(node));
    const hasMore =
      parent === null ? loadChildrenOnScroll : parent.loadChildrenOnScroll;

    return (
      <div key={key} className="zent-cascader-v2__menu">
        {scrollable && hasMore ? (
          <InfiniteScroller
            className="zent-cascader-v2__menu-scroller"
            hasMore={hasMore}
            loader={
              <InlineLoading
                iconSize={18}
                loading
                colorPreset="grey"
                icon="circle"
                iconText={i18n.loading}
                textPosition="right"
                className="zent-cascader-v2__menu-scroller-loading"
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
