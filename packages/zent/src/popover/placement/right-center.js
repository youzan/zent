import createPlacement from './create';

/**
 * ----------------------
 * |                    |----------
 * |   anchor           | popover |
 * |                    |---------
 * |--------------------|
 */
function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const { right, top, bottom } = anchorBoundingBox;
  const x = right + options.cushion;
  const middle = (top + bottom) / 2;
  const y = middle - contentDimension.height / 2;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-right-center',
  };
}

const RightCenter = createPlacement(locate);

export default RightCenter;
