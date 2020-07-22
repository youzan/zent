import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowLeftBottomPosition: IPositionFunction = ({
  relativeRect,
  contentRect,
  cushion,
}) => {
  const x = relativeRect.left - contentRect.width - cushion;
  const middle = (relativeRect.top + relativeRect.bottom) / 2;
  const y = middle - (contentRect.height - __ARROW_OFFSET_VERTICAL__);

  return createArrowPosition(x, y, `left-bottom`);
};

export default ArrowLeftBottomPosition;
