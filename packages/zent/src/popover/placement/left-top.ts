import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * -------------------------------
 * | popover |   anchor           |
 * |---------|                    |
 *           ---------------------
 */
export const LeftTop: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const x = relativeRect.left - contentRect.width - cushion;
  const y = relativeRect.top;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-left-top'),
  };
};
