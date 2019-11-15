import { ARROW_OFFSET_V } from './base';

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
  const y = middle - ARROW_OFFSET_V;

  return Position.createArrowPosition(x, y, `right-top`);
};

const RightTopArrowPosition = Position.create(locate);

export default RightTopArrowPosition;
