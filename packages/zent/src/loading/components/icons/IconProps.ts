import * as React from 'react';
import { LoadingTextPosition } from './position';

export interface IIconProps {
  size?: number;
  text: React.ReactNode;
  textPosition: LoadingTextPosition;
}
