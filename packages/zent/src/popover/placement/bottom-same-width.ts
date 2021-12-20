import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------------
 * |   anchor     |
 * |              |
 * ---------------
 * |  popover    |
 * ---------------
 */
export const BottomSameWidth: IPositionFunction = ({
  relativeRect,
  cushion,
}) => {
  const { width, bottom, left } = relativeRect;
  const y = bottom + cushion;

  return {
    style: {
      position: 'absolute',
      left,
      top: y,
      width,
    },

    className: prefix('position-same-width'),
  };
};
