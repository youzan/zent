import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';
import getViewportSize from '../../utils/dom/getViewportSize';
import { SCROLLBAR_WIDTH } from '../../utils/getScrollbarWidth';

/**
 * ---------
 * |popoverpopoverpopover|
 *   ----------------    |
 *   |   anchor     |    |
 *   |              |    |
 *   ----------------    |
 */
export const TopLeftInViewport: IPositionFunction = ({
  relativeRect,
  anchorRect,
  contentRect,
  cushion,
}) => {
  const { left, top } = relativeRect;
  const x = left;
  const y = top - contentRect.height - cushion;
  const viewport = getViewportSize();
  const offsetWidth = contentRect.width - (viewport.width - anchorRect.left);

  return {
    style: {
      position: 'absolute',
      left: x - offsetWidth - SCROLLBAR_WIDTH,
      top: y,
    },

    className: prefix('position-top-left-in-viewport'),
  };
};
