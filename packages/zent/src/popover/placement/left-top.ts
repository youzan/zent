import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 * -------------------------------
 * | popover |   anchor           |
 * |---------|                    |
 *           ---------------------
 */
const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
  const y = anchorBoundingBox.top;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-left-top',
  };
};

const LeftTop = createPlacement(locate);

export default LeftTop;
