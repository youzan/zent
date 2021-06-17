import tinycolor from '../utils/tinycolor';
import { rgbToHex } from '../utils/tinycolor/conversion';
import { inputToRGB } from '../utils/tinycolor/format-input';

const saturationBaseLightStep = 0.15;
const saturationAdditiveLightStep = 0.06;
const saturationDarkStep = 0;
const brightnessLightStep = 0.1;
const brightnessDarkStep = 0.15;

interface IHsvObject {
  h: number;
  s: number;
  v: number;
}

interface IRgbObject {
  r: number;
  g: number;
  b: number;
}

export function toHex({ r, g, b }: IRgbObject): string {
  return `#${rgbToHex(r, g, b, false)}`;
}

function getLightSaturation(hsv: IHsvObject, level: number): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation: number;

  const additiveLightSaturation =
    (level * saturationAdditiveLightStep * (level - 1)) / 2;

  saturation =
    hsv.s - saturationBaseLightStep * level - additiveLightSaturation;

  if (saturation < 0.1) {
    saturation = 0.1;
  }

  return Number(saturation.toFixed(2));
}

function getDarkSaturation(hsv: IHsvObject, level: number): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation: number;
  saturation = hsv.s + saturationDarkStep * level;

  if (saturation > 1) {
    saturation = 1;
  }
  return Number(saturation.toFixed(2));
}

function getLightValue(hsv: IHsvObject, level: number): number {
  let value: number;
  value = hsv.v + brightnessLightStep * (level - 1);

  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

function getDarkValue(hsv: IHsvObject, level: number): number {
  let value: number;
  value = hsv.v - brightnessDarkStep * level;

  if (value < 0.1) {
    value = 0.1;
  }

  return Number(value.toFixed(2));
}

export function generate(hex: string): string[] {
  const patterns: string[] = [];
  const color = tinycolor(hex);
  const hsv = color.toHsv();
  const lingterColors = [1, 4];

  lingterColors.forEach(item => {
    const currentRgb = inputToRGB({
      h: hsv.h,
      s: getLightSaturation(hsv, item),
      v: getLightValue(hsv, item),
    });
    patterns.unshift(
      toHex({ r: currentRgb.r, g: currentRgb.g, b: currentRgb.b })
    );
  });

  patterns.push(toHex(color));

  const darkRgb = inputToRGB({
    h: hsv.h,
    s: getDarkSaturation(hsv, 1),
    v: getDarkValue(hsv, 1),
  });

  patterns.push(toHex({ r: darkRgb.r, g: darkRgb.g, b: darkRgb.b }));
  return patterns;
}
