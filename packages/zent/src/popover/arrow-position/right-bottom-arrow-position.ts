import { PositionFunctionImpl } from '../position-function';

import Position from '../placement';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { right, top, bottom } = anchorBoundingBox;
  const x = right + options.cushion;
  const middle = (top + bottom) / 2;
  const y = middle - (contentDimension.height - __ARROW_OFFSET_VERTICAL__);

  return Position.createArrowPosition(x, y, `right-bottom`);
};

const RightBottomArrowPosition = Position.create(locate);

export default RightBottomArrowPosition;
