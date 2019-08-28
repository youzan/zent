import * as React from 'react';
import cn from 'classnames';
import noop from 'lodash-es/noop';

import LazyMount from '../utils/component/LazyMount';
import {
  IVerticalInnerTab,
  IVerticalTabPanelProps,
  IVerticalTabsProps,
  IVerticalTab,
  ITabPanelProps,
} from './types';
import VerticalTabsNav from './components/tabs-nav/VerticalTabsNav';
import BaseTabs from './components/base/BaseTabs';
import { getTabDataFromChild } from './utils';
import VerticalTabPanel from './components/panel/VerticalTabPanel';

export class VerticalTabs<Id extends string | number = string> extends BaseTabs<
  Id,
  IVerticalInnerTab<Id>,
  IVerticalTabPanelProps<Id>,
  IVerticalTabsProps<Id>
> {
  static TabPanel = VerticalTabPanel;

  static defaultProps: Partial<IVerticalTabsProps<string>> = {
    activeId: '',
    onChange: noop,
  };

  get tabsCls() {
    const { className } = this.props;
    return cn('zent-tabs', `zent-tabs-type__vertical`, className);
  }

  getTabDataListFromTabs(
    tabs: NonNullable<Array<IVerticalTab<Id>>>
  ): Array<IVerticalInnerTab<Id>> {
    const { activeId } = this.props;

    return tabs.map<IVerticalInnerTab<Id>>(tab => {
      if ('divide' in tab) {
        return tab;
      } else {
        return {
          ...tab,
          actived: tab.key === activeId,
        };
      }
    });
  }

  getTabDataListFromChildren(
    children: NonNullable<IVerticalTabsProps<Id>['children']>
  ): Array<IVerticalInnerTab<Id>> {
    const { activeId } = this.props;

    return React.Children.map(
      children,
      (
        child: React.ReactElement<
          React.PropsWithChildren<IVerticalTabPanelProps<Id>>
        >
      ) => {
        if ('divide' in child.props) {
          return { divide: true };
        }
        return getTabDataFromChild(
          child as React.ReactElement<
            React.PropsWithChildren<ITabPanelProps<Id>>
          >,
          activeId
        );
      }
    );
  }

  renderNav(tabDataList: Array<IVerticalInnerTab<Id>>) {
    const { onChange, maxHeight } = this.props;

    return (
      <VerticalTabsNav
        maxHeight={maxHeight}
        onChange={onChange}
        tabDataList={tabDataList}
      />
    );
  }

  renderTabPanel(tabItem: IVerticalInnerTab<Id>) {
    if ('divide' in tabItem) {
      return null;
    }
    return (
      <LazyMount mount={tabItem.actived} key={tabItem.key}>
        <VerticalTabPanel
          tab={tabItem.title}
          actived={tabItem.actived}
          className={tabItem.className}
          id={tabItem.key}
        >
          {tabItem.panelChildren}
        </VerticalTabPanel>
      </LazyMount>
    );
  }
}

export default VerticalTabs;
