import classnames from 'classnames';
import { Component } from 'react';

import Popover from '../../popover';
import Tabs, { ITabPanelElement, ITabPanelProps } from '../../tabs';
import { II18nLocaleCascader } from '../../i18n';
import { getNodeChildren } from '../node-fns';
import {
  CascaderTabsClickHandler,
  CascaderValue,
  ICascaderBaseProps,
  ICascaderItem,
} from '../types';

const TabPanel = Tabs.TabPanel;
const withPopover = Popover.withPopover;

interface ITabsContentProps {
  // injected by withPopover
  popover: Popover;

  onClick: CascaderTabsClickHandler;
  value: CascaderValue[];
  options: ICascaderItem[];

  /**
   * 正在加载中的层级，从 1 开始计数
   */
  loadingLevel: number;

  /**
   * Starts from 1, not zero
   */
  activeId: number;
  onTabsChange: (id: number) => void;
  title: React.ReactNode[];
  i18n: II18nLocaleCascader;
  className?: string;

  renderItemContent?: ICascaderBaseProps['renderItemContent'];
  getItemTooltip?: ICascaderBaseProps['getItemTooltip'];
  renderList?: ICascaderBaseProps['renderList'];
}

function defaultRenderItemContent(node: ICascaderItem): React.ReactNode {
  return node.label;
}

function defaultGetItemTooltip(node: ICascaderItem): string {
  return node.label;
}

class TabsContent extends Component<ITabsContentProps> {
  static defaultProps = {
    renderItemContent: defaultRenderItemContent,
    getItemTooltip: defaultGetItemTooltip,
  };

  closePopup = () => this.props.popover?.close();

  renderCascaderItems(nodes: ICascaderItem[], level: number) {
    const val = this.props.value[level - 1];

    // `style` can be used to position when used with a custom virtual list renderer
    const renderItem = (node: ICascaderItem, style?: React.CSSProperties) => {
      const { value } = node;
      const cascaderItemCls = classnames('zent-cascader-v2__list-link', {
        'zent-cascader-v2__list-link--active': value === val,
      });

      return (
        <div className="zent-cascader-v2__list-item" key={value} style={style}>
          <span
            className={cascaderItemCls}
            title={this.props.getItemTooltip(node)}
            onClick={() => this.props.onClick(node, this.closePopup)}
          >
            {this.props.renderItemContent(node)}
          </span>
        </div>
      );
    };

    const { renderList } = this.props;
    return (
      <div className="zent-cascader-v2__list">
        {typeof renderList === 'function'
          ? renderList(nodes, renderItem)
          : nodes.map(node => renderItem(node))}
      </div>
    );
  }

  renderTabTitle(title: React.ReactNode, level: number) {
    const { loadingLevel } = this.props;

    if (level === loadingLevel) {
      return (
        <div className="zent-cascader-v2__loading">
          <div className="zent-cascader-v2__loading-label">{title}</div>
          <div className="zent-cascader-v2__loading-icon" />
        </div>
      );
    }

    return title;
  }

  renderPanels(i18n: II18nLocaleCascader) {
    const PanelEls: Array<
      ITabPanelElement<ITabPanelProps<string | number>>
    > = [];
    const { title, value } = this.props;
    const maxLevel = value.length + 1;

    for (
      let i = 0,
        options: ICascaderItem[] | null | undefined = this.props.options;
      i < maxLevel;
      i++, options = getNodeChildren(options, value[i - 1])
    ) {
      if (options && options.length > 0) {
        const val = value[i];
        const selectedItem = options.find(n => n.value === val);
        const tabTitle = selectedItem?.label ?? title[i] ?? i18n.title;
        const level = i + 1;

        PanelEls.push(
          <TabPanel
            tab={this.renderTabTitle(tabTitle, level)}
            id={level}
            key={`tab-${value.slice(0, i).join('-')}`}
          >
            {this.renderCascaderItems(options, level)}
          </TabPanel>
        );
      }
    }

    return PanelEls;
  }

  render() {
    const { activeId, i18n, onTabsChange } = this.props;

    return (
      <div className="zent-cascader-v2__popup-inner">
        <Tabs
          activeId={activeId}
          onChange={onTabsChange}
          type="card"
          className="zent-cascader-v2__tabs"
        >
          {this.renderPanels(i18n)}
        </Tabs>
      </div>
    );
  }
}

export default withPopover(TabsContent);
