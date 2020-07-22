import { prefix } from '../placement/prefix';
import { IPopoverPosition } from '../position-function';

export default function createArrowPosition(
  x: number,
  y: number,
  side: string
): IPopoverPosition {
  return {
    style: {
      position: 'absolute',
      left: `${Math.round(x)}px`,
      top: `${Math.round(y)}px`,
    },

    className: prefix(`position-arrow-${side}`),
  };
}
