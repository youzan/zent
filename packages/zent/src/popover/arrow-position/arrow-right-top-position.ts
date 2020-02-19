import { IPositionFunction } from '../position-function';
import createArrowPosition from './create';

const ArrowRightTopPosition: IPositionFunction = ({ anchorRect, cushion }) => {
  const { right, top, bottom } = anchorRect;
  const x = right + cushion;
  const middle = (top + bottom) / 2;
  const y = middle - __ARROW_OFFSET_VERTICAL__;

  return createArrowPosition(x, y, `right-top`);
};

export default ArrowRightTopPosition;
