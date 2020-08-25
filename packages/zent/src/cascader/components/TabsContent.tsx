import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import Popover from '../../popover';
import Tabs, { ITabPanelElement, ITabPanelProps } from '../../tabs';
import { findNextOptions } from '../common/utils';
import { CascaderHandler, CascaderValue, ICascaderItem } from '../types';
import { II18nLocaleCascader } from '../../i18n';

const TabPanel = Tabs.TabPanel;
const withPopover = Popover.withPopover;

interface ITabsContentProps {
  className?: string;
  clickHandler: CascaderHandler;
  value: CascaderValue[];
  options: ICascaderItem[];
  // 正在加载中的层级，从 1 开始计数
  loadingLevel: number;
  popover: Popover;
  activeId: number;
  onTabsChange: (id: number) => void;
  title: React.ReactNode[];
  i18n: II18nLocaleCascader;
}

class TabsContent extends Component<ITabsContentProps> {
  renderCascaderItems(items: ICascaderItem[], level: number, popover: Popover) {
    const { value, clickHandler } = this.props;

    const cascaderItems = items.map(item => {
      const cascaderItemCls = classnames('zent-cascader__list-link', {
        'zent-cascader__list-link--active': item.value === value[level - 1],
      });

      return (
        <div className="zent-cascader__list-item" key={item.value}>
          <span
            className={cascaderItemCls}
            title={item.label}
            onClick={() => clickHandler(item, level, popover)}
          >
            {item.label}
          </span>
        </div>
      );
    });

    return <div className="zent-cascader__list">{cascaderItems}</div>;
  }

  renderTabTitle(title: React.ReactNode, level: number) {
    const { loadingLevel } = this.props;

    if (level === loadingLevel) {
      return (
        <div className="zent-cascader__loading">
          <div className="zent-cascader__loading-label">{title}</div>
          <div className="zent-cascader__loading-icon" />
        </div>
      );
    }

    return title;
  }

  renderPanels(popover: Popover, i18n: II18nLocaleCascader) {
    const PanelEls: Array<ITabPanelElement<
      ITabPanelProps<string | number>
    >> = [];
    let { title, options, value } = this.props;
    const length = value?.length || 0;

    for (let i = 0; i < length + 1; i++) {
      const level = i + 1;

      // 获取子节点列表
      if (i > 0) {
        options = findNextOptions(options, value[i - 1]);
      }

      if (options?.length > 0) {
        const selectedItem = options.find(item => item.value === value[i]);
        const tabTitle = selectedItem?.label || title[i] || i18n.title;

        PanelEls.push(
          <TabPanel
            tab={this.renderTabTitle(tabTitle, level)}
            id={level}
            key={`tab-${value.slice(0, level - 1).join('-')}`}
          >
            {this.renderCascaderItems(options, level, popover)}
          </TabPanel>
        );
      }
    }

    return PanelEls;
  }

  render() {
    const { activeId, popover, i18n, onTabsChange } = this.props;

    return (
      <div className="zent-cascader__popup-inner">
        <Tabs
          activeId={activeId}
          onChange={onTabsChange}
          type="card"
          className="zent-cascader__tabs"
        >
          {this.renderPanels(popover, i18n)}
        </Tabs>
      </div>
    );
  }
}

export default withPopover(
  TabsContent as React.ComponentType<ITabsContentProps>
);
