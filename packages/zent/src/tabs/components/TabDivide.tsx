import * as React from 'react';
import { IVerticalDivide } from '../types';

function TabDivide(props: React.PropsWithChildren<Partial<IVerticalDivide>>) {
  return null;
}

TabDivide.defaultProps = {
  divide: true,
};

export default TabDivide;
