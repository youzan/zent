import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import cx from 'classnames';

import uniq from '../utils/uniq';
import pick from '../utils/pick';
import { TransferColumnType, ITransferItem, TransferType } from './types';
import { Direction, GridProps } from './constants';
import TransferItem from './components/TransferItem';
import ArrowButton from './components/ArrowButton';
import { getOppositeDirection } from './utils';

export const Transfer: React.FC<TransferType> = ({
  keyName,
  dataSource,
  targetKeys,
  onChange,
  selectedKeys,
  onSelectChange,
  titles,
  showSearch,
  searchPlaceholder,
  filterOption,
  children,
  grid,
  className,
  prefix,
}) => {
  const { columns, ...gridRest } = grid;
  const classNamePrefix = `${prefix}-transfer`;
  const [selectedKeysState, setSelectedKeys] = useState(selectedKeys);

  const getSingleDirectionData = useCallback(
    (direction: Direction) =>
      Direction.Left === direction
        ? dataSource.filter(({ [keyName]: key }) => !targetKeys.includes(key))
        : targetKeys.map(item =>
            dataSource.find(({ [keyName]: key }) => item === key)
          ),
    [dataSource, keyName, targetKeys]
  );

  const getSingleDirectionSelectedKeys = useCallback(
    (direction: Direction) =>
      selectedKeysState.filter(key =>
        Direction.Left === direction
          ? !targetKeys.includes(key)
          : targetKeys.includes(key)
      ),
    [selectedKeysState, targetKeys]
  );

  const handleSelectChange = useCallback(
    (direction: Direction) => (keys: string[]) => {
      const selectedKeys = keys.concat(
        getSingleDirectionSelectedKeys(getOppositeDirection(direction))
      );
      onSelectChange
        ? onSelectChange(selectedKeys)
        : setSelectedKeys(selectedKeys);
    },
    [getSingleDirectionSelectedKeys, onSelectChange]
  );

  const getColumns = useCallback(
    (direction: Direction) => {
      const col = Direction.Left === direction ? columns?.[0] : columns?.[1];

      return (Array.isArray(columns?.[0])
        ? col
        : columns) as TransferColumnType;
    },
    [columns]
  );

  const getRenderList = useCallback(
    (props: ITransferItem): React.ReactNode => {
      const { direction, selectedKeys, handleSelectChange } = props;
      const childrenNode =
        children &&
        children({
          direction,
          selectedKeys,
          handleSelectChange,
        });
      return childrenNode ? childrenNode : <TransferItem {...props} />;
    },
    [children]
  );

  const handleTransfer = useCallback(
    (direction: Direction) => () => {
      const otherDirection = getOppositeDirection(direction);
      const transferredKeys = getSingleDirectionSelectedKeys(otherDirection);
      const selectedKeys = selectedKeysState.filter(
        item => !transferredKeys.includes(item)
      );

      setSelectedKeys(selectedKeys);
      onChange({
        targetKeys:
          Direction.Right === direction
            ? transferredKeys.concat(targetKeys)
            : targetKeys.filter(item => !transferredKeys.includes(item)),
        direction,
        transferredKeys,
        selectedKeys,
      });
    },
    [getSingleDirectionSelectedKeys, selectedKeysState, targetKeys, onChange]
  );

  const getArrowButton = useCallback(
    (direction: Direction) => (
      <div className={`${classNamePrefix}__arrow__item`}>
        <ArrowButton
          disabled={
            !getSingleDirectionSelectedKeys(getOppositeDirection(direction))
              .length
          }
          direction={direction}
          onChange={handleTransfer(direction)}
          prefix={classNamePrefix}
        />
      </div>
    ),
    [handleTransfer, getSingleDirectionSelectedKeys, classNamePrefix]
  );

  useEffect(() => {
    setSelectedKeys(preState => uniq([...selectedKeys, ...preState]));
  }, [selectedKeys]);

  return (
    <div className={cx(`${classNamePrefix}`, className)}>
      {getRenderList({
        title: titles?.[0],
        direction: Direction.Left,
        keyName,
        dataSets: getSingleDirectionData(Direction.Left),
        selectedKeys: getSingleDirectionSelectedKeys(Direction.Left),
        handleSelectChange: handleSelectChange(Direction.Left),
        showSearch,
        searchPlaceholder,
        filterOption,
        grid: {
          columns: getColumns(Direction.Left),
          ...pick(gridRest, GridProps),
        },
        prefix: classNamePrefix,
      })}
      <div className={`${classNamePrefix}__arrow`}>
        {getArrowButton(Direction.Right)}
        {getArrowButton(Direction.Left)}
      </div>
      {getRenderList({
        title: titles?.[1],
        direction: Direction.Right,
        keyName,
        dataSets: getSingleDirectionData(Direction.Right),
        selectedKeys: getSingleDirectionSelectedKeys(Direction.Right),
        handleSelectChange: handleSelectChange(Direction.Right),
        showSearch,
        searchPlaceholder,
        filterOption,
        grid: {
          columns: getColumns(Direction.Right),
          ...pick(gridRest, GridProps),
        },
        prefix: classNamePrefix,
      })}
    </div>
  );
};

Transfer.defaultProps = {
  titles: ['Source', 'Target'],
  targetKeys: [],
  selectedKeys: [],
  showSearch: false,
  searchPlaceholder: '',
  className: '',
  prefix: 'zent',
};

export default Transfer;
