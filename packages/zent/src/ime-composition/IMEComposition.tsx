import * as React from 'react';

import { IIMECompositionProps } from './types';
import { IMECompositionContext } from './context';

export const IMEComposition: React.FunctionComponent<IIMECompositionProps> = ({
  enable = true,
  children,
}) => {
  const ctx = React.useMemo(
    () => ({
      enable,
    }),
    [enable]
  );

  return (
    <IMECompositionContext.Provider value={ctx}>
      {children}
    </IMECompositionContext.Provider>
  );
};
