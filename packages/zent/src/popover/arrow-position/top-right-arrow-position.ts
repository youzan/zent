import { ARROW_OFFSET_H } from './base';

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
  const x = middle - (contentDimension.width - ARROW_OFFSET_H);
  const y = top - contentDimension.height - options.cushion;

  return Position.createArrowPosition(x, y, `top-right`);
};

const TopRightArrowPosition = Position.create(locate);

export default TopRightArrowPosition;
