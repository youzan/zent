import { IPositionFunction } from '../popover';
import Mention from './Mention';

export const getPopoverBottomPosition = (
  instance: Mention
): IPositionFunction => ({ relativeRect, cushion }) => {
  const { left, top, right, bottom } = relativeRect;
  const { position } = instance.state;
  let x = left + position.left;
  let y = top + cushion + position.top + position.height;
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
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },
  };
};

export const getPopoverTopPosition = (
  instance: Mention
): IPositionFunction => ({ relativeRect, contentRect, cushion }) => {
  const { left, top, right, bottom } = relativeRect;
  const contentHeight = contentRect.height;
  const { position } = instance.state;
  let x = left + position.left;
  let y = top - contentHeight - cushion + position.top;
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
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },
  };
};
