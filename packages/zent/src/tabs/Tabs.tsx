import * as React from 'react';
import { Component } from 'react';
import cn from 'classnames';
import noop from 'lodash-es/noop';

import LazyMount from '../utils/component/LazyMount';
import TabPanel from './components/TabPanel';
import NormalTabsNav from './components/normal/TabsNav';
import {
  IInnerTab,
  ITabsProps,
  ITabPanelProps,
  TabType,
  ITabsNavProps,
} from './types';
import CardTabsNav from './components/card/TabsNav';
import ButtonTabsNav from './components/button/TabsNav';
import VerticalTabsNav from './components/vertical/TabsNav';

const TabsNavComponents: {
  [type in TabType]?: React.ComponentType<ITabsNavProps>;
} = {
  normal: NormalTabsNav,
  card: CardTabsNav,
  button: ButtonTabsNav,
  vertical: VerticalTabsNav,
};

type ITabsInnerProps<Id extends string | number = string> = Required<
  ITabsProps<Id>
>;

export class Tabs<Id extends string | number = string> extends Component<
  ITabsProps<Id>
> {
  static TabPanel = TabPanel;

  static defaultProps: Partial<ITabsProps> = {
    type: 'normal',
    activeId: '',
    align: 'left',
    candel: false,
    canadd: false,
    onChange: noop,
    onDelete: noop,
    onAdd: noop,
  };

  get tabsCls() {
    const { className, type } = this.props;
    return cn('zent-tabs', `zent-tabs-type__${type}`, className);
  }

  renderNav(tabListData: Array<IInnerTab<Id>>) {
    const {
      type,
      align,
      canadd,
      candel,
      navExtraContent,
      onChange,
      onAdd,
      onDelete,
    } = this.props as ITabsInnerProps<Id>;
    const TabsNavComp = (TabsNavComponents[type] ||
      TabsNavComponents.normal) as React.ComponentClass<ITabsNavProps<Id>>;
    if (!TabsNavComp) {
      return null;
    }
    return (
      <TabsNavComp
        onChange={onChange}
        tabListData={tabListData}
        align={align}
        onDelete={onDelete}
        onAdd={onAdd}
        canadd={canadd}
        candel={candel}
        navExtraContent={navExtraContent}
      />
    );
  }

  renderTabPanel(tabListData: Array<IInnerTab<Id>>) {
    const hasData = !!(tabListData && tabListData.length);

    if (!hasData) {
      return null;
    }

    return tabListData.map(tabItem => {
      return (
        <LazyMount mount={tabItem.actived} key={tabItem.key}>
          <TabPanel
            tab={tabItem.title}
            actived={tabItem.actived}
            className={tabItem.className}
            id={tabItem.key}
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
    const { children, activeId } = this.props;

    const tabPanelDataList = React.Children.map(
      children,
      (
        child: React.ReactElement<React.PropsWithChildren<ITabPanelProps<Id>>>
      ) => {
        const {
          id,
          disabled,
          tab,
          children: panelChildren,
          className: panelClassName,
        } = child.props;
        const props: IInnerTab<Id> = {
          title: tab,
          disabled,
          key: id,
          actived: activeId === id,
          content: panelChildren,
          className: panelClassName,
        };

        return props;
      }
    );

    return (
      <div className={this.tabsCls}>
        {this.renderNav(tabPanelDataList)}
        <div className="zent-tabs-panel-wrapper">
          {this.renderTabPanel(tabPanelDataList)}
        </div>
      </div>
    );
  }

  /**
   * 使用 tabs props 的渲染方式
   */
  renderWithoutPanel() {
    const { tabs, activeId } = this.props;

    return (
      <div className={this.tabsCls}>
        {this.renderNav(
          tabs.map<IInnerTab<Id>>(tab => ({
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
