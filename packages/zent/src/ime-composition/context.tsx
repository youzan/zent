import * as React from 'react';
import { IIMECompositionContext } from './types';

export const IMECompositionContext = React.createContext<
  IIMECompositionContext
>({
  enable: false,
});

IMECompositionContext.displayName = 'IMECompositionContext';
