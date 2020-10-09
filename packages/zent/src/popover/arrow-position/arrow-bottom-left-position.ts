import { IPositionFunction } from '../position-function';

import createArrowPosition from './create';

const ArrowBottomLeftPosition: IPositionFunction = ({
  relativeRect,
  cushion,
}) => {
  const { left, right, bottom } = relativeRect;
  const middle = (left + right) / 2;
  const x = middle - __ARROW_OFFSET_HORIZONTAL__;
  const y = bottom + cushion;

  return createArrowPosition(x, y, `bottom-left`);
};

export default ArrowBottomLeftPosition;
