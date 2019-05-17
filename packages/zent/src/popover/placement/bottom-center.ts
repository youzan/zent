import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *    |popover|
 *    ---------
 */
export const BottomCenter: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { left, right, bottom } = relativeRect;
  const middle = (left + right) / 2;
  const x = middle - contentRect.width / 2;
  const y = bottom + cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-bottom-center'),
  };
};
