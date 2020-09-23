import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ----------------------
 * |                    |----------
 * |   anchor           | popover |
 * |--------------------|---------
 *
 */
export const RightBottom: IPositionFunction = ({
  relativeRect,
  cushion,
  contentRect,
}) => {
  const { right, bottom } = relativeRect;
  const x = right + cushion;
  const y = bottom - contentRect.height;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-right-bottom'),
  };
};
