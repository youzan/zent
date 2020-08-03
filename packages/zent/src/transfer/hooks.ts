import { useState, useCallback } from 'react';

import { Direction } from './constants';
import { getOppositeDirection } from './utils';
import { ITransferHook } from './types';

export const useTransfer = (params: ITransferHook = {}) => {
  const {
    targetKeys: defaultTargetKeys = [],
    selectedKeys: defaultSelectedKeys = [],
  } = params;
  const [targetKeys, setTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    defaultSelectedKeys
  );

  const getSingleDirectionSelectedKeys = useCallback(
    (direction: Direction) =>
      selectedKeys.filter(key =>
        Direction.Left === direction
          ? !targetKeys.includes(key)
          : targetKeys.includes(key)
      ),
    [selectedKeys, targetKeys]
  );

  const onChange = useCallback(
    (direction: Direction) => {
      const otherDirection = getOppositeDirection(direction);
      const transferredKeys = getSingleDirectionSelectedKeys(otherDirection);

      setSelectedKeys(
        selectedKeys.filter(item => !transferredKeys.includes(item))
      );
      setTargetKeys(
        Direction.Right === direction
          ? transferredKeys.concat(targetKeys)
          : targetKeys.filter(item => !transferredKeys.includes(item))
      );
    },
    [getSingleDirectionSelectedKeys, selectedKeys, targetKeys]
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
    selectedKeys,
    onChange,
    onSelectChange,
  };
};
