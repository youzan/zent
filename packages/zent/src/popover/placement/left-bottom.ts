import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 *           |--------------------|
 * ----------|                    |
 * | popover |   anchor           |
 * |---------|--------------------|
 */
const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
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
};

const LeftBottom = createPlacement(locate);

export default LeftBottom;
