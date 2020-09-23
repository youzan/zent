import { Direction } from './constants';
import { ITransferData } from './types';

export const getOppositeDirection = (direction: Direction) =>
  Direction.Left === direction ? Direction.Right : Direction.Left;

export const getDisabledKeys = (dataSource: ITransferData[], keyName: string) =>
  dataSource
    .filter(({ disabled }) => disabled)
    .map(({ [keyName]: key }) => key);

export const getSingleDirectionSelectedKeysExcludeDisabled = ({
  direction,
  selectedKeys,
  targetKeys,
  disabledKeys,
}: {
  direction: Direction;
  selectedKeys: string[];
  targetKeys: string[];
  disabledKeys: string[];
}) => {
  return selectedKeys.filter(
    key =>
      !disabledKeys.includes(key) &&
      (Direction.Left === direction
        ? !targetKeys.includes(key)
        : targetKeys.includes(key))
  );
};
