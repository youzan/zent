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
  const x = middle - (contentDimension.width - __ARROW_OFFSET_HORIZONTAL__);
  const y = bottom + options.cushion;

  return Position.createArrowPosition(x, y, `bottom-right`);
};

const BottomRightArrowPosition = Position.create(locate);

export default BottomRightArrowPosition;
