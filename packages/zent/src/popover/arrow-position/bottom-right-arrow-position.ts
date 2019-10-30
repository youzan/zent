import { createPosition, ARROW_OFFSET_H } from './base';

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
  const x = middle - (contentDimension.width - ARROW_OFFSET_H);
  const y = bottom + options.cushion;

  return createPosition(x, y, `bottom-right`);
};

const BottomRightArrowPosition = Position.create(locate);

export default BottomRightArrowPosition;
