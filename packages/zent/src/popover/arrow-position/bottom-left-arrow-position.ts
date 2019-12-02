import { PositionFunctionImpl } from '../position-function';

import Position from '../placement';

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

  return Position.createArrowPosition(x, y, `bottom-left`);
};

const BottomLeftArrowPosition = Position.create(locate);

export default BottomLeftArrowPosition;
