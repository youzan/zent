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
): Element | null {
  function isPositioned(node: Element) {
    const cs = getComputedStyle(node);
    const pos = cs.getPropertyValue('position');
    return pos && pos !== 'static';
  }

  if (!elem) {
    return null;
  }

  if (inclusive && isPositioned(elem)) {
    return elem;
  }

  for (
    let parent = elem.parentElement;
    parent !== null;
    parent = parent.parentElement
  ) {
    if (isPositioned(parent)) {
      return parent;
    }
  }

  return document.documentElement;
}

export default findPositionedParent;
