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

const AutoTopLeft: IPositionFunction = props => {
  const { contentRect, cushion, anchorRect } = props;
  const viewport = getViewportSize();

  let horizontal;
  let vertical;

  // 只有当左边放不下，并且右边能够放下的时候才移动到右边
  if (
    anchorRect.left + contentRect.width > viewport.width &&
    anchorRect.right - contentRect.width > 0
  ) {
    horizontal = 'Right';
  } else {
    horizontal = 'Left';
  }

  // 只有当上面放不下，并且下面能够放下时才移动到下面
  if (
    anchorRect.top - cushion - contentRect.height < 0 &&
    anchorRect.bottom + cushion + contentRect.height < viewport.height
  ) {
    vertical = 'Bottom';
  } else {
    vertical = 'Top';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key](props);
};

export default AutoTopLeft;
