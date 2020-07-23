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
import { ITransferItem } from '../types';
import { pickGridProps } from '../constants';
import { pick } from '../utils';

const TransferItem: React.FC<ITransferItem> = ({
  prefix,
  title,
  datasets,
  selectedRowKeys,
  changeSelectedRowKeys,
  rowKey,
  filterOption,
  showSearch,
  columns,
  searchPlaceholder,
  onRowClick,
  direction,
  selection,
  ...rest
}) => {
  const classNamePrefix = `${prefix}__item`;
  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState(datasets);
  const checked =
    selectedRowKeys.length &&
    selectedRowKeys.length ===
      listData.filter(({ disabled }) => !disabled).length;
  const indeterminate = selectedRowKeys.length && !checked;

  const onSelect = useCallback(
    keys => {
      changeSelectedRowKeys(keys);
    },
    [changeSelectedRowKeys]
  );

  const getCheckboxProps = ({ disabled }: { disabled: boolean }) => ({
    disabled,
  });

  const changeCheckBox = useCallback(() => {
    if (selectedRowKeys.length === 0 || indeterminate) {
      changeSelectedRowKeys(
        listData
          .filter(({ disabled }) => !disabled)
          .map(({ [rowKey]: key }) => key)
      );
      return;
    }
    changeSelectedRowKeys([]);
  }, [changeSelectedRowKeys, listData, indeterminate, selectedRowKeys, rowKey]);

  const changeInput = useCallback(e => {
    const val = e.target.value;
    setInputVal(val);
  }, []);

  const getTitle = useCallback(
    ({ item, items }) => {
      const totalText = `${listData.length} ${
        listData.length > 1 ? items : item
      }`;

      if (selectedRowKeys.length > 0) {
        return title
          ? `${title}（${selectedRowKeys.length}/${totalText}）`
          : `${selectedRowKeys.length}/${totalText}`;
      }
      return title ? `${title}（${totalText}）` : totalText;
    },
    [title, listData, selectedRowKeys]
  );

  const handleRowClick = useCallback(
    (data, index, event) => {
      const key = data[rowKey];
      onRowClick && onRowClick(data, index, event);
      changeSelectedRowKeys(
        selectedRowKeys.includes(key)
          ? selectedRowKeys.filter(item => key !== item)
          : selectedRowKeys.concat(key)
      );
    },
    [onRowClick, changeSelectedRowKeys, selectedRowKeys, rowKey]
  );

  useEffect(() => {
    setListData(
      showSearch && filterOption
        ? datasets.filter(item => filterOption(inputVal, item))
        : datasets
    );
  }, [datasets, filterOption, inputVal, showSearch]);

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
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={changeCheckBox}
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
                  onChange={changeInput}
                  value={inputVal}
                  showClear
                />
              </div>
            )}
            <Grid
              rowKey={rowKey}
              className={cx(`${classNamePrefix}__grid`, {
                [`${classNamePrefix}__header--hidden`]:
                  false === !!columns[0]?.title,
              })}
              rowClassName={`${classNamePrefix}__grid__row`}
              datasets={listData}
              selection={{
                selectedRowKeys,
                onSelect,
                getCheckboxProps,
                ...selection,
              }}
              columns={girdColumns}
              onRowClick={handleRowClick}
              emptyLabel={i18n.emptyLabel}
              {...pick(rest, pickGridProps)}
            />
          </div>
        );
      }}
    </Receiver>
  );
};

TransferItem.defaultProps = {
  scroll: { y: 240, x: 0 },
};

export default TransferItem;
