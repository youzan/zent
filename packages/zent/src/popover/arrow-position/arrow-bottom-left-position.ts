import { PositionFunctionImpl } from '../position-function';

import createPlacement from '../placement/create';
import createArrowPosition from './create';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { left, right, bottom } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle - __ARROW_OFFSET_HORIZONTAL__;
  const y = bottom + options.cushion;

  return createArrowPosition(x, y, `bottom-left`);
};

const ArrowBottomLeftPosition = createPlacement(locate);

export default ArrowBottomLeftPosition;
