import * as React from 'react';
import { Component } from 'react';
import cn from 'classnames';
import noop from 'lodash-es/noop';

import LazyMount from '../utils/component/LazyMount';
import TabPanel from './components/TabPanel';
import TabsNav from './components/Nav';
import { getTabListData } from './tabUtil';
import { IInnerTab, ITabsProps, ITab } from './types';

type ITabsInnerProps<Id extends string | number = string> = Required<
  ITabsProps<Id>
>;

export class Tabs<Id extends string | number = string> extends Component<
  ITabsProps<Id>
> {
  static defaultProps = {
    className: '',
    type: 'normal',
    activeId: '',
    size: 'normal',
    align: 'left',
    candel: false,
    canadd: false,
    onChange: noop,
    onDelete: noop,
    onAdd: noop,
  };

  static uniqueId = 0;

  static TabPanel = TabPanel;

  constructor(props: ITabsProps<Id>) {
    super(props);
    Tabs.uniqueId++;
  }

  renderNav(tabListData: Array<IInnerTab<Id>>) {
    const {
      type,
      align,
      canadd,
      candel,
      size,
      navExtraContent,
      onChange,
      onAdd,
      onDelete,
    } = this.props as ITabsInnerProps<Id>;
    if (tabListData && tabListData.length) {
      return (
        <TabsNav
          onChange={onChange}
          tabListData={tabListData}
          type={type}
          align={align}
          size={size}
          onDelete={onDelete}
          onAdd={onAdd}
          canadd={canadd}
          candel={candel}
          navExtraContent={navExtraContent}
          uniqueId={Tabs.uniqueId}
        />
      );
    }

    return null;
  }

  renderTabPanel(tabListData: Array<IInnerTab<Id>>) {
    const newChildren: React.ReactNode[] = [];
    const hasData = !!(tabListData && tabListData.length);

    if (!hasData) {
      return null;
    }

    return tabListData.map(tabItem => {
      newChildren.push(
        <LazyMount mount={tabItem.actived} key={tabItem.key}>
          <TabPanel
            tab={tabItem.title}
            actived={tabItem.actived}
            onTabReady={tabItem.onTabReady}
            className={tabItem.className}
            id={tabItem.key}
            uniqueId={Tabs.uniqueId}
          >
            {tabItem.content}
          </TabPanel>
        </LazyMount>
      );
    });
  }

  /**
   * 带 TabPanel children 的渲染方式
   */
  renderWithPanel() {
    const { className, children, activeId } = this.props;

    const tabPanelDataList = getTabListData(children, activeId);
    const tabsCls = cn('zent-tabs', className);

    return (
      <div className={tabsCls}>
        {this.renderNav(tabPanelDataList)}
        <div className="zent-tabs-panewrap">
          {this.renderTabPanel(tabPanelDataList)}
        </div>
      </div>
    );
  }

  /**
   * 使用 tabs props 的渲染方式
   */
  renderWithoutPanel() {
    const { tabs, className, activeId } = this.props;

    const tabsCls = cn('zent-tabs', className);

    return (
      <div className={tabsCls}>
        {this.renderNav(
          (tabs as Array<ITab<Id>>).map<IInnerTab<Id>>(tab => ({
            ...tab,
            actived: tab.key === activeId,
          }))
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

export default Tabs;
