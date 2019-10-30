import { createPosition } from './base';

import { PositionFunctionImpl } from '../position-function';

import Position from '../placement';

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
  const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
  const y = middle;

  return createPosition(x, y, `left-center`);
};

const LeftCenterArrowPosition = Position.create(locate);

export default LeftCenterArrowPosition;
