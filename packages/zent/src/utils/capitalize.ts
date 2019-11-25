export default function capitalize(val: string): string {
  return `${val.charAt(0).toUpperCase()}${val.slice(1).toLowerCase()}`;
}
