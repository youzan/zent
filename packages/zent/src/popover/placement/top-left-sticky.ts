import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';

/**
 * ---------
 * |popoverpopoverpopover|
 *   ----------------    |
 *   |   anchor     |    |
 *   |              |    |
 *   ----------------    |
 */
export const TopLeftSticky: IPositionFunction = ({
  contentRect,
  relativeRect,
  cushion,
}) => {
  const { top } = relativeRect;
  const y = top - contentRect.height - cushion;

  return {
    style: {
      position: 'absolute',
      right: 0,
      top: y,
    },

    className: prefix('position-top-left-sticky'),
  };
};
