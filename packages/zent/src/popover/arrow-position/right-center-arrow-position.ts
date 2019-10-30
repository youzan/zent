import { createPosition } from './base';

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
  const y = middle;

  return createPosition(x, y, `right-center`);
};

const RightCenterArrowPosition = Position.create(locate);

export default RightCenterArrowPosition;
