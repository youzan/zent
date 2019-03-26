import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 *           |--------------------|
 * ----------|                    |
 * | popover |   anchor           |
 * |---------|                    |
 *           |--------------------|
 */
const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
  const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
  const y = middle - contentDimension.height / 2;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-left-center',
  };
};

const LeftCenter = createPlacement(locate);

export default LeftCenter;
