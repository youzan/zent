import { PositionFunctionImpl } from '../position-function';

import createPlacement from '../placement/create';
import createArrowPosition from './create';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { right, top, bottom } = anchorBoundingBox;
  const x = right + options.cushion;
  const middle = (top + bottom) / 2;
  const y = middle - __ARROW_OFFSET_VERTICAL__;

  return createArrowPosition(x, y, `right-top`);
};

const ArrowRightTopPosition = createPlacement(locate);

export default ArrowRightTopPosition;
