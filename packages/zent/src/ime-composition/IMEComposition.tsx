import { FC, PropsWithChildren, useMemo } from 'react';

import { IIMECompositionProps } from './types';
import { IMECompositionContext } from './context';

export const IMEComposition: FC<PropsWithChildren<IIMECompositionProps>> = ({
  enable = true,
  children,
}) => {
  const ctx = useMemo(
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
