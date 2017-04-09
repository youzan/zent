import getViewportSize from 'zent-utils/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import TopLeft from './top-left';
import TopRight from './top-right';

const positionMap = {
  BottomLeft,
  BottomRight,
  TopLeft,
  TopRight
};

function locate(anchorBoundingBox, containerBoundingBox, contentDimension, options) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;
  if (anchorBoundingBoxViewport.left + contentDimension.width > viewport.width) {
    horizontal = 'Right';
  } else {
    horizontal = 'Left';
  }

  if (anchorBoundingBoxViewport.top + anchorBoundingBoxViewport.height + cushion + contentDimension.height > viewport.height) {
    vertical = 'Top';
  } else {
    vertical = 'Bottom';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
}

const AutoBottomLeft = createPlacement(locate);
AutoBottomLeft.locate = locate;

export default AutoBottomLeft;
