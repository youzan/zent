/**
 * Create a new placement.
 *
 * @param {function} template (anchorBoundingBox, containerBoundingBox, contentDimension, options) => { name, getCSSStyle }
 * @return {function}
 */
export default function createPlacement(template) {
  return (prefix, ...args) => {
    const placement = template(...args);

    if (!placement || !placement.name || !placement.getCSSStyle) {
      throw new Error('name and getCSSStyle is required for a placement');
    }

    const name = `${prefix}-popover-${placement.name}`;
    return {
      ...placement,

      toString() {
        return name;
      }
    };
  };
}
