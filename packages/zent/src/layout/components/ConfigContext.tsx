import { createContext } from 'react';

const LayoutConfigContext = createContext({
  rowGutter: 0,
  colGutter: 0,
});

export default LayoutConfigContext;
