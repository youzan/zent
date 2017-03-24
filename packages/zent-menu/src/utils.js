export function getKeyFromChildrenIndex(child, index, subPrefix) {
  return child.key || `${subPrefix ? subPrefix : 'item'}_${index}`;
}
