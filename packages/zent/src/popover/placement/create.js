/**
 * Create a new placement.
 *
 * @param {function} locate (anchorBoundingBox, containerBoundingBox, contentDimension, options) => { name, getCSSStyle }
 * @return {function}
 */
export default function createPlacement(locate) {
  const pos = (prefix, ...args) => {
    const placement = locate(...args);

    if (!placement || !placement.name || !placement.getCSSStyle) {
      throw new Error('name and getCSSStyle is required for a placement');
    }

    const name = `${prefix}-popover-${placement.name}`;
    return {
      ...placement,

      toString() {
        return name;
      },
    };
  };
  pos.locate = locate;
  return pos;
}
