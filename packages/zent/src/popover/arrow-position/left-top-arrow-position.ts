import { ARROW_OFFSET_V } from './base';
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
  const y = middle - ARROW_OFFSET_V;

  return Position.createArrowPosition(x, y, `left-top`);
};

const LeftTopArrowPosition = Position.create(locate);

export default LeftTopArrowPosition;
