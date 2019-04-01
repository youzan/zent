import getViewportSize from '../../utils/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import TopLeft from './top-left';
import TopRight from './top-right';
import { PositionFunctionImpl } from '../position-function';

const positionMap = {
  BottomLeft,
  BottomRight,
  TopLeft,
  TopRight,
};

const locate: PositionFunctionImpl = (
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) => {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;

  // 只有当左边放不下，并且右边能够放下的时候才移动到右边
  if (
    anchorBoundingBoxViewport.left + contentDimension.width > viewport.width &&
    anchorBoundingBoxViewport.right - contentDimension.width > 0
  ) {
    horizontal = 'Right';
  } else {
    horizontal = 'Left';
  }

  // 只有当上面放不下，并且下面能够放下时才移动到下面
  if (
    anchorBoundingBoxViewport.top - cushion - contentDimension.height < 0 &&
    anchorBoundingBoxViewport.bottom + cushion + contentDimension.height <
      viewport.height
  ) {
    vertical = 'Bottom';
  } else {
    vertical = 'Top';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options
  );
};

const AutoTopLeft = createPlacement(locate);

export default AutoTopLeft;
