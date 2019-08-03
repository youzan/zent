import * as React from 'react';
import kindOf from '../utils/kindOf';

import TabPanel from './components/TabPanel';
import { IInnerTab, ITabPanelProps } from './types';

/**
 * 从 TabPanel 中提取数据
 */
export function getTabListData<Id extends string | number = string>(
  children: React.ReactNode,
  activeId: Id
) {
  const childrenList = React.Children.toArray(children);
  const listData: Array<IInnerTab<Id>> = [];

  React.Children.forEach(childrenList, child => {
    if (React.isValidElement(child) && checkIfTabPanel(child)) {
      const {
        id,
        disabled,
        tab,
        children: panelChildren,
        onTabReady,
        className,
      } = child.props as React.PropsWithChildren<ITabPanelProps<Id>>;
      listData.push({
        title: tab || '',
        disabled: !!disabled,
        key: id,
        actived: activeId === id,
        content: panelChildren,
        onTabReady,
        className,
      });
    }
  });
  return listData;
}

export function checkIfTabPanel(rEl: React.ReactElement) {
  const type = rEl && rEl.type;
  return kindOf(type, TabPanel);
}
