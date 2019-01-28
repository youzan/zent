import createPlacement from './create';
import { PositionFunctionImpl } from '../position-function';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *        |popover|
 *        ---------
 */
export const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
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
};

const BottomRight = createPlacement(locate);

export default BottomRight;
