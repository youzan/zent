import * as React from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import cx from 'classnames';

import { ITransfer, TransferColumnType } from './types';
import { Direction } from './constants';
import TransferItem from './components/TransferItem';
import ArrowButton from './components/ArrowButton';

export const Transfer: React.FC<ITransfer> = ({
  datasets,
  targetKeys,
  selectedRowKeys,
  titles,
  transferChange,
  rowKey,
  prefix,
  columns,
  className,
  ...rest
}) => {
  const classNamePrefix = `${prefix}-transfer`;
  const [selectedRowKeysState, setSelectedRowKeys] = useState(selectedRowKeys);

  const singleDirectionData = useCallback(
    direction => {
      return datasets.filter(({ [rowKey]: key }) =>
        Direction.left === direction
          ? !targetKeys.includes(key)
          : targetKeys.includes(key)
      );
    },
    [datasets, rowKey, targetKeys]
  );

  const singleDirectionSelectedRowKeys = useCallback(
    (direction: Direction) =>
      selectedRowKeysState.filter(key =>
        Direction.left === direction
          ? !targetKeys.includes(key)
          : targetKeys.includes(key)
      ),
    [selectedRowKeysState, targetKeys]
  );

  const getOtherDirection = useCallback(
    (direction: Direction) =>
      Direction.left === direction ? Direction.right : Direction.left,
    []
  );

  const changeSelectedRowKeys = useCallback(
    direction => (keys: string[]) => {
      const otherDirectionSelectedRowKeys = singleDirectionSelectedRowKeys(
        getOtherDirection(direction)
      );
      setSelectedRowKeys(keys.concat(otherDirectionSelectedRowKeys));
    },
    [singleDirectionSelectedRowKeys, getOtherDirection]
  );

  const commonProps = {
    prefix: classNamePrefix,
    rowKey,
    ...rest,
  };

  const getColumns = useCallback(
    (direction: Direction) => {
      if (Direction.left === direction) {
        return (Array.isArray(columns[0])
          ? columns[0]
          : columns) as TransferColumnType;
      }
      return (Array.isArray(columns[0])
        ? columns[1]
        : columns) as TransferColumnType;
    },
    [columns]
  );

  const transferItemProps = useMemo(() => {
    return {
      [Direction.left]: {
        direction: Direction.left,
        title: titles[0],
        datasets: singleDirectionData(Direction.left),
        selectedRowKeys: singleDirectionSelectedRowKeys(Direction.left),
        changeSelectedRowKeys: changeSelectedRowKeys(Direction.left),
        columns: getColumns(Direction.left),
      },
      [Direction.right]: {
        direction: Direction.right,
        title: titles[1],
        datasets: singleDirectionData(Direction.right),
        selectedRowKeys: singleDirectionSelectedRowKeys(Direction.right),
        changeSelectedRowKeys: changeSelectedRowKeys(Direction.right),
        columns: getColumns(Direction.right),
      },
    };
  }, [
    titles,
    singleDirectionData,
    singleDirectionSelectedRowKeys,
    changeSelectedRowKeys,
    getColumns,
  ]);

  const transferSelectedKeys = useCallback(
    (direction: Direction) => () => {
      const otherDirection = getOtherDirection(direction);
      const transferredKeys = singleDirectionSelectedRowKeys(otherDirection);
      const directionData = singleDirectionData(direction);
      const transferredData = singleDirectionData(
        otherDirection
      ).filter(({ [rowKey]: key }) => transferredKeys.includes(key));
      const otherDirectionExcludeTransferredData = singleDirectionData(
        otherDirection
      ).filter(({ [rowKey]: key }) => !transferredKeys.includes(key));
      const result = {
        [Direction.right]: {
          datasets: otherDirectionExcludeTransferredData.concat(
            transferredData,
            directionData
          ),
          targetKeys: transferredKeys.concat(targetKeys),
        },
        [Direction.left]: {
          datasets: transferredData.concat(
            directionData,
            otherDirectionExcludeTransferredData
          ),
          targetKeys: targetKeys.filter(
            item => !transferredKeys.includes(item)
          ),
        },
      };
      const selectKeys = selectedRowKeysState.filter(
        item => !transferredKeys.includes(item)
      );

      setSelectedRowKeys(selectKeys);
      transferChange({
        ...result[direction],
        selectedRowKeys: selectKeys,
        direction,
      });
    },
    [
      singleDirectionData,
      singleDirectionSelectedRowKeys,
      getOtherDirection,
      rowKey,
      selectedRowKeysState,
      targetKeys,
      transferChange,
    ]
  );

  const getArrowButton = useCallback(
    direction => (
      <div className={`${classNamePrefix}__arrow__item`}>
        <ArrowButton
          disabled={
            !singleDirectionSelectedRowKeys(getOtherDirection(direction)).length
          }
          direction={direction}
          onChange={transferSelectedKeys(direction)}
          prefix={classNamePrefix}
        />
      </div>
    ),
    [
      transferSelectedKeys,
      singleDirectionSelectedRowKeys,
      getOtherDirection,
      classNamePrefix,
    ]
  );

  useEffect(() => {
    setSelectedRowKeys(
      Array.from(new Set([...selectedRowKeys, ...selectedRowKeysState]))
    );
  }, [selectedRowKeys]); // eslint-disable-line

  return (
    <div className={cx(`${classNamePrefix}`, className)}>
      <TransferItem {...commonProps} {...transferItemProps[Direction.left]} />
      <div className={`${classNamePrefix}__arrow`}>
        {getArrowButton(Direction.right)}
        {getArrowButton(Direction.left)}
      </div>
      <TransferItem {...commonProps} {...transferItemProps[Direction.right]} />
    </div>
  );
};

Transfer.defaultProps = {
  prefix: 'zent',
  titles: ['Source', 'Target'],
  targetKeys: [],
  selectedRowKeys: [],
  className: '',
  showSearch: false,
  searchPlaceholder: '',
};
