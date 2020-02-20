export default function isNil(value: any): value is null | undefined {
  return value === undefined || value === null;
}
