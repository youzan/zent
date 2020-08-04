import { Direction } from './constants';

export const getOppositeDirection = (direction: Direction) =>
  Direction.Left === direction ? Direction.Right : Direction.Left;
