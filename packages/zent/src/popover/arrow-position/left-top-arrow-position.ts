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
  const y = middle - __ARROW_OFFSET_VERTICAL__;

  return Position.createArrowPosition(x, y, `left-top`);
};

const LeftTopArrowPosition = Position.create(locate);

export default LeftTopArrowPosition;
