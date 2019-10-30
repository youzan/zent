import { createPosition } from './base';

import { PositionFunctionImpl } from '../position-function';

import Position from '../placement';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const { right, left, top } = anchorBoundingBox;
  const middle = (left + right) / 2;
  const x = middle;
  const y = top - contentDimension.height - options.cushion;

  return createPosition(x, y, `top-center`);
};

const TopCenterArrowPosition = Position.create(locate);

export default TopCenterArrowPosition;
