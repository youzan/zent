import getViewportSize from '../../utils/dom/getViewportSize';

import { BottomLeft } from './bottom-left';
import { BottomRight } from './bottom-right';
import { BottomCenter } from './bottom-center';
import { TopLeft } from './top-left';
import { TopRight } from './top-right';
import { TopCenter } from './top-center';
import { IPositionFunction } from '../position-function';

const positionMap: Record<string, IPositionFunction> = {
  BottomLeft,
  BottomRight,
  BottomCenter,
  TopLeft,
  TopRight,
  TopCenter,
};

export const AutoBottomCenter: IPositionFunction = props => {
  const { contentRect, cushion, anchorRect } = props;
  const viewport = getViewportSize();

  let horizontal;
  let vertical;

  const mid = (anchorRect.left + anchorRect.right) / 2;
  const halfWidth = contentRect.width / 2;

  // 只有当居中放不下，并且右边能够放下的时候才移动到右边，如果左边能放下就移动到左边
  if (
    mid + halfWidth > viewport.width &&
    anchorRect.right - contentRect.width > 0
  ) {
    horizontal = 'Right';
  } else if (
    mid - halfWidth < 0 &&
    anchorRect.left + contentRect.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Center';
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
