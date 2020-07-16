import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 *           |--------------------|
 * ----------|                    |
 * | popover |   anchor           |
 * |---------|--------------------|
 */
export const LeftBottom: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const x = relativeRect.left - contentRect.width - cushion;
  const y = relativeRect.bottom - contentRect.height;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-left-bottom'),
  };
};
