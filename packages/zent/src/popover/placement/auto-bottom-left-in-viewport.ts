import getViewportSize from '../../utils/dom/getViewportSize';
import { BottomLeft } from './bottom-left';
import { BottomLeftInViewport } from './bottom-left-in-viewport';
import { TopLeft } from './top-left';
import { TopLeftInViewport } from './top-left-in-viewport';
import { IPositionFunction } from '../position-function';

const positionMap: Record<string, IPositionFunction> = {
  BottomLeft,
  BottomLeftInViewport,
  TopLeft,
  TopLeftInViewport,
};

export const AutoBottomLeftInViewport: IPositionFunction = props => {
  const { contentRect, cushion, anchorRect } = props;
  const viewport = getViewportSize();

  let horizontal;
  let vertical;

  // 当右边放得下时，跟 anchor 对齐，否则与页面右边界对齐
  if (viewport.width - anchorRect.left > contentRect.width) {
    horizontal = 'Left';
  } else {
    horizontal = 'LeftInViewport';
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
