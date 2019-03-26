import createPlacement from './create';

/**
 *        ---------
 *        |popover|
 * ----------------
 * |   anchor     |
 * |              |
 * ----------------
 */
function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const { right, top } = anchorBoundingBox;
  const x = right - contentDimension.width;
  const y = top - contentDimension.height - options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-top-right',
  };
}

const TopRight = createPlacement(locate);

export default TopRight;
