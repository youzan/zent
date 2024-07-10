import { IPositionFunction } from '../position-function';
import { prefix } from './prefix';
import getViewportSize from '../../utils/dom/getViewportSize';
import measureScrollbar from '../../utils/dom/measureScrollbar';

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
      left: x - offsetWidth - measureScrollbar(),
      top: y,
    },

    className: prefix('position-bottom-left-in-viewport'),
  };
};
