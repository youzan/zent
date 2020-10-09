import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ----------------------
 * |                    |----------
 * |   anchor           | popover |
 * |                    |---------
 * |--------------------|
 */
export const RightCenter: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { right, top, bottom } = relativeRect;
  const x = right + cushion;
  const middle = (top + bottom) / 2;
  const y = middle - contentRect.height / 2;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-right-center'),
  };
};
