export default function defer(
  callback: (...args: any[]) => void,
  ...cbArgs: any[]
) {
  setTimeout(() => callback(...cbArgs), 1);
}
