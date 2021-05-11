import { rgbToHsv, rgbToHex, inputToRGB } from '@ctrl/tinycolor';

const saturationLightStep = 0.15;
const saturationDrakStep = 0;
const brightnessLightStep = 0;
const brightnessDrakStep = 0.12;

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

interface IColors {
  default: string;
  hover: string;
  active: string;
}

function toHsv({ r, g, b }: IRgbObject): IHsvObject {
  const hsv = rgbToHsv(r, g, b);
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v };
}

function toHex({ r, g, b }: IRgbObject): string {
  return `#${rgbToHex(r, g, b, false)}`;
}

function getSaturation(hsv: IHsvObject, i: number, light?: boolean): number {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation: number;
  if (light) {
    saturation = hsv.s - saturationLightStep * i;
  } else {
    saturation = hsv.s + saturationDrakStep * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  return Number(saturation.toFixed(2));
}

function getValue(hsv: IHsvObject, i: number, light?: boolean): number {
  let value: number;
  if (light) {
    value = hsv.v + brightnessLightStep * i;
  } else {
    value = hsv.v - brightnessDrakStep * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

export function generate(color: string): IColors {
  const patterns: IColors = {
    default: '',
    hover: '',
    active: '',
  };
  const pColor = inputToRGB(color);
  const hsv = toHsv(pColor);

  patterns.hover = toHex(
    inputToRGB({
      h: hsv.h,
      s: getSaturation(hsv, 1, true),
      v: getValue(hsv, 1, true),
    })
  );

  patterns.default = toHex(pColor);

  patterns.active = toHex(
    inputToRGB({
      h: hsv.h,
      s: getSaturation(hsv, 1),
      v: getValue(hsv, 1),
    })
  );

  return patterns;
}

export const changeThemeColor = (hex, cb) => {
  const calcColors = generate(hex);
  // eslint-disable-next-line guard-for-in
  for (const colorType in calcColors) {
    document.documentElement.style.setProperty(
      '--theme-brand-' + colorType,
      calcColors[colorType]
    );
  }
  cb && cb();
};
