import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowTopLeftPosition: IPositionFunction = ({
  relativeRect,
  contentRect,
  cushion,
}) => {
  const { right, left, top } = relativeRect;
  const middle = (left + right) / 2;
  const x = middle - __ARROW_OFFSET_HORIZONTAL__;
  const y = top - contentRect.height - cushion;

  return createArrowPosition(x, y, `top-left`);
};

export default ArrowTopLeftPosition;
