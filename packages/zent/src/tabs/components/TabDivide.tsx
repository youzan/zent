import * as React from 'react';
import { IVerticalDivide } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TabDivide(props: React.PropsWithChildren<Partial<IVerticalDivide>>) {
  return null;
}

TabDivide.defaultProps = {
  divide: true,
};

export default TabDivide;
