import * as React from 'react';
import kindOf from '../utils/kindOf';

import TabPanel from './components/TabPanel';

/**
 * 从tabpanel中提取数据，数据格式为
 * {
 *   title: 'xxx',
 *   disabled: false,
 *   key: 'xx',
 *   actived: false,
 *   content: ReactElement,
 *   panelClassName: 'xxx',
 *   tabClassName: 'xxx',
 *   onTabReady: func
 * }
 */

const tabUtil = {
  getTabListData(children, activeId) {
    const childrenList = React.Children.toArray(children);
    const listData = [];
    React.Children.forEach(childrenList, child => {
      if (this.checkIfTabPanel(child)) {
        const {
          id,
          disabled,
          tab,
          children: panelChildren,
          onTabReady,
          panelClassName,
          tabClassName,
        } = (child as any).props;
        listData.push({
          title: tab || '',
          disabled: !!disabled,
          key: id,
          actived: activeId === id,
          content: panelChildren,
          panelClassName,
          tabClassName,
          onTabReady,
        });
      }
    });
    this.listData = listData;
    return listData;
  },

  checkIfTabPanel(rEl) {
    const type = rEl && rEl.type;
    return kindOf(type, TabPanel);
  },
};

export default tabUtil;
