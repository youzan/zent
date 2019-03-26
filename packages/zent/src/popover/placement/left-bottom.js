import createPlacement from './create';

/**
 *           |--------------------|
 * ----------|                    |
 * | popover |   anchor           |
 * |---------|--------------------|
 */
function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
  const y = anchorBoundingBox.bottom - contentDimension.height;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-left-bottom',
  };
}

const LeftBottom = createPlacement(locate);

export default LeftBottom;
