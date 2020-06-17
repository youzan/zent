export function leftPad(str: string | number, length = 2, fill = '0') {
  let current = String(str);
  while (current.length < length) {
    current = `${fill}${str}`;
  }
  return current;
}
