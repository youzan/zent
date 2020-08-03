import { IGridProps } from '../grid';
import { Direction } from './constants';

type GridKey = keyof IGridProps;

export const pick = (obj: Record<string, any>, pickKeys: GridKey[]) => {
  return Object.keys(obj).reduce((val, item: GridKey) => {
    if (pickKeys.includes(item)) {
      return {
        ...val,
        [item]: obj[item],
      };
    }
    return val;
  }, {});
};

export const getOppositeDirection = (direction: Direction) =>
  Direction.Left === direction ? Direction.Right : Direction.Left;
