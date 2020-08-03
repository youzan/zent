import { useState, useCallback } from 'react';

import { Direction } from './constants';
import { getOppositeDirection } from './utils';
import { ITransferHook } from './types';

export const useTransfer = (params: ITransferHook = {}) => {
  const { selectedKeys = [], targetKeys: defaultTargetKeys = [] } = params;
  const [targetKeys, setTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [selectedKeysState, setSelectedKeys] = useState<string[]>(selectedKeys);

  const getSingleDirectionSelectedKeys = useCallback(
    (direction: Direction) =>
      selectedKeysState.filter(key =>
        Direction.Left === direction
          ? !targetKeys.includes(key)
          : targetKeys.includes(key)
      ),
    [selectedKeysState, targetKeys]
  );

  const onChange = useCallback(
    (direction: Direction) => {
      const otherDirection = getOppositeDirection(direction);
      const transferredKeys = getSingleDirectionSelectedKeys(otherDirection);

      setSelectedKeys(
        selectedKeysState.filter(item => !transferredKeys.includes(item))
      );
      setTargetKeys(
        Direction.Right === direction
          ? transferredKeys.concat(targetKeys)
          : targetKeys.filter(item => !transferredKeys.includes(item))
      );
    },
    [getSingleDirectionSelectedKeys, selectedKeysState, targetKeys]
  );

  const onSelectChange = useCallback(
    (direction: Direction, keys: string[]) => {
      setSelectedKeys(
        keys.concat(
          getSingleDirectionSelectedKeys(getOppositeDirection(direction))
        )
      );
    },
    [getSingleDirectionSelectedKeys]
  );

  return {
    targetKeys,
    selectedKeys: selectedKeysState,
    onChange,
    onSelectChange,
  };
};
