import { rgbToHsv, rgbToHex, inputToRGB } from '@ctrl/tinycolor';

const saturationLightStep = 0.4;
const saturationDrakStep = 0.05;
const brightnessLightStep = 0.05;
const brightnessDrakStep = 0.2;
const lightColors = 2;
const darkColors = 2;

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

function toHsv({ r, g, b }: IRgbObject): IHsvObject {
  const hsv = rgbToHsv(r, g, b);
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v };
}

export function toHex({ r, g, b }: IRgbObject): string {
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

export function generate(color: string): string[] {
  const patterns: string[] = [];
  const pColor = inputToRGB(color);
  const hsv = toHsv(pColor);
  let i = lightColors;

  while (i) {
    patterns.push(
      toHex(
        inputToRGB({
          h: hsv.h,
          s: getSaturation(hsv, i, true),
          v: getValue(hsv, i, true),
        })
      )
    );
    i--;
  }

  patterns.push(toHex(pColor));

  i = 1;

  while (i <= darkColors) {
    patterns.push(
      toHex(
        inputToRGB({
          h: hsv.h,
          s: getSaturation(hsv, i),
          v: getValue(hsv, i),
        })
      )
    );
    i++;
  }

  return patterns;
}
