import { IGridProps } from '../grid';

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
