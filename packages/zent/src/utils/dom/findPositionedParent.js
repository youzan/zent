/**
 * Find the first positioned ancestor up in the DOM tree.
 *
 * @param {Node} elem   dom element to search from
 * @param {boolean} inclusive   true if elem is considered an ancestor of itself
 *
 * @return {Node} the first positioned ancestor node
 */
export default function findPositionedParent(elem, inclusive = false) {
  function isPositioned(node) {
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
