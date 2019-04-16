import getViewportSize from '../../utils/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import BottomCenter from './bottom-center';
import TopLeft from './top-left';
import TopRight from './top-right';
import TopCenter from './top-center';
import { PositionFunctionImpl } from '../position-function';

const positionMap = {
  BottomLeft,
  BottomRight,
  BottomCenter,
  TopLeft,
  TopRight,
  TopCenter,
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

  const mid =
    (anchorBoundingBoxViewport.left + anchorBoundingBoxViewport.right) / 2;
  const halfWidth = contentDimension.width / 2;

  // 只有当居中放不下，并且右边能够放下的时候才移动到右边，如果左边能放下就移动到左边
  if (
    mid + halfWidth > viewport.width &&
    anchorBoundingBoxViewport.right - contentDimension.width > 0
  ) {
    horizontal = 'Right';
  } else if (
    mid - halfWidth < 0 &&
    anchorBoundingBoxViewport.left + contentDimension.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Center';
  }

  // 只有当下面放不下，并且上面能够放下时才移动到上面
  if (
    anchorBoundingBoxViewport.bottom + cushion + contentDimension.height >
      viewport.height &&
    anchorBoundingBoxViewport.top - cushion - contentDimension.height > 0
  ) {
    vertical = 'Top';
  } else {
    vertical = 'Bottom';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options
  );
};

const AutoBottomCenter = createPlacement(locate);

export default AutoBottomCenter;
