import Popover from 'zent-popover';
import capitalize from 'zent-utils/lodash/capitalize';

const { Position } = Popover;

// FIXME: this value couples with CSS style
const ARROW_OFFSET = 17;

const CenterArrowPosition = {
  TopLeft: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { right, left, top } = anchorBoundingBox;
    const middle = (left + right) / 2;
    const x = middle - ARROW_OFFSET;
    const y = top - contentDimension.height - options.cushion;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-top-left'
    };
  }),

  TopRight: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { right, left, top } = anchorBoundingBox;
    const middle = (left + right) / 2;
    const x = middle - (contentDimension.width - ARROW_OFFSET);
    const y = top - contentDimension.height - options.cushion;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-top-right'
    };
  }),

  BottomLeft: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { left, right, bottom } = anchorBoundingBox;
    const middle = (left + right) / 2;
    const x = middle - ARROW_OFFSET;
    const y = bottom + options.cushion;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-bottom-left'
    };
  }),

  BottomRight: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { left, right, bottom } = anchorBoundingBox;
    const middle = (left + right) / 2;
    const x = middle - (contentDimension.width - ARROW_OFFSET);
    const y = bottom + options.cushion;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-bottom-right'
    };
  }),

  LeftTop: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
    const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
    const y = middle - ARROW_OFFSET;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-left-top'
    };
  }),

  LeftBottom: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const x = anchorBoundingBox.left - contentDimension.width - options.cushion;
    const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
    const y = middle - (contentDimension.height - ARROW_OFFSET);

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-left-bottom'
    };
  }),

  RightTop: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { right, top, bottom } = anchorBoundingBox;
    const x = right + options.cushion;
    const middle = (top + bottom) / 2;
    const y = middle - ARROW_OFFSET;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-right-top'
    };
  }),

  RightBottom: Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const { right, top, bottom } = anchorBoundingBox;
    const x = right + options.cushion;
    const middle = (top + bottom) / 2;
    const y = middle - (contentDimension.height - ARROW_OFFSET);

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`
        };
      },

      name: 'position-right-bottom'
    };
  })
};

export default function getPosition(position, centerArrow) {
  let positionName = position.split('-').map(s => capitalize(s)).join('');
  let pos = Position[positionName];

  // Choose a fallback in case position is invalid
  if (!pos) {
    pos = Position.TopCenter;
    positionName = 'TopCenter';
  }

  // *-center postions are not affected by centerArrow parameter
  if (!centerArrow || /^.+Center$/.test(positionName)) {
    return pos;
  }

  return CenterArrowPosition[positionName];
}
