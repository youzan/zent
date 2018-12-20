import getViewportSize from 'utils/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import TopLeft from './top-left';
import RightTop from './right-top';
import LeftTop from './left-top';

const positionMap = {
  BottomLeft,
  TopLeft,
  RightTop,
  LeftTop,
};

function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  const getPositionKey = () => {
    // 如果右边放得下，则优先放到右边
    if (
      anchorBoundingBoxViewport.right + cushion + contentDimension.width <
        viewport.width &&
      anchorBoundingBoxViewport.top + contentDimension.height < viewport.height
    ) {
      return 'RightTop';
    } else if (
      anchorBoundingBoxViewport.left - cushion - contentDimension.width > 0 &&
      anchorBoundingBoxViewport.top + contentDimension.height < viewport.height
    ) {
      return 'LeftTop';
    }

    // 如果左右都放不下，再考虑放到下面或上面
    if (
      anchorBoundingBoxViewport.top - cushion - contentDimension.height < 0 &&
      anchorBoundingBoxViewport.bottom + cushion + contentDimension.height <
        viewport.height
    ) {
      return 'BottomLeft';
    }
    return 'TopLeft';
  };

  return positionMap[getPositionKey()].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options
  );
}

const AutoRightTop = createPlacement(locate);

export default AutoRightTop;
