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
          {tabDataList.map(this.renderTabPanel.bind(this))}
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
    const { tabs, children } = this.props;

    if (!tabs && !children) {
      throw new Error(
        `Tabs Componment must receive one prop of 'tabs' and 'children'`
      );
    }

    if (tabs) {
      return this.renderWithoutPanel();
    }
    return this.renderWithPanel();
  }
}

export default BaseTabs;
