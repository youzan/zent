import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 *    ---------
 *    |popover|
 * ----------------
 * |   anchor     |
 * |              |
 * ----------------
 */
export const TopCenter: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { right, left, top } = relativeRect;
  const middle = (left + right) / 2;
  const x = middle - contentRect.width / 2;
  const y = top - contentRect.height - cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-top-center'),
  };
};
