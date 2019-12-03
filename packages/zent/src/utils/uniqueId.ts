let id = 0;
const PREFIX =
  'v' +
  __ZENT_VERSION__.replace(/[^0-9a-z]/gi, 'x') +
  Math.ceil(Math.random() * 8999 + 1000).toString();

export default function uniqueId(prefix?: string): string {
  const nextId = `${PREFIX}${++id}`;
  return prefix ? `${prefix}${nextId}` : nextId;
}
