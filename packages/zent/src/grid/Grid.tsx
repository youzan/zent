import * as React from 'react';

import { Column, UseTableCellProps } from 'react-table';
import classnames from 'classnames';
import { WindowScrollHandler } from '../utils/component/WindowScrollHandler';
import ColGroup from './ColGroup';
import Tr from './ui/Tr';
import Td from './ui/Td';
import Footer from './Footer';
import { clsPrefix, defaultPageInfo } from './constants';
import {
  IGridProps,
  IGridOnChangeConfig,
  BaseGridInnerColumnsType,
} from './types';
import BatchComponents from './Footer/BatchOperator';
import useGrid from './hooks/useGrid';

export function Grid<Data = any>(props: IGridProps) {
  const {
    rowKey,
    datasets,
    rowClassName,
    onRowClick,
    batchRender,
    pageInfo = defaultPageInfo,
    onChange,
    paginationType,
    selection,
    expandation,
    ellipsis,
    autoStick,
    sortType,
    sortBy,
  } = props;

  const tableRef = React.useRef<HTMLDivElement>();

  const instance = useGrid(props, tableRef);

  const {
    rows,
    prepareRow,
    getTableProps,
    getTableBodyProps,
    setPageSize,
    gotoPage,
    visibleColumns,
    toggleAllRowsSelected,
    headerGroups,
    state: { pageSize, pageIndex, selectedRowIds },
    selectedFlatRows,
    tableContainerProps,
  } = instance;

  const currentPage = React.useMemo(() => {
    return pageIndex + 1;
  }, [pageIndex]);

  const handleOnChange = React.useCallback(
    (gridChangeConf: IGridOnChangeConfig) => {
      const {
        pageSize: currentPageSize = pageSize,
        current = currentPage,
        sortType,
        sortBy,
      } = gridChangeConf;
      if (currentPageSize && pageSize !== currentPageSize) {
        setPageSize(currentPageSize);
      }

      if (current && currentPage !== current) {
        gotoPage(current - 1);
      }

      if (onChange) {
        const config: IGridOnChangeConfig = {
          current,
          pageSize,
        };

        sortBy && (config.sortBy = sortBy);
        sortType && (config.sortType = sortType);

        onChange(config);
      }
    },
    [pageSize, currentPage, onChange, setPageSize, gotoPage]
  );

  const handleOnSortTypeClick = React.useCallback(
    sortChangeConfig => {
      handleOnChange({
        ...sortChangeConfig,
      });
    },
    [handleOnChange]
  );

  const selectedRows = React.useMemo(() => {
    return selectedFlatRows?.map(item => item.original);
  }, [selectedFlatRows]);

  const getBatchRender = React.useCallback(
    (position: string) => {
      const handleOnSelect = (type: string) => {
        if (type === 'selectAll') {
          toggleAllRowsSelected(true);
        } else {
          toggleAllRowsSelected(false);
        }
        const selectedRowKeys = Object.keys(selectedRowIds);
        selection.onSelect(selectedRowKeys, selectedRows, selectedRows);
      };
      return (
        batchRender && (
          <>
            <BatchComponents
              selection={selection}
              batchRender={batchRender}
              position={position}
              datasets={datasets}
              rowKey={rowKey}
              onSelect={handleOnSelect}
              selectedRows={selectedRows}
            />
          </>
        )
      );
    },
    [
      batchRender,
      datasets,
      rowKey,
      selectedRowIds,
      selectedRows,
      selection,
      toggleAllRowsSelected,
    ]
  );

  const headerClx = React.useMemo(() => {
    return classnames(`${clsPrefix}-thead`, {
      [`${clsPrefix}-thead-fixed`]: autoStick,
    });
  }, [autoStick]);

  const tableCls = React.useMemo(() => {
    return classnames(`${clsPrefix}-table`, {
      [`${clsPrefix}-table-ellipsis`]: ellipsis,
    });
  }, [ellipsis]);

  return (
    <div {...tableContainerProps}>
      <div className={`${clsPrefix}-container`} ref={tableRef}>
        <table className={tableCls} {...getTableProps()}>
          <ColGroup
            columns={(visibleColumns as unknown) as BaseGridInnerColumnsType[]}
          />
          <thead className={headerClx}>
            {headerGroups.map((headerGroup, rowIndex) => {
              return (
                <Tr
                  rowClassName={rowClassName}
                  key={rowIndex}
                  record={headerGroup}
                  rowIndex={rowIndex}
                >
                  {headerGroup.headers.map((header, idx: number) => {
                    const headerProps = header.getHeaderProps({
                      sortBy,
                      sortType,
                      handleOnSortTypeClick,
                    });

                    return (
                      <Td
                        {...headerProps}
                        type="th"
                        column={header}
                        sortType={sortType}
                        sortBy={sortBy}
                        key={idx}
                      >
                        {header.render('Header')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              console.log(rows);
              prepareRow(row);
              return (
                <React.Fragment key={row.original[rowKey] || rowIndex}>
                  <Tr
                    key={row.original[rowKey] || rowIndex}
                    rowClassName={rowClassName}
                    record={row}
                    rowIndex={rowIndex}
                    onRowClick={onRowClick}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell: UseTableCellProps<Column>, idx) => {
                      const column = (visibleColumns[
                        idx
                      ] as unknown) as BaseGridInnerColumnsType;
                      const { rowSpan } = column;
                      const cellProps = cell.getCellProps();
                      return (
                        <Td
                          {...cellProps}
                          type="td"
                          key={`td-${cell.id}-${idx}`}
                          column={column}
                          rowSpan={rowSpan}
                        >
                          {cell.render('Cell')}
                        </Td>
                      );
                    })}
                  </Tr>
                  {/* {row.isExpanded && expandation?.expandRender
                    ? expandation?.expandRender(row.original)
                    : null} */}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer
        batchRender={() => getBatchRender('foot')}
        pageInfo={pageInfo}
        onChange={handleOnChange}
        paginationType={paginationType}
      />
      <WindowScrollHandler
        onScroll={instance?.getScrollProps()?.onScroll}
        options={{ capture: true }}
      />
    </div>
  );
}
