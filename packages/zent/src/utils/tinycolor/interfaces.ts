/**
 * A representation of additive color mixing.
 * Projection of primary color lights on a white screen shows secondary
 * colors where two overlap; the combination of all three of red, green,
 * and blue in equal intensities makes white.
 */
export interface IRGB {
  r: number | string;
  g: number | string;
  b: number | string;
}

export interface IRGBA extends IRGB {
  a: number;
}

/**
 * The HSL model describes colors in terms of hue, saturation,
 * and lightness (also called luminance).
 * @link https://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL#HSL
 */
export interface IHSL {
  h: number | string;
  s: number | string;
  l: number | string;
}

export interface IHSLA extends IHSL {
  a: number;
}

/**
 * The HSV, or HSB, model describes colors in terms of
 * hue, saturation, and value (brightness).
 * @link https://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL#HSV
 */
export interface IHSV {
  h: number | string;
  s: number | string;
  v: number | string;
}

export interface IHSVA extends IHSV {
  a: number;
}
