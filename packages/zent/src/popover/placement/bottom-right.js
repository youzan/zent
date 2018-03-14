import createPlacement from './create';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *        |popover|
 *        ---------
 */
export function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const { right, bottom } = anchorBoundingBox;
  const x = right - contentDimension.width;
  const y = bottom + options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-bottom-right',
  };
}

const BottomRight = createPlacement(locate);

export default BottomRight;
