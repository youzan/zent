import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowLeftTopPosition: IPositionFunction = ({
  anchorRect,
  contentRect,
  cushion,
}) => {
  const x = anchorRect.left - contentRect.width - cushion;
  const middle = (anchorRect.top + contentRect.bottom) / 2;
  const y = middle - __ARROW_OFFSET_VERTICAL__;

  return createArrowPosition(x, y, `left-top`);
};

export default ArrowLeftTopPosition;
