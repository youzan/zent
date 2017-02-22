import createPlacement from './create';

/**
 * -------------------------------
 * | popover |   anchor           |
 * |---------|                    |
 *           ---------------------
 */
export default createPlacement((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
  const y = anchorBoundingBox.top;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`
      };
    },

    name: 'position-left-top'
  };
});
