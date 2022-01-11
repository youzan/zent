import getViewportSize from '../../utils/dom/getViewportSize';

import { BottomLeft } from './bottom-left';
import { BottomRight } from './bottom-right';
import { TopLeft } from './top-left';
import { TopRight } from './top-right';
import { IPositionFunction } from '../position-function';

const positionMap: Record<string, IPositionFunction> = {
  BottomLeft,
  BottomRight,
  TopLeft,
  TopRight,
};

export const CascaderAutoBottomLeft: IPositionFunction = props => {
  const { contentRect, cushion, anchorRect } = props;
  const viewport = getViewportSize();

  let horizontal;
  let vertical;

  // 当左边放不下移动到右边
  if (anchorRect.left + contentRect.width > viewport.width) {
    horizontal = 'Right';
  } else {
    horizontal = 'Left';
  }

  // 只有当下面放不下，并且上面能够放下时才移动到上面
  if (
    anchorRect.bottom + cushion + contentRect.height > viewport.height &&
    anchorRect.top - cushion - contentRect.height > 0
  ) {
    vertical = 'Top';
  } else {
    vertical = 'Bottom';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key](props);
};
