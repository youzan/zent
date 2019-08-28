import * as React from 'react';
import { IVerticalTabPanelProps } from '../../types';
import TabPanel from './TabPanel';

function VerticalTabPanel<Id>(
  props: React.PropsWithChildren<IVerticalTabPanelProps<Id>>
) {
  if ('divide' in props) {
    return null;
  }

  return <TabPanel {...props} />;
}

export default VerticalTabPanel;
