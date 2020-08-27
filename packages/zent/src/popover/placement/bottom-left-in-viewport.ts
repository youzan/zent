import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';
import getViewportSize from '../../utils/dom/getViewportSize';
import { SCROLLBAR_WIDTH } from '../../utils/getScrollbarWidth';

/**
 * ---------
 *   ----------------    |
 *   |   anchor     |    |
 *   |              |    |
 *   ----------------    |
 * |popoverpopoverpopover|
 */
export const BottomLeftInViewport: IPositionFunction = ({
  relativeRect,
  anchorRect,
  contentRect,
  cushion,
}) => {
  const { left, bottom } = relativeRect;
  const x = left;
  const y = bottom + cushion;
  const viewport = getViewportSize();
  const offsetWidth = contentRect.width - (viewport.width - anchorRect.left);

  return {
    style: {
      position: 'absolute',
      left: x - offsetWidth - SCROLLBAR_WIDTH,
      top: y,
    },

    className: prefix('position-bottom-left-in-viewport'),
  };
};
