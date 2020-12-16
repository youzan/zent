import { LoadingTextPosition } from './position';
import { LoadingColorPreset } from '../../props';

export interface IIconProps {
  colorPreset: LoadingColorPreset;
  size?: number;
  text: React.ReactNode;
  textPosition: LoadingTextPosition;
}
