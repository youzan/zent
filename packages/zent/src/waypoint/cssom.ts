/**
 * Returns font size in pixels, only supports absolute length units.
 */
export function parseFontSize(fontSize: string): number | null {
  return parseCSSAbsoluteUnit(fontSize.toLowerCase());
}

/**
 * Returns border width in pixels
 */
export function parseBorderWidth(
  width: string,
  fontSize: () => number,
  rootFontSize: () => number
): number | null {
  width = width.toLowerCase();
  // try absolute units
  const pixels = parseCSSAbsoluteUnit(width);
  if (pixels !== null) {
    return pixels;
  }

  return parseCSSFontRelativeUnit(width, fontSize, rootFontSize);
}

const CSS_ABSOLUTE_UNIT_REGEXP = /(^-?\d*\.?\d+)(cm|mm|in|px|pt|pc)$/;

/**
 * Parse CSS absolute length units to pixels
 */
function parseCSSAbsoluteUnit(value: string): number | null {
  const result = CSS_ABSOLUTE_UNIT_REGEXP.exec(value);
  if (result) {
    const val = parseFloat(result[1]);
    switch (result[2]) {
      case 'cm':
        return (val * 9600) / 254;
      case 'mm':
        return (val * 960) / 254;
      case 'in':
        return val * 96;
      case 'pt':
        return (val * 4) / 3;
      case 'pc':
        return val * 16;
      case 'px':
        return val;
      default:
        return null;
    }
  }

  return null;
}

const CSS_FONT_RELATIVE_UNIT_REGEXP = /(^-?\d*\.?\d+)(em|rem)$/;

/**
 * Parse CSS font relative units to pixels, only supports em and rem
 */
function parseCSSFontRelativeUnit(
  value: string,
  fontSize: () => number,
  rootFontSize: () => number
): number | null {
  const result = CSS_FONT_RELATIVE_UNIT_REGEXP.exec(value);
  if (result) {
    const val = parseFloat(result[1]);
    switch (result[2]) {
      case 'em': {
        const fs = fontSize();
        return fs !== null ? fs * val : null;
      }
      case 'rem': {
        const fs = rootFontSize();
        return fs !== null ? fs * val : null;
      }
      default:
        return null;
    }
  }

  return null;
}
