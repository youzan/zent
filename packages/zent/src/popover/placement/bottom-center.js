import createPlacement from './create';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *    |popover|
 *    ---------
 */
function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const { left, right, bottom } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle - contentDimension.width / 2;
  const y = bottom + options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-bottom-center',
  };
}

const BottomCenter = createPlacement(locate);

export default BottomCenter;
