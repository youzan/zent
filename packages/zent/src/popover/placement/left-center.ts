import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 *           |--------------------|
 * ----------|                    |
 * | popover |   anchor           |
 * |---------|                    |
 *           |--------------------|
 */
export const LeftCenter: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const x = relativeRect.left - contentRect.width - cushion;
  const middle = (relativeRect.top + relativeRect.bottom) / 2;
  const y = middle - contentRect.height / 2;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-left-center'),
  };
};
