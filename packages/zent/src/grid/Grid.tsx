import * as React from 'react';
import { useTable, UseRowSelectInstanceProps } from 'react-table';
import classnames from 'classnames';
import { WindowScrollHandler } from '../utils/component/WindowScrollHandler';
import {
  IGridProps,
  IGridOnChangeConfig,
  IGridColumn,
  IGridFixedPosition,
  GridSortType,
} from './types';
import ColGroup from './ColGroup';
import Tr from './ui/Tr';
import Td from './ui/Td';
import MeasureCell from './ui/MeasureCell';
import Footer from './Footer';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import useColumns from './hooks/useColumns';
import useHeaderGroups from './hooks/useHeaderGroups';
import { getHooks, getFixedPosition } from './utils';
// import { defaultPageInfo } from './constants';

const prefix = 'zent';

export function Grid<Data = any>(props: IGridProps) {
  const {
    rowKey,
    datasets,
    rowClassName,
    onRowClick,
    batchRender,
    pageInfo,
    onChange,
    paginationType,
    scroll,
    selection,
    sortType,
    sortBy,
    expandation,
    ellipsis,
  } = props;

  const [columnsWidth] = React.useState<Map<IGridColumn, number>>(new Map());

  const [, forceUpdate] = React.useState({});
  const [isScrolledToLeft, setScrolledLeft] = React.useState(false);
  const [isScrolledToRight, setScrolledRight] = React.useState(false);
  // const [ fixedColumns, SetFixedColumns ] = React.useState(new Map());
  const tableRef = React.useRef<HTMLDivElement>();

  const mounted = React.useRef(false);

  const handleCellWidthChange = React.useCallback(
    (column, width) => {
      columnsWidth.set(column, width);
      forceUpdate({});
    },
    [columnsWidth]
  );

  const columns: any = useColumns<Data>({
    columns: props.columns,
    children: props.children,
    expandation,
    selection,
    prefix,
  });

  const hooks = getHooks(props);

  const instance = useTable<UseRowSelectInstanceProps<any>>(
    {
      data: datasets,
      columns,
      initialState: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        pageIndex: pageInfo?.current,
        pageSize: pageInfo?.pageSize,
        sortBy: [sortBy || ''],
        hiddenColumns: columns.filter(column => column.colSpan === 0),
      },
      disableMultiSort: true,
      manualSortBy: true,
      getRowId: (row: any, relativeIndex) => `${row.id || relativeIndex}`,
      expandSubRows: !expandation?.expandRender,
      useControlledState: state =>
        React.useMemo(() => {
          const selectedRowIds: string[] = [];
          selection?.selectedRowKeys.forEach(item => {
            selectedRowIds[item] = true;
          });
          return {
            ...state,
            pageIndex: pageInfo?.current,
            pageSize: pageInfo?.pageSize,
            selectedRowIds,
          };
        }, [state]),
    },
    ...hooks
  );

  const {
    rows,
    prepareRow,
    getTableProps,
    getTableBodyProps,
    setPageSize,
    visibleColumns,
    state: { pageSize, pageIndex, sortBy: innerSortBy },
  } = instance as any;

  const handleOnChange = React.useCallback(
    (gridChangeConf: IGridOnChangeConfig) => {
      const {
        pageSize: currentPageSize = pageSize,
        current = pageIndex,
      } = gridChangeConf;
      if (pageSize !== currentPageSize) {
        setPageSize(currentPageSize);
      }

      onChange &&
        onChange({
          ...gridChangeConf,
          current,
          pageSize,
        });
    },
    [onChange, setPageSize, pageSize, pageIndex]
  );

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const [sortByConfig] = innerSortBy;
      let innerSortType: GridSortType = '';
      let tmpSortBy = '';
      const { id, desc } = sortByConfig || {};
      if (id) {
        tmpSortBy = id;
        innerSortType = desc ? 'desc' : 'asc';
      }
      handleOnChange({ sortBy: tmpSortBy, sortType: innerSortType });
    }
  }, [innerSortBy, handleOnChange]);

  const onScroll = React.useCallback(() => {
    const node = tableRef.current;
    const isScrollToLeft = node.scrollLeft === 0;
    const isScrollToRight =
      node.scrollLeft + 1 >=
      node.children[0].getBoundingClientRect().width -
        node.getBoundingClientRect().width;
    setScrolledLeft(isScrollToLeft);
    setScrolledRight(isScrollToRight);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (scroll && scroll.x) {
      return {
        width: `${scroll.x}px`,
      };
    }
    return {};
  }, [scroll]);

  const hasAnyColumnFixed = React.useMemo(() => {
    return columns.some(column => column.fixed);
  }, [columns]);

  const cls = React.useMemo(() => {
    return classnames(`${prefix}-grid`, {
      [`${prefix}-grid-fixed`]: hasAnyColumnFixed,
      [`${prefix}-grid-scroll-position-left`]: isScrolledToLeft,
      [`${prefix}-grid-scroll-position-right`]: isScrolledToRight,
      [`${prefix}-grid-scroll-position-both`]:
        !isScrolledToLeft && !isScrolledToRight,
    });
  }, [isScrolledToLeft, isScrolledToRight, hasAnyColumnFixed]);

  const { headerGroups } = useHeaderGroups(columns, instance.flatHeaders);

  return (
    <div className={cls}>
      <div className={`${prefix}-grid-container`} ref={tableRef}>
        <table
          className={classnames(`${prefix}-grid-table`, {
            [`${prefix}-grid-table-ellipsis`]: ellipsis,
          })}
          {...getTableProps()}
          style={gridStyle}
        >
          <ColGroup columns={visibleColumns} originColumns={columns} />
          <thead className={`${prefix}-grid-thead`}>
            {headerGroups.map((headerGroup, rowIndex) => {
              return (
                <Tr
                  rowClassName={rowClassName}
                  key={rowIndex}
                  prefix={prefix}
                  record={headerGroup}
                  rowIndex={rowIndex}
                >
                  {headerGroup.map((header, idx) => {
                    const {
                      colSpan,
                      rowSpan,
                      key,
                      column,
                      header: instanceHeader,
                    } = header;
                    let position: IGridFixedPosition = {};
                    if (column && column.fixed) {
                      position = getFixedPosition(columns, columnsWidth, idx);
                    }
                    const headerProps = instanceHeader.getHeaderProps(
                      instanceHeader.getSortByToggleProps()
                    );
                    const { onClick } = headerProps;
                    return (
                      <Td
                        type="th"
                        prefix={prefix}
                        position={position}
                        column={column}
                        sortType={sortType}
                        onClick={onClick}
                        rowSpan={rowSpan}
                        key={key}
                        colSpan={colSpan}
                      >
                        {instanceHeader.render('Header')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            <MeasureCell
              columns={visibleColumns}
              onColumnsWidthChange={handleCellWidthChange}
            />
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <React.Fragment key={row.original[rowKey] || rowIndex}>
                  <Tr
                    prefix={prefix}
                    key={row.original[rowKey] || rowIndex}
                    rowClassName={rowClassName}
                    record={row}
                    rowIndex={rowIndex}
                    onRowClick={onRowClick}
                  >
                    {row.cells.map((cell, idx) => {
                      const column = visibleColumns[idx];
                      let position: IGridFixedPosition = {};
                      if (column && column.fixed) {
                        position = getFixedPosition(
                          visibleColumns,
                          columnsWidth,
                          idx
                        );
                      }
                      const { rowSpan } = column;
                      return (
                        <Td
                          prefix={prefix}
                          type="td"
                          key={`td-${cell.id}-${idx}`}
                          position={position}
                          column={column}
                          rowSpan={rowSpan}
                        >
                          {cell.render('Cell')}
                        </Td>
                      );
                    })}
                  </Tr>
                  {row.isExpanded && expandation?.expandRender ? (
                    <tr className={`${prefix}-grid-tr__expanded`}>
                      <td
                        className={`${prefix}-grid-td-expand`}
                        colSpan={columns.length}
                      >
                        {expandation?.expandRender(row.original)}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer
        prefix={prefix}
        batchRender={batchRender}
        pageInfo={pageInfo}
        onChange={handleOnChange}
        paginationType={paginationType}
      />
      <WindowScrollHandler onScroll={onScroll} options={{ capture: true }} />
    </div>
  );
}

Grid.Column = Column;
Grid.ColumnGroup = ColumnGroup;
