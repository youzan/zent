import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowLeftTopPosition: IPositionFunction = ({
  relativeRect,
  contentRect,
  cushion,
}) => {
  const x = relativeRect.left - contentRect.width - cushion;
  const middle = (relativeRect.top + contentRect.bottom) / 2;
  const y = middle - __ARROW_OFFSET_VERTICAL__;

  return createArrowPosition(x, y, `left-top`);
};

export default ArrowLeftTopPosition;
