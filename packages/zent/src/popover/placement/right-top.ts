import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * -------------------------------
 * |   anchor           | popover |
 * |                    |---------
 * ----------------------
 */
export const RightTop: IPositionFunction = ({ relativeRect, cushion }) => {
  const { right, top } = relativeRect;
  const x = right + cushion;
  const y = top;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-right-top'),
  };
};
