import { createContext } from 'react';
import { IIMECompositionContext } from './types';

export const IMECompositionContext = createContext<IIMECompositionContext>({
  enable: false,
});

IMECompositionContext.displayName = 'IMECompositionContext';
