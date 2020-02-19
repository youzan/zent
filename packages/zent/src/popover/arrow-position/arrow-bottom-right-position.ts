import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowBottomRightPosition: IPositionFunction = ({
  anchorRect,
  cushion,
  contentRect,
}) => {
  const { left, right, bottom } = anchorRect;
  const middle = (left + right) / 2;
  const x = middle - (contentRect.width - __ARROW_OFFSET_HORIZONTAL__);
  const y = bottom + cushion;

  return createArrowPosition(x, y, `bottom-right`);
};

export default ArrowBottomRightPosition;
