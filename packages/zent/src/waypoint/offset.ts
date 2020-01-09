/**
 * @param offset
 * @param contextHeight
 * @return A number representing `offset` converted into pixels.
 */
export function computeOffsetPixels(
  offset: string | number,
  contextHeight: number
): number {
  const pixelOffset = parseOffsetAsPixels(offset);

  if (typeof pixelOffset === 'number') {
    return pixelOffset;
  }

  if (typeof offset === 'string') {
    const percentOffset = parseOffsetAsPercentage(offset);
    if (typeof percentOffset === 'number') {
      return percentOffset * contextHeight;
    }
  }

  return undefined;
}

/**
 * Attempts to parse the offset provided as a prop as a percentage. For
 * instance, if the component has been provided with the string "20%" as
 * a value of one of the offset props. If the value matches, then it returns
 * a numeric version of the prop. For instance, "20%" would become `0.2`.
 * If `str` isn't a percentage, then `undefined` will be returned.
 *
 * @param str The value of an offset prop to be converted to a
 *   number.
 * @returns The numeric version of `str`. Undefined if `str`
 *   was not a percentage.
 */
function parseOffsetAsPercentage(str: string): number | undefined {
  if (str.slice(-1) === '%') {
    return parseFloat(str.slice(0, -1)) / 100;
  }

  return undefined;
}

/**
 * Attempts to parse the offset provided as a prop as a pixel value. If
 * parsing fails, then `undefined` is returned. Three examples of values that
 * will be successfully parsed are:
 * `20`
 * "20px"
 * "20"
 *
 * @param str A string of the form "{number}" or "{number}px",
 *   or just a number.
 * @return The numeric version of `str`. Undefined if `str`
 *   was neither a number nor string ending in "px".
 */
function parseOffsetAsPixels(str: string | number): number | undefined {
  let val: number;
  if (typeof str === 'number') {
    val = str;
  } else {
    val = parseFloat(str);
  }

  if (!Number.isNaN(val) && Number.isFinite(val)) {
    return val;
  }

  return undefined;
}
