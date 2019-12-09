/**
 * A slim version of https://github.com/TypeCtrl/tinycolor
 */

import { rgbToHex, rgbToHsl, rgbToHsv } from './conversion';
import { inputToRGB } from './format-input';
import { IHSL, IHSLA, IHSV, IHSVA, IRGB, IRGBA } from './interfaces';

export interface ITinyColorOptions {
  format: string;
  gradientType: string;
}

export type ColorInput =
  | string
  | IRGB
  | IRGBA
  | IHSL
  | IHSLA
  | IHSV
  | IHSVA
  | TinyColor;

export type ColorFormats =
  | 'rgb'
  | 'prgb'
  | 'hex'
  | 'hex3'
  | 'hex4'
  | 'hex6'
  | 'hex8'
  | 'name'
  | 'hsl'
  | 'hsv';

export class TinyColor {
  /** red */
  r!: number;

  /** green */
  g!: number;

  /** blue */
  b!: number;

  /** alpha */
  a!: number;

  /** the format used to create the tinycolor instance */
  format!: ColorFormats;

  /** input passed into the constructer used to create the tinycolor instance */
  originalInput!: ColorInput;

  /** the color was successfully parsed */
  isValid!: boolean;

  gradientType?: string;

  /** rounded alpha */
  roundA!: number;

  constructor(color: ColorInput = '', opts: Partial<ITinyColorOptions> = {}) {
    // If input is already a tinycolor, return itself
    if (color instanceof TinyColor) {
      return color;
    }

    this.originalInput = color;
    const rgb = inputToRGB(color);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(100 * this.a) / 100;
    this.format = opts.format || rgb.format;
    this.gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this.r < 1) {
      this.r = Math.round(this.r);
    }

    if (this.g < 1) {
      this.g = Math.round(this.g);
    }

    if (this.b < 1) {
      this.b = Math.round(this.b);
    }

    this.isValid = rgb.ok;
  }

  /**
   * Returns the object as a HSVA object.
   */
  toHsv() {
    const hsv = rgbToHsv(this.r, this.g, this.b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
  }

  /**
   * Returns the object as a HSLA object.
   */
  toHsl() {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
  }

  /**
   * Returns the hex value of the color.
   * @param allow3Char will shorten hex value to 3 char if possible
   */
  toHex(allow3Char = false): string {
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  }

  /**
   * Returns the object as a RGBA object.
   */
  toRgb() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a,
    };
  }

  /**
   * Returns the RGBA values interpolated into a string with the following format:
   * "RGBA(xxx, xxx, xxx, xx)".
   */
  toRgbString() {
    const r = Math.round(this.r);
    const g = Math.round(this.g);
    const b = Math.round(this.b);
    return this.a === 1
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${this.roundA})`;
  }
}

// kept for backwards compatibility with v1
export function tinycolor(
  color: ColorInput = '',
  opts: Partial<ITinyColorOptions> = {}
) {
  return new TinyColor(color, opts);
}
