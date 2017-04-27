import React from 'react';
import TabPanel from './components/TabPanel/TabPanel';

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
    let childrenList = React.Children.toArray(children);
    let listData = [];
    React.Children.forEach(childrenList, child => {
      if (this.checkIfTabPanel(child)) {
        let {
          id,
          disabled,
          tab,
          children: panelChildren,
          onTabReady,
          panelClassName,
          tabClassName
        } = child.props;
        listData.push({
          title: tab || '',
          disabled: !!disabled,
          key: id,
          actived: activeId === id,
          content: panelChildren,
          panelClassName,
          tabClassName,
          onTabReady
        });
      }
    });
    this.listData = listData;
    return listData;
  },

  checkIfTabPanel(rEl) {
    return rEl.type && rEl.type === TabPanel;
  }
};

export default tabUtil;
