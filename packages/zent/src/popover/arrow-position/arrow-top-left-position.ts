import { PositionFunctionImpl } from '../position-function';

import createPlacement from '../placement/create';
import createArrowPosition from './create';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { right, left, top } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle - __ARROW_OFFSET_HORIZONTAL__;
  const y = top - contentDimension.height - options.cushion;

  return createArrowPosition(x, y, `top-left`);
};

const ArrowTopLeftPosition = createPlacement(locate);

export default ArrowTopLeftPosition;
