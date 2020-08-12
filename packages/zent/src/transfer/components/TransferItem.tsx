import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import cx from 'classnames';

import pick from '../../utils/pick';
import {
  Grid,
  Input,
  Checkbox,
  IGridColumn,
  I18nReceiver as Receiver,
  II18nLocaleTransfer,
  MiniPagination,
} from '../../index';
import { ITransferItem, ITransferData } from '../types';
import { PassDownGridProps } from '../constants';

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
  list,
  pagination,
  disabled: compontentDisabled,
}) => {
  const { columns, selection, ...gridRest } = list;
  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState(dataSets);
  const [pageCurrent, setPageCurrent] = useState(1);

  const classNamePrefix = `${prefix}__item`;
  const pageSize = typeof pagination === 'object' ? pagination.pageSize : 10;
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
    (data: ITransferData) => {
      const { [keyName]: key, disabled } = data;
      !disabled &&
        !compontentDisabled &&
        handleSelectChange(
          selectedKeys.includes(key)
            ? selectedKeys.filter(item => key !== item)
            : selectedKeys.concat(key)
        );
    },
    [handleSelectChange, selectedKeys, keyName, compontentDisabled]
  );

  const currentPageData = useMemo(() => {
    if (!pagination) {
      return listData;
    }
    return listData.slice(
      pageCurrent * pageSize - pageSize,
      pageCurrent * pageSize
    );
  }, [listData, pageCurrent, pagination, pageSize]);

  const handlePageChange = useCallback(({ current }) => {
    setPageCurrent(current);
  }, []);

  const girdColumns = useMemo(() => {
    const res = columns[0]?.title
      ? columns
      : columns.map(item => ({ ...item, title: '' }));
    return res as IGridColumn<any>[];
  }, [columns]);

  useEffect(() => {
    setListData(
      showSearch && filterOption
        ? dataSets.filter(item => filterOption(inputVal, item))
        : dataSets
    );
  }, [dataSets, filterOption, inputVal, showSearch]);

  useEffect(() => {
    if (pagination && listData.length) {
      const maxPageCount = Math.ceil(listData.length / pageSize);
      if (pageCurrent > maxPageCount) {
        setPageCurrent(maxPageCount);
      }
    }
  }, [listData, pageCurrent, pageSize, pagination]);

  return (
    <Receiver componentName="Transfer">
      {(i18n: II18nLocaleTransfer) => {
        return (
          <div
            className={cx(classNamePrefix, {
              [`${classNamePrefix}--disabled`]: compontentDisabled,
            })}
          >
            <div className={`${classNamePrefix}__allCheckbox`}>
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={handleCheckBoxChange}
              >
                {getTitle(i18n)}
              </Checkbox>
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
              rowKey={keyName}
              className={cx(`${classNamePrefix}__grid`, {
                [`${classNamePrefix}__header--hidden`]:
                  false === !!columns[0]?.title,
              })}
              rowClassName={cx(`${classNamePrefix}__grid__row`, {
                [`${classNamePrefix}__grid__row--disabled`]: compontentDisabled,
              })}
              datasets={currentPageData}
              selection={{
                selectedRowKeys: selectedKeys,
                onSelect: handleSelectChange,
                getCheckboxProps:
                  selection?.getCheckboxProps || getCheckboxProps,
              }}
              columns={girdColumns}
              onRowClick={handleRowClick}
              emptyLabel={i18n.emptyLabel}
              scroll={{ y: 240 }}
              {...pick(gridRest, PassDownGridProps)}
            />
            {pagination && listData.length ? (
              <MiniPagination
                className={`${classNamePrefix}__pagination`}
                current={pageCurrent}
                pageSize={pageSize}
                total={listData.length}
                onChange={handlePageChange}
              />
            ) : null}
          </div>
        );
      }}
    </Receiver>
  );
};

export default TransferItem;
