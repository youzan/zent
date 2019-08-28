import * as React from 'react';
import { Component } from 'react';

import { IBaseTabsProps } from '../../types';
import { NonUndefined } from 'utility-types';

abstract class BaseTabs<
  Id,
  InnerTab,
  TabPanelProps,
  TabsProps extends IBaseTabsProps<Id, TabPanelProps>
> extends Component<TabsProps> {
  abstract get tabsCls(): string;

  abstract getTabDataListFromTabs(
    tabs: NonUndefined<TabsProps['tabs']>
  ): InnerTab[];

  abstract getTabDataListFromChildren(
    children: NonUndefined<TabsProps['children']>
  ): InnerTab[];

  abstract renderNav(tabDataList: InnerTab[]): React.ReactNode;

  abstract renderTabPanel(tabDataList: InnerTab): React.ReactNode;

  /**
   * 渲染 TabPanel
   */
  renderTabPanels(tabDataList: InnerTab[]): React.ReactNode {
    const hasData = !!(tabDataList && tabDataList.length);

    if (!hasData) {
      return null;
    }

    return tabDataList.map(this.renderTabPanel);
  }

  /**
   * 带 TabPanel children 的渲染方式
   */
  renderWithPanel() {
    const { children } = this.props;

    const tabDataList = this.getTabDataListFromChildren(
      children as NonUndefined<TabsProps['children']>
    );

    return (
      <div className={this.tabsCls}>
        {this.renderNav(tabDataList)}
        <div className="zent-tabs-panel-wrapper">
          {this.renderTabPanels(tabDataList)}
        </div>
      </div>
    );
  }

  /**
   * 使用 tabs props 的渲染方式
   */
  renderWithoutPanel() {
    const { tabs } = this.props;

    return (
      <div className={this.tabsCls}>
        {this.renderNav(
          this.getTabDataListFromTabs(tabs as NonUndefined<TabsProps['tabs']>)
        )}
      </div>
    );
  }

  render() {
    const { tabs } = this.props;
    if (tabs) {
      return this.renderWithoutPanel();
    }
    return this.renderWithPanel();
  }
}

export default BaseTabs;
