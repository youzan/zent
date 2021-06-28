import { inputToRGB } from '../utils/tinycolor/format-input';

export type IHexToRgbFn = (color: string) => string;

export const hexToRGBString: IHexToRgbFn = color => {
  const { r, g, b } = inputToRGB(color);
  return `${r}, ${g}, ${b}`;
};
