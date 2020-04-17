import getViewportSize from '../../utils/dom/getViewportSize';

import { BottomLeft } from './bottom-left';
import { BottomLeftSticky } from './bottom-left-sticky';
import { TopLeft } from './top-left';
import { TopLeftSticky } from './top-left-sticky';
import { IPositionFunction } from '../position-function';

const positionMap: Record<string, IPositionFunction> = {
  BottomLeft,
  BottomLeftSticky,
  TopLeft,
  TopLeftSticky,
};

export const AutoBottomLeftSticky: IPositionFunction = props => {
  const { contentRect, cushion, anchorRect } = props;
  const viewport = getViewportSize();

  let horizontal;
  let vertical;

  // 当右边放得下时，跟 anchor 对齐，否则往左平移
  if (viewport.width - anchorRect.left > contentRect.width) {
    horizontal = 'Left';
  } else {
    horizontal = 'LeftSticky';
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
