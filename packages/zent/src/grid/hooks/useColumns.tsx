import * as React from 'react';
import classnames from 'classnames';
import { IGridColumn, IGridExpandation } from '../types';
import SelectionCheckboxAll from '../ui/SelectionChackboxAll';
import SelectionRadio from '../ui/SelectionRadio';
import SelectionCheckbox from '../ui/SelectionCheckbox';

interface IGridUseColumnsProps<Data> {
  columns?: IGridColumn[];
  children?: React.ReactNode;
  columnsWidth?: Map<IGridColumn, number>;
  prefix: string;
  expandation: IGridExpandation<Data>;
  selection: any;
}

const getSelectionProps = (cell: any, selection: any) => {
  const { row: currentRow } = cell;
  const selectionProps = currentRow.getToggleRowSelectedProps();
  const { onChange } = selectionProps;

  const handleOnChange = rest => {
    onChange(rest);
    const { state, selectedFlatRows } = cell;
    let selectedRowKeys = Object.keys(state.selectedRowIds);
    let selectedRows = selectedFlatRows.map(item => item.original);
    const originId = currentRow.original.id;
    const index = selectedRowKeys.indexOf(originId);
    if (index === -1) {
      selectedRows.push(currentRow.original);
      selectedRowKeys.push(currentRow.original.id);
    } else {
      selectedRows = selectedRows.filter(item => item.id !== originId);
      selectedRowKeys = selectedRowKeys.filter(item => item !== originId);
    }

    if (!selection.needCrossPage) {
      selectedRowKeys = selectedRowKeys.filter(item => item in cell.rowsById);
      selectedRows = selectedRows.filter(item => item.id in cell.rowsById);
    }

    selection.onSelect(selectedRowKeys, selectedRows, currentRow.original);
  };
  return {
    ...selectionProps,
    onChange: handleOnChange,
  };
};

function getExpandColumn(prefix, expandation) {
  return {
    id: 'expander',
    // eslint-disable-next-line react/display-name
    Cell: ({ row }) => {
      const expandable =
        row.canExpand &&
        expandation.isExpanded &&
        expandation.isExpanded(row.original, row.index);
      return expandable ? (
        <span
          className={classnames(`${prefix}-grid-expandable-btn`, {
            [`${prefix}-grid-expand-btn`]: row.isExpanded,
          })}
          {...row.getToggleRowExpandedProps({
            style: {
              // We can even use the row.depth property
              // and paddingLeft to indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            },
          })}
        ></span>
      ) : null;
    },
  };
}

function getSelection(selection) {
  return {
    id: 'selection',
    width: '40px',
    // eslint-disable-next-line react/display-name
    Header: header => {
      return selection.type === 'checkbox' ? (
        <SelectionCheckboxAll
          {...header.getToggleAllRowsSelectedProps()}
          selection={selection}
          header={header}
        />
      ) : null;
    },
    // eslint-disable-next-line react/display-name
    Cell: (cell: any) => {
      const { row } = cell;
      const rowSelectionProps = getSelectionProps(cell, selection);
      const checkboxProps = selection.getCheckboxProps
        ? selection.getCheckboxProps(row.original)
        : {};

      return selection.type === 'radio' ? (
        <SelectionRadio
          {...rowSelectionProps}
          toggleAllRowsSelected={cell.toggleAllRowsSelected}
          row={row}
          {...checkboxProps}
        />
      ) : (
        <SelectionCheckbox
          {...rowSelectionProps}
          {...checkboxProps}
          row={row}
          key={row.id}
        />
      );
    },
  };
}

function convertChildrenToColumns(children: React.ReactNode) {
  return React.Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .map(({ props }: React.ReactElement) => {
      const { children: nodeChildren, ...resetProps } = props;
      const column = {
        ...resetProps,
      };

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren);
      }
      return column;
    });
}

function useColumns<Data>({
  columns,
  children,
  expandation,
  selection,
  prefix,
}: IGridUseColumnsProps<Data>) {
  return React.useMemo(() => {
    const baseColumns: IGridColumn[] =
      columns || convertChildrenToColumns(children);
    const formattedColumns = formatColumns(baseColumns);

    if (expandation) {
      formattedColumns.unshift(getExpandColumn(prefix, expandation));
    }

    if (selection) {
      formattedColumns.unshift(getSelection(selection));
    }

    return formattedColumns;
  }, [columns, children, prefix, expandation, selection]);
}

function formatColumns(columns) {
  return columns.map(column => {
    const baseItem = {
      ...column,
      render: column.bodyRender,
      Header: column.title,
      sortDescFirst: true,
      accessor: column.name,
      width: column.width ? column.width : 'auto',
    };
    if (column && column.children) {
      baseItem.columns = formatColumns(column.children);
    } else {
      baseItem.parent = {};
    }

    if (baseItem.fixed) {
      baseItem.fixed = baseItem.fixed === 'right' ? 'right' : 'left';
    }
    return baseItem;
  });
}

export default useColumns;
