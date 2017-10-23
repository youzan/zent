import Popover from 'popover';
import capitalize from 'lodash/capitalize';

const { Position } = Popover;

// FIXME: this value couples with CSS style
const ARROW_OFFSET = 17;

const createPosition = (x, y, side) => {
  return {
    getCSSStyle() {
      return {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`
      };
    },

    name: `position-${side}`
  };
};

const CenterArrowPosition = {
  ...(() => {
    const make = (getX, side) =>
      Position.create(
        (
          anchorBoundingBox,
          containerBoundingBox,
          contentDimension,
          options
        ) => {
          const { right, left, top } = anchorBoundingBox;
          const middle = (left + right) / 2;
          const x = getX(middle, contentDimension);
          const y = top - contentDimension.height - options.cushion;

          return createPosition(x, y, `top-${side}`);
        }
      );

    return {
      TopLeft: make(middle => middle - ARROW_OFFSET, 'left'),
      TopRight: make(
        (middle, contentDimension) =>
          middle - (contentDimension.width - ARROW_OFFSET),
        'right'
      )
    };
  })(),

  ...(() => {
    const make = (getX, side) =>
      Position.create(
        (
          anchorBoundingBox,
          containerBoundingBox,
          contentDimension,
          options
        ) => {
          const { left, right, bottom } = anchorBoundingBox;
          const middle = (left + right) / 2;
          const x = getX(middle, contentDimension);
          const y = bottom + options.cushion;

          return createPosition(x, y, `bottom-${side}`);
        }
      );

    return {
      BottomLeft: make(middle => middle - ARROW_OFFSET, 'left'),
      BottomRight: make(
        (middle, contentDimension) =>
          middle - (contentDimension.width - ARROW_OFFSET),
        'right'
      )
    };
  })(),

  ...(() => {
    const make = (getY, side) =>
      Position.create(
        (
          anchorBoundingBox,
          containerBoundingBox,
          contentDimension,
          options
        ) => {
          const x =
            anchorBoundingBox.left - contentDimension.width - options.cushion;
          const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
          const y = getY(middle, contentDimension);

          return createPosition(x, y, `left-${side}`);
        }
      );

    return {
      LeftTop: make(middle => middle - ARROW_OFFSET, 'top'),
      LeftBottom: make(
        (middle, contentDimension) =>
          middle - (contentDimension.height - ARROW_OFFSET),
        'bottom'
      )
    };
  })(),

  ...(() => {
    const make = (getY, side) =>
      Position.create(
        (
          anchorBoundingBox,
          containerBoundingBox,
          contentDimension,
          options
        ) => {
          const { right, top, bottom } = anchorBoundingBox;
          const x = right + options.cushion;
          const middle = (top + bottom) / 2;
          const y = getY(middle, contentDimension);

          return createPosition(x, y, `right-${side}`);
        }
      );

    return {
      RightTop: make(middle => middle - ARROW_OFFSET, 'top'),
      RightBottom: make(
        (middle, contentDimension) =>
          middle - (contentDimension.height - ARROW_OFFSET),
        'bottom'
      )
    };
  })()
};

export default function getPosition(position, centerArrow) {
  let positionName = position
    .split('-')
    .map(s => capitalize(s))
    .join('');
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
