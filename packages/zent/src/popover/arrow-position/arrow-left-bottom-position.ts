import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowLeftBottomPosition: IPositionFunction = ({
  anchorRect,
  contentRect,
  cushion,
}) => {
  const x = anchorRect.left - contentRect.width - cushion;
  const middle = (anchorRect.top + anchorRect.bottom) / 2;
  const y = middle - (contentRect.height - __ARROW_OFFSET_VERTICAL__);

  return createArrowPosition(x, y, `left-bottom`);
};

export default ArrowLeftBottomPosition;
