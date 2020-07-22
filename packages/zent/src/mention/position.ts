import Popover from '../popover';

export const getPopoverBottomPosition = instance =>
  Popover.Position.create(
    (anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
      return {
        getCSSStyle: () => {
          const { left, top, right, bottom } = anchorBoundingBox;
          const { position } = instance.state;
          let x = left + position.left;
          let y = top + options.cushion + position.top + position.height;
          const inputStyles = getComputedStyle(instance.input);
          const leftSpace =
            parseInt(inputStyles.paddingLeft, 10) +
            parseInt(inputStyles.borderLeftWidth, 10);
          const rightSpace =
            parseInt(inputStyles.paddingRight, 10) +
            parseInt(inputStyles.borderRightWidth, 10);

          if (x > right - rightSpace) {
            x = right - rightSpace;
          }
          if (x < left + leftSpace) {
            x = left + leftSpace;
          }

          if (y < top) {
            y = top;
          }
          if (y > bottom) {
            y = bottom;
          }

          return {
            position: 'absolute',
            left: `${Math.round(x)}px`,
            top: `${Math.round(y)}px`,
          };
        },

        name: 'position-mention-bottom-left',
      };
    }
  );

export const getPopoverTopPosition = instance =>
  Popover.Position.create(
    (anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
      return {
        getCSSStyle: () => {
          const { left, top, right, bottom } = anchorBoundingBox;
          const contentHeight = contentDimension.height;
          const { position } = instance.state;
          let x = left + position.left;
          let y = top - contentHeight - options.cushion + position.top;
          const inputStyles = getComputedStyle(instance.input);
          const leftSpace =
            parseInt(inputStyles.paddingLeft, 10) +
            parseInt(inputStyles.borderLeftWidth, 10);
          const rightSpace =
            parseInt(inputStyles.paddingRight, 10) +
            parseInt(inputStyles.borderRightWidth, 10);

          if (x > right - rightSpace) {
            x = right - rightSpace;
          }
          if (x < left + leftSpace) {
            x = left + leftSpace;
          }

          if (y + contentHeight < top) {
            y = top - contentHeight;
          }
          if (y + contentHeight > bottom) {
            y = bottom - contentHeight;
          }

          return {
            position: 'absolute',
            left: `${Math.round(x)}px`,
            top: `${Math.round(y)}px`,
          };
        },

        name: 'position-mention-top-left',
      };
    }
  );
