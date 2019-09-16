import * as React from 'react';
import cn from 'classnames';
import { ITabPanelProps } from '../types';

function TabPanel<Id>(props: React.PropsWithChildren<ITabPanelProps<Id>>) {
  const { actived, className, children } = props;

  if (!actived) {
    return null;
  }

  const panelCls = cn('zent-tabs-panel', className);
  return (
    <div role="tabpanel" className={panelCls}>
      {children}
    </div>
  );
}

export default TabPanel;
