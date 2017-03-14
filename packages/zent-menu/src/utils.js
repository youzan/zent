export function getKeyFromChildrenIndex(child, index) {
  return child.key || `item_${index}`;
}

export function noop() {}
