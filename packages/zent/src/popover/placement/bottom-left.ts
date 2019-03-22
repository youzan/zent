import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 * |popover|
 * ---------
 */
const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { left, bottom } = anchorBoundingBox;
  const x = left;
  const y = bottom + options.cushion;

  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      };
    },

    name: 'position-bottom-left',
  };
};

const BottomLeft = createPlacement(locate);

export default BottomLeft;
