let id = 0;
const PREFIX =
  __ZENT_VERSION__.replace(/[^0-9a-z]/gi, 'x') +
  Math.ceil(Math.random() * 10000).toString();

export default function uniqueId(prefix?: string): string {
  const nextId = `${PREFIX}${++id}`;
  return prefix ? `${prefix}${nextId}` : nextId;
}
