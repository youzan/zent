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

  // 只有当右边放不下，并且左边能够放下的时候才移动到左边
  if (
    anchorBoundingBoxViewport.right - contentDimension.width < 0 &&
    anchorBoundingBoxViewport.left + contentDimension.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Right';
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

const AutoTopRight = createPlacement(locate);

export default AutoTopRight;
