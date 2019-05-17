import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 *        ---------
 *        |popover|
 * ----------------
 * |   anchor     |
 * |              |
 * ----------------
 */
export const TopRight: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { right, top } = relativeRect;
  const x = right - contentRect.width;
  const y = top - contentRect.height - cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-top-right'),
  };
};
