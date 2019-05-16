function isPositioned(node: Element) {
  return getComputedStyle(node).position !== 'static';
}

/**
 * Find the first positioned ancestor up in the DOM tree.
 *
 * @param elem   dom element to search from
 * @param inclusive   true if elem is considered an ancestor of itself
 *
 * @return the first positioned ancestor node
 */
export function findPositionedParent(
  elem: Element,
  inclusive = false
): Element {
  if (inclusive && isPositioned(elem)) {
    return elem;
  }
  let parent = elem.parentElement;
  while (parent !== null) {
    if (isPositioned(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}

export default findPositionedParent;
