import getViewportSize from 'utils/dom/getViewportSize';

import createPlacement from './create';
import RightTop from './right-top';
import RightBottom from './right-bottom';
import LeftTop from './left-top';
import LeftBottom from './left-bottom';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import TopLeft from './top-left';
import TopRight from './top-right';

const positionMap = {
  RightTop,
  RightBottom,
  LeftTop,
  LeftBottom,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
};

function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  const getAutoBottomLeftPosition = () => {
    let horizontal;
    let vertical;

    // 只有当左边放不下，并且右边能够放下的时候才移动到右边
    if (
      anchorBoundingBoxViewport.left + contentDimension.width >
        viewport.width &&
      anchorBoundingBoxViewport.right - contentDimension.width > 0
    ) {
      horizontal = 'Right';
    } else {
      horizontal = 'Left';
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

    return `${vertical}${horizontal}`;
  };

  const getAutoRightTopPosition = () => {
    let horizontal;
    let vertical;

    // 只有当右边放不下，并且左边能够放下的时候才移动到左边
    if (
      anchorBoundingBoxViewport.left - cushion - contentDimension.width > 0 &&
      anchorBoundingBoxViewport.right + cushion + contentDimension.width >
        viewport.width
    ) {
      horizontal = 'Left';
    } else {
      horizontal = 'Right';
    }

    // 只有当上面放不下，并且下面能够放下时才移动到下面
    if (
      anchorBoundingBoxViewport.top + contentDimension.height >
      viewport.height
    ) {
      vertical = 'Bottom';
    } else {
      vertical = 'Top';
    }

    return `${horizontal}${vertical}`;
  };

  const key =
    anchorBoundingBoxViewport.top < 0 ||
    anchorBoundingBoxViewport.bottom > viewport.height
      ? getAutoBottomLeftPosition()
      : getAutoRightTopPosition();

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options
  );
}

const AutoRightTop = createPlacement(locate);

export default AutoRightTop;
