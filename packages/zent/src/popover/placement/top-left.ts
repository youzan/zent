import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------
 * |popover|
 * ----------------
 * |   anchor     |
 * |              |
 * ----------------
 */
export const TopLeft: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { left, top } = relativeRect;
  const x = left;
  const y = top - contentRect.height - cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-top-left'),
  };
};
