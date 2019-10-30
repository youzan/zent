import capitalize from 'lodash-es/capitalize';
import isFunction from 'lodash-es/isFunction';

import Popover from '../popover';

const { Position, ArrowPosition } = Popover;

export default function getPosition(position, centerArrow) {
  if (isFunction(position)) {
    return position;
  }

  let positionName = position
    .split('-')
    .map(s => capitalize(s))
    .join('');
  let pos = Position[positionName];

  // Choose a fallback in case position is invalid
  if (!pos) {
    pos = Position.TopCenter;
    positionName = 'TopCenter';
  }

  // *-center postions are not affected by centerArrow parameter
  if (!centerArrow || /^.+Center$/.test(positionName)) {
    return pos;
  }

  positionName = positionName + 'ArrowPosition';

  return ArrowPosition[positionName];
}
