import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowTopRightPosition: IPositionFunction = ({
  cushion,
  anchorRect,
  contentRect,
}) => {
  const { right, left, top } = anchorRect;
  const middle = (left + right) / 2;
  const x = middle - (contentRect.width - __ARROW_OFFSET_HORIZONTAL__);
  const y = top - contentRect.height - cushion;

  return createArrowPosition(x, y, `top-right`);
};

export default ArrowTopRightPosition;
