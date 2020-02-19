import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowRightBottomPosition: IPositionFunction = ({
  relativeRect,
  contentRect,
  cushion,
}) => {
  const { right, top, bottom } = relativeRect;
  const x = right + cushion;
  const middle = (top + bottom) / 2;
  const y = middle - (contentRect.height - __ARROW_OFFSET_VERTICAL__);

  return createArrowPosition(x, y, `right-bottom`);
};

export default ArrowRightBottomPosition;
