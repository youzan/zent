import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 *        |popover|
 *        ---------
 */
export const BottomRight: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { right, bottom } = relativeRect;
  const x = right - contentRect.width;
  const y = bottom + cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-bottom-right'),
  };
};
