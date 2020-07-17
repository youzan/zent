/**
 * 数字补全0
 * @param str
 * @param length
 * @param fill
 */
export function leftPad(str: string | number, length = 2, fill = '0'): string {
  let current = String(str);
  while (current.length < length) {
    current = `${fill}${str}`;
  }
  return current;
}
