import createPlacement from './create';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *        |popover|
 *        ---------
 */
export default createPlacement((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  const { right, bottom } = anchorBoundingBox;
  const x = right - contentDimension.width;
  const y = bottom + options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`
      };
    },

    name: 'position-bottom-right'
  };
});
