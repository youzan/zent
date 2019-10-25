import * as React from 'react';
import { isElement } from 'react-is';
import cn from 'classnames';
import noop from 'lodash-es/noop';
import isNil from 'lodash-es/isNil';

import LazyMount from '../utils/component/LazyMount';
import TabPanel from './components/TabPanel';
import {
  IInnerTab,
  ITabsProps,
  ITabPanelProps,
  TabType,
  ITabsNavProps,
  ITab,
} from './types';
import NormalTabsNav from './components/tabs-nav/NormalTabsNav';
import CardTabsNav from './components/tabs-nav/CardTabsNav';
import ButtonTabsNav from './components/tabs-nav/ButtonTabsNav';
import BaseTabs from './components/base/BaseTabs';
import { getTabDataFromChild } from './utils';

const TabsNavComponents: {
  [type in TabType]?: React.ComponentType<ITabsNavProps<any>>;
} = {
  normal: NormalTabsNav,
  card: CardTabsNav,
  button: ButtonTabsNav,
};

type ITabsInnerProps<Id extends string | number = string> = Required<
  ITabsProps<Id>
>;

export class Tabs<Id extends string | number = string> extends BaseTabs<
  Id,
  IInnerTab<Id>,
  ITabPanelProps<Id>,
  ITabsProps<Id>
> {
  static TabPanel = TabPanel;

  static defaultProps: Partial<ITabsProps<string>> = {
    type: 'normal',
    activeId: '',
    candel: false,
    stretch: false,
    onChange: noop,
    onDelete: noop,
    unmountPanelOnHide: false,
  };

  get tabsCls() {
    const { className, type } = this.props;
    return cn('zent-tabs', `zent-tabs-type__${type}`, className);
  }

  getTabDataListFromTabs(
    tabs: NonNullable<Array<ITab<Id>>>
  ): Array<IInnerTab<Id>> {
    const { activeId } = this.props;

    return tabs.map<IInnerTab<Id>>(tab => ({
      ...tab,
      actived: tab.key === activeId,
    }));
  }

  getTabDataListFromChildren(
    children: NonNullable<ITabsProps<Id>['children']>
  ): Array<IInnerTab<Id>> {
    const { activeId } = this.props;

    return React.Children.map(
      children,
      (
        child: React.ReactElement<React.PropsWithChildren<ITabPanelProps<Id>>>
      ) => {
        if (!isElement(child)) {
          return null;
        }
        return getTabDataFromChild(child, activeId);
      }
    ).filter(v => !isNil(v));
  }

  renderNav(tabDataList: Array<IInnerTab<Id>>) {
    const { type, candel, stretch, navExtraContent, onChange, onDelete } = this
      .props as ITabsInnerProps<Id>;

    const TabsNavComp = (TabsNavComponents[type] ||
      TabsNavComponents['normal']) as React.ComponentClass<ITabsNavProps<Id>>;

    return (
      <TabsNavComp
        onChange={onChange}
        tabDataList={tabDataList}
        onDelete={onDelete}
        candel={candel}
        stretch={stretch}
        navExtraContent={navExtraContent}
      />
    );
  }

  renderTabPanel(tabItem: IInnerTab<Id>) {
    const { unmountPanelOnHide } = this.props;
    return (
      <LazyMount mount={tabItem.actived} key={tabItem.key}>
        <TabPanel
          tab={tabItem.title}
          actived={tabItem.actived}
          unmountOnHide={tabItem.unmountOnHide || unmountPanelOnHide}
          className={tabItem.className}
          id={tabItem.key}
        >
          {tabItem.panelChildren}
        </TabPanel>
      </LazyMount>
    );
  }
}

export default Tabs;
