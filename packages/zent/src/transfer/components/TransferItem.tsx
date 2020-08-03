import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import cx from 'classnames';

import {
  Grid,
  Input,
  Checkbox,
  IGridColumn,
  I18nReceiver as Receiver,
  II18nLocaleTransfer,
} from '../../index';
import { ITransferItem, ITransferData } from '../types';
import { GridProps } from '../constants';
import { pick } from '../utils';

const TransferItem: React.FC<ITransferItem> = ({
  prefix,
  title,
  dataSets,
  selectedKeys,
  handleSelectChange,
  keyName,
  filterOption,
  showSearch,
  searchPlaceholder,
  grid,
}) => {
  const { rowKey, columns, selection, onRowClick, ...gridRest } = grid;
  const classNamePrefix = `${prefix}__item`;
  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState(dataSets);
  const allChecked =
    selectedKeys.length &&
    selectedKeys.length === listData.filter(({ disabled }) => !disabled).length;
  const indeterminate = selectedKeys.length && !allChecked;

  const getCheckboxProps = ({ disabled }: { disabled: boolean }) => ({
    disabled,
  });

  const handleCheckBoxChange = useCallback(() => {
    handleSelectChange(
      selectedKeys.length === 0 || indeterminate
        ? listData
            .filter(({ disabled }) => !disabled)
            .map(({ [keyName]: key }) => key)
        : []
    );
  }, [handleSelectChange, listData, indeterminate, selectedKeys, keyName]);

  const handleInputChange = useCallback(e => {
    const val = e.target.value;
    setInputVal(val);
  }, []);

  const getTitle = useCallback(
    ({ item, items }) => {
      const totalText = `${listData.length} ${
        listData.length > 1 ? items : item
      }`;

      if (selectedKeys.length > 0) {
        return title
          ? `${title}（${selectedKeys.length}/${totalText}）`
          : `${selectedKeys.length}/${totalText}`;
      }
      return title ? `${title}（${totalText}）` : totalText;
    },
    [title, listData, selectedKeys]
  );

  const handleRowClick = useCallback(
    (
      data: ITransferData,
      index: number,
      event: React.MouseEvent<HTMLTableRowElement>
    ) => {
      const { [keyName]: key, disabled } = data;
      onRowClick
        ? onRowClick(data, index, event)
        : !disabled &&
          handleSelectChange(
            selectedKeys.includes(key)
              ? selectedKeys.filter(item => key !== item)
              : selectedKeys.concat(key)
          );
    },
    [onRowClick, handleSelectChange, selectedKeys, keyName]
  );

  useEffect(() => {
    setListData(
      showSearch && filterOption
        ? dataSets.filter(item => filterOption(inputVal, item))
        : dataSets
    );
  }, [dataSets, filterOption, inputVal, showSearch]);

  const girdColumns = useMemo(() => {
    const res = columns[0]?.title
      ? columns
      : columns.map(item => ({ ...item, title: '' }));
    return res as IGridColumn<any>[];
  }, [columns]);

  return (
    <Receiver componentName="Transfer">
      {(i18n: II18nLocaleTransfer) => {
        return (
          <div className={classNamePrefix}>
            <div className={`${classNamePrefix}__allCheckbox`}>
              {columns[0]?.title ? (
                getTitle(i18n)
              ) : (
                <Checkbox
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onChange={handleCheckBoxChange}
                >
                  {getTitle(i18n)}
                </Checkbox>
              )}
            </div>

            {showSearch && (
              <div className={`${classNamePrefix}__search`}>
                <Input
                  placeholder={searchPlaceholder || i18n.placeholder}
                  icon="search"
                  onChange={handleInputChange}
                  value={inputVal}
                  showClear
                />
              </div>
            )}
            <Grid
              rowKey={rowKey || keyName}
              className={cx(`${classNamePrefix}__grid`, {
                [`${classNamePrefix}__header--hidden`]:
                  false === !!columns[0]?.title,
              })}
              rowClassName={`${classNamePrefix}__grid__row`}
              datasets={listData}
              selection={{
                selectedRowKeys: selectedKeys,
                onSelect: handleSelectChange,
                getCheckboxProps:
                  getCheckboxProps || selection?.getCheckboxProps,
              }}
              columns={girdColumns}
              onRowClick={handleRowClick}
              emptyLabel={i18n.emptyLabel}
              scroll={{ y: 240, x: 0 }}
              {...pick(gridRest, GridProps)}
            />
          </div>
        );
      }}
    </Receiver>
  );
};

export default TransferItem;
