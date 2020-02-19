import { IPositionFunction } from '../position-function';

import createArrowPosition from './create';

const ArrowBottomLeftPosition: IPositionFunction = ({
  anchorRect,
  cushion,
}) => {
  const { left, right, bottom } = anchorRect;
  const middle = (left + right) / 2;
  const x = middle - __ARROW_OFFSET_HORIZONTAL__;
  const y = bottom + cushion;

  return createArrowPosition(x, y, `bottom-left`);
};

export default ArrowBottomLeftPosition;
