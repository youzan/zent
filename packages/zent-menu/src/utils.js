export function getKeyFromChildrenIndex(child, index, subPrefix = 'item') {
  return child.key || `${subPrefix}_${index}`;
}
