import { IPopoverPosition } from '../position-function';
import { prefix } from './prefix';

export const INVISIBLE_POSITION: IPopoverPosition = {
  style: {
    position: 'fixed',
    left: -100000,
    top: -100000,
    zIndex: -10,
    opacity: 0,
  },
  className: prefix('position-invisible'),
};
