import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 * |popover|
 * ---------
 */
export const BottomLeft: IPositionFunction = ({ relativeRect, cushion }) => {
  const { left, bottom } = relativeRect;
  const x = left;
  const y = bottom + cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-bottom-left'),
  };
};
