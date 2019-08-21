/**
 * inline String.prototype.padStart polyfill
 */

function padStartPolyfill(
  targetLength: number,
  padString: string,
  target: string
) {
  targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (this.length >= targetLength) {
    return String(target);
  } else {
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(target);
  }
}

function padStartNative(
  targetLength: number,
  padString: string,
  target: string
) {
  return target.padStart(targetLength, padString);
}

export default typeof String.prototype.padStart === 'function'
  ? padStartNative
  : padStartPolyfill;
