import { useState, useCallback, useEffect, useMemo } from 'react';
import cx from 'classnames';

import pick from '../../utils/pick';
import Grid, { IGridColumn } from '../../grid';
import { I18nReceiver as Receiver, II18nLocaleTransfer } from '../../i18n';
import MiniPagination from '../../pagination/MiniPagination';
import { ITransferItem, ITransferData } from '../types';
import { PassDownGridProps } from '../constants';
import { getDisabledKeys } from '../utils';
import Search from './Search';
import AllCheckBox from './AllCheckBox';

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
  const classNamePrefix = `${prefix}__item`;
  const pageSize = typeof pagination === 'object' ? pagination.pageSize : 10;
  const { columns, selection, ...gridRest } = list;

  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState(dataSets);
  const [pageCurrent, setPageCurrent] = useState(1);

  const disabledKeys = useMemo(() => getDisabledKeys(listData, keyName), [
    listData,
    keyName,
  ]);
  const selectedKeysLength = useMemo(
    () => selectedKeys.filter(key => !disabledKeys.includes(key)).length,
    [disabledKeys, selectedKeys]
  );
  const isAllChecked = useMemo(
    () =>
      selectedKeysLength &&
      selectedKeysLength ===
        listData.filter(({ disabled }) => !disabled).length,
    [listData, selectedKeysLength]
  );

  const getCheckboxProps = useCallback(
    ({ disabled }: { disabled: boolean }) => ({
      disabled: compontentDisabled || disabled,
    }),
    [compontentDisabled]
  );

  const handleCheckBoxChange = useCallback(() => {
    const items = listData.map(({ [keyName]: key }) => key);

    handleSelectChange(
      items.filter(key =>
        isAllChecked
          ? disabledKeys.includes(key) && selectedKeys.includes(key)
          : !disabledKeys.includes(key) || selectedKeys.includes(key)
      )
    );
  }, [
    handleSelectChange,
    listData,
    selectedKeys,
    keyName,
    disabledKeys,
    isAllChecked,
  ]);

  const handleInputChange = useCallback(e => {
    const val = e.target.value;
    setInputVal(val);
  }, []);

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

  const handlePageChange = useCallback(({ current }) => {
    setPageCurrent(current);
  }, []);

  const currentPageData = useMemo(() => {
    if (!pagination) {
      return listData;
    }
    return listData.slice(
      pageCurrent * pageSize - pageSize,
      pageCurrent * pageSize
    );
  }, [listData, pageCurrent, pagination, pageSize]);

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
            <AllCheckBox
              classNamePrefix={classNamePrefix}
              isAllChecked={isAllChecked}
              handleCheckBoxChange={handleCheckBoxChange}
              compontentDisabled={compontentDisabled}
              i18n={i18n}
              selectedKeysLength={selectedKeysLength}
              listDataLength={listData.length}
              title={title}
            />
            <Search
              showSearch={showSearch}
              searchPlaceholder={searchPlaceholder}
              handleInputChange={handleInputChange}
              inputVal={inputVal}
              classNamePrefix={classNamePrefix}
              i18n={i18n}
            />
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
