import { createContext } from 'react';
import { ILayoutConfig } from './types';

export const LayoutConfigContext = createContext<ILayoutConfig>({
  rowGutter: 0,
  colGutter: 0,
});

export default LayoutConfigContext;
