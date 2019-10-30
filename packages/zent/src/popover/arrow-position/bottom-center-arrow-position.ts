import { createPosition } from './base';

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
  const x = middle;
  const y = bottom + options.cushion;

  return createPosition(x, y, `bottom-center`);
};

const BottomCenterArrowPosition = Position.create(locate);

export default BottomCenterArrowPosition;
