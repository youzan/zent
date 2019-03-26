import createPlacement from './create';

/**
 * ---------
 * |popover|
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
  const { left, top } = anchorBoundingBox;
  const x = left;
  const y = top - contentDimension.height - options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-top-left',
  };
}

const TopLeft = createPlacement(locate);

export default TopLeft;
