export function trimLeadingPlus(value: string) {
  if (value.startsWith('+')) {
    return value.substring(1);
  }
  return value;
}
