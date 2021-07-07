export default function isInteger(value: string | number): boolean {
  return /^[-+]?\d*$/.test(value.toString());
}
