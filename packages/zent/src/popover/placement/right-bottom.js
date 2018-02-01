import createPlacement from './create';

/**
 * ----------------------
 * |                    |----------
 * |   anchor           | popover |
 * |--------------------|---------
 *
 */
function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const { right, bottom } = anchorBoundingBox;
  const x = right + options.cushion;
  const y = bottom - contentDimension.height;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-right-bottom',
  };
}

const RightBottom = createPlacement(locate);

export default RightBottom;
