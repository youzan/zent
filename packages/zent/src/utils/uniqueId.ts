let id = 0;
const PREFIX = __ZENT_VERSION__;

export default function uniqueId(prefix?: string): string {
  const nextId = `${PREFIX}${++id}`;
  return prefix ? `${prefix}${nextId}` : nextId;
}
