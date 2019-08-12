import * as React from 'react';
import cn from 'classnames';
import { ITabPanelProps } from '../types';

function TabPanel<Id extends string | number = string>(
  props: React.PropsWithChildren<ITabPanelProps<Id>>
) {
  const { actived = false, className, children, id, onTabReady } = props;

  React.useEffect(() => {
    onTabReady && onTabReady(id);
  });

  if (!actived) {
    return null;
  }

  const panelCls = cn('zent-tab-tabpanel', className);
  return (
    <div role="tabpanel" className={panelCls}>
      {children}
    </div>
  );
}

export default TabPanel;
