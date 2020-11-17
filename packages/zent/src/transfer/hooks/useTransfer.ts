import { useState, useCallback } from 'react';

import { Direction } from '../constants';
import {
  getOppositeDirection,
  getSingleDirectionSelectedKeysExcludeDisabled,
} from '../utils';
import { ITransferHookParams, ITransferHookResult } from '../types';

export default function useTransfer(
  params?: ITransferHookParams
): ITransferHookResult {
  const {
    targetKeys: defaultTargetKeys = [],
    selectedKeys: defaultSelectedKeys = [],
    disabledKeys = [],
  } = params || {};
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

  const transferKeys = useCallback(
    (direction: Direction) => {
      const transferredKeys = getSingleDirectionSelectedKeysExcludeDisabled({
        direction: getOppositeDirection(direction),
        selectedKeys,
        targetKeys,
        disabledKeys,
      });

      setSelectedKeys(
        selectedKeys.filter(item => !transferredKeys.includes(item))
      );
      setTargetKeys(
        Direction.Right === direction
          ? transferredKeys.concat(targetKeys)
          : targetKeys.filter(item => !transferredKeys.includes(item))
      );
    },
    [selectedKeys, targetKeys, disabledKeys]
  );

  const changeSelectedKeys = useCallback(
    (direction: Direction, keys: string[]) => {
      setSelectedKeys(
        keys.concat(
          getSingleDirectionSelectedKeys(getOppositeDirection(direction))
        )
      );
    },
    [getSingleDirectionSelectedKeys]
  );

  const resetSelectedKeys = useCallback((keys: string[]) => {
    setSelectedKeys(keys);
  }, []);

  const resetTargetKeys = useCallback((keys: string[]) => {
    setTargetKeys(keys);
  }, []);

  return {
    targetKeys,
    selectedKeys,
    transferKeys,
    changeSelectedKeys,
    resetSelectedKeys,
    resetTargetKeys,
  };
}
