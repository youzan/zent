import * as React from 'react';
import cn from 'classnames';
import { ITabPanelProps } from '../types';

function TabPanel<Id>(props: React.PropsWithChildren<ITabPanelProps<Id>>) {
  const { actived, className, unmountOnHide, children } = props;

  // 启用 unmountOnHide 时，非 active 元素不渲染，直接返回 null
  if (!actived && unmountOnHide) {
    return null;
  }

  const displayStyle: React.CSSProperties = actived ? {} : { display: 'none' };

  const panelCls = cn('zent-tabs-panel', className);
  return (
    <div role="tabpanel" style={displayStyle} className={panelCls}>
      {children}
    </div>
  );
}

export default TabPanel;
