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
  const x = middle - (contentDimension.width - __ARROW_OFFSET_HORIZONTAL__);
  const y = bottom + options.cushion;

  return createArrowPosition(x, y, `bottom-right`);
};

const ArrowBottomRightPosition = createPlacement(locate);

export default ArrowBottomRightPosition;
