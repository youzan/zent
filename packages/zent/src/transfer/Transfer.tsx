import { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import cx from 'classnames';

import pick from '../utils/pick';
import { TransferColumnType, ITransferItem, TransferType } from './types';
import { Direction, ListProps } from './constants';
import TransferItem from './components/TransferItem';
import ArrowButton from './components/ArrowButton';
import {
  getOppositeDirection,
  getSingleDirectionSelectedKeysExcludeDisabled,
  getDisabledKeys,
} from './utils';
import { DisabledContext } from '../disabled';

export const Transfer: React.FC<TransferType> = ({
  keyName,
  dataSource,
  targetKeys,
  onChange,
  selectedKeys: selectedKeysProp,
  onSelectChange,
  titles,
  showSearch,
  searchPlaceholder,
  filterOption,
  children,
  list,
  pagination,
  disabled: compontentDisabled,
  className,
}) => {
  const classNamePrefix = 'zent-transfer';
  const [selectedKeysState, setSelectedKeys] = useState(selectedKeysProp);
  const { value } = useContext(DisabledContext);
  const disabled = compontentDisabled ?? value;
  const disabledKeys = useMemo(() => getDisabledKeys(dataSource, keyName), [
    dataSource,
    keyName,
  ]);

  const getListProps = useCallback(
    (direction: Direction) => {
      if (!Array.isArray(list)) {
        return list;
      }
      return Direction.Left === direction ? list[0] : list[1];
    },
    [list]
  );

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
      const { columns } = getListProps(direction);
      const col = Direction.Left === direction ? columns?.[0] : columns?.[1];

      return (Array.isArray(columns?.[0])
        ? col
        : columns) as TransferColumnType;
    },
    [getListProps]
  );

  const getRenderList = useCallback(
    (props: ITransferItem): React.ReactNode => {
      const {
        direction,
        selectedKeys,
        handleSelectChange,
        title,
        keyName,
        dataSets,
        showSearch,
        searchPlaceholder,
        filterOption,
        list,
        prefix,
      } = props;
      const childrenNode =
        children &&
        children({
          direction,
          selectedKeys,
          handleSelectChange,
        });
      return (
        childrenNode ?? (
          <TransferItem
            title={title}
            direction={direction}
            keyName={keyName}
            dataSets={dataSets}
            selectedKeys={selectedKeys}
            handleSelectChange={handleSelectChange}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            filterOption={filterOption}
            list={list}
            prefix={prefix}
            pagination={pagination}
            disabled={disabled}
          />
        )
      );
    },
    [children, pagination, disabled]
  );

  const handleTransfer = useCallback(
    (direction: Direction) => () => {
      const transferredKeys = getSingleDirectionSelectedKeysExcludeDisabled({
        direction: getOppositeDirection(direction),
        selectedKeys: selectedKeysState,
        targetKeys,
        disabledKeys,
      });
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
    [selectedKeysState, targetKeys, onChange, disabledKeys]
  );

  const getArrowButton = useCallback(
    (direction: Direction) => (
      <div className={`${classNamePrefix}__arrow__item`}>
        <ArrowButton
          disabled={
            disabled ||
            !getSingleDirectionSelectedKeysExcludeDisabled({
              direction: getOppositeDirection(direction),
              selectedKeys: selectedKeysState,
              targetKeys,
              disabledKeys,
            }).length
          }
          direction={direction}
          onChange={handleTransfer(direction)}
          prefix={classNamePrefix}
        />
      </div>
    ),
    [
      handleTransfer,
      classNamePrefix,
      disabled,
      targetKeys,
      selectedKeysState,
      disabledKeys,
    ]
  );

  useEffect(() => {
    setSelectedKeys(selectedKeysProp);
  }, [selectedKeysProp]);

  return (
    <div className={cx(`${classNamePrefix}`, className)}>
      {getRenderList({
        title: titles?.[0],
        direction: Direction.Left,
        keyName,
        dataSets: useMemo(() => getSingleDirectionData(Direction.Left), [
          getSingleDirectionData,
        ]),
        selectedKeys: getSingleDirectionSelectedKeys(Direction.Left),
        handleSelectChange: handleSelectChange(Direction.Left),
        showSearch,
        searchPlaceholder,
        filterOption,
        list: {
          columns: getColumns(Direction.Left),
          ...pick(getListProps(Direction.Left), ListProps),
        },
        prefix: classNamePrefix,
        pagination,
        disabled,
      })}
      <div className={`${classNamePrefix}__arrow`}>
        {getArrowButton(Direction.Right)}
        {getArrowButton(Direction.Left)}
      </div>
      {getRenderList({
        title: titles?.[1],
        direction: Direction.Right,
        keyName,
        dataSets: useMemo(() => getSingleDirectionData(Direction.Right), [
          getSingleDirectionData,
        ]),
        selectedKeys: getSingleDirectionSelectedKeys(Direction.Right),
        handleSelectChange: handleSelectChange(Direction.Right),
        showSearch,
        searchPlaceholder,
        filterOption,
        list: {
          columns: getColumns(Direction.Right),
          ...pick(getListProps(Direction.Right), ListProps),
        },
        prefix: classNamePrefix,
        pagination,
        disabled,
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
  pagination: false,
};

export default Transfer;
