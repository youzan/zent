import Popover from 'zent-popover';

export const positionMap = {
  'bottom-left': Popover.Position.BottomLeft,
  'bottom-right': Popover.Position.BottomRight,
  'top-left': Popover.Position.TopLeft,
  'top-right': Popover.Position.TopRight
};

export const position = Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;
  if (anchorBoundingBoxViewport.left + contentDimension.width > windowWidth) {
    horizontal = 'right';
  } else {
    horizontal = 'left';
  }

  if (anchorBoundingBoxViewport.top + anchorBoundingBoxViewport.height + cushion + contentDimension.height > windowHeight) {
    vertical = 'top';
  } else {
    vertical = 'bottom';
  }

  const key = `${vertical}-${horizontal}`;

  return positionMap[key]('zent', anchorBoundingBox, containerBoundingBox, contentDimension, options);
});
