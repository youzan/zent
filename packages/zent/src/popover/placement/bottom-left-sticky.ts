import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------
 *   ----------------    |
 *   |   anchor     |    |
 *   |              |    |
 *   ----------------    |
 * |popoverpopoverpopover|
 */
export const BottomLeftSticky: IPositionFunction = ({
  relativeRect,
  cushion,
}) => {
  const { bottom } = relativeRect;
  const y = bottom + cushion;

  return {
    style: {
      position: 'absolute',
      right: 0,
      top: y,
    },

    className: prefix('position-bottom-left-sticky'),
  };
};
