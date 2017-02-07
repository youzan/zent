import createPlacement from './create';

/**
 *    ---------
 *    |popover|
 * ----------------
 * |   anchor     |
 * |              |
 * ----------------
 */
export default createPlacement((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  const { right, left, top } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle - contentDimension.width / 2;
  const y = top - contentDimension.height - options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`
      };
    },

    name: 'position-top-center'
  };
});
