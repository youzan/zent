import { CellProps, HeaderProps } from 'react-table';
import { selectionHeadRender, selectionCellRender } from '../ui/SelectionCell';

export const useGridSelection = hooks => {
  hooks.visibleColumns.push(visibleColumns);
  hooks.getCellProps.push(getCellProps);
  hooks.getHeaderProps.push(getHeaderProps);
};

function visibleColumns(columns, { instance }) {
  return [
    {
      id: 'selection',
      width: '40px',
      Header: ({ column }) => {
        return selectionHeadRender(column);
      },
      Cell: ({ cell }) => {
        return selectionCellRender(cell);
      },
      isVisible: true,
    },
    ...columns,
  ];
}

function getCellProps(props, { cell, instance }) {
  const { selection } = instance;
  const { row } = cell;
  const { selectedRowKeys, selectedRows, rowsKeys } = getSelectionProps(
    instance
  );

  const toggleRowSelectedProps = row.getToggleRowSelectedProps();

  const rowId = row.id;

  const checkboxProps =
    typeof selection?.getCheckboxProps === 'function'
      ? selection?.getCheckboxProps(row.original)
      : {};

  const handleOnSelectionChange = e => {
    toggleRowSelectedProps.onChange(e);
    if (selection?.type === 'radio') {
      cell.toggleAllRowsSelected(false);
      selection?.onSelect([rowId], [row.original], row.original);
      return;
    }

    const index = selectedRowKeys.indexOf(rowId);
    let currentSelectedRows = [...selectedRows];
    let currentSelectedRowKeys = [...selectedRowKeys];

    if (index === -1) {
      currentSelectedRows.push(row.original);
      currentSelectedRowKeys.push(rowId);
    } else {
      currentSelectedRows = currentSelectedRows.filter(
        item => `${item.id}` !== rowId
      );
      currentSelectedRowKeys = currentSelectedRowKeys.filter(
        item => item !== rowId
      );
    }

    if (!selection.needCrossPage) {
      currentSelectedRowKeys = currentSelectedRowKeys.filter(item =>
        rowsKeys.includes(item)
      );
      currentSelectedRows = currentSelectedRows.filter(item =>
        rowsKeys.includes(`${item.id}`)
      );
    }

    selection?.onSelect(
      currentSelectedRowKeys,
      currentSelectedRows,
      row.original
    );
  };

  const selectionCommonProps = {
    ...checkboxProps,
    onChange: handleOnSelectionChange,
  };

  return [
    props,
    {
      isSingleSelect: selection.type === 'radio',
      ...selectionCommonProps,
    },
  ];
}

function getSelectionProps(data: CellProps<any, {}> | HeaderProps<{}>) {
  const { cachedAllSelectedRows, state, rowsById } = data;

  return {
    selectedRows: cachedAllSelectedRows,
    selectedRowKeys: Object.keys(state.selectedRowIds),
    rowsKeys: Object.keys(rowsById),
  };
}

function getHeaderProps(props, { instance, column }) {
  const { selectedRowKeys, selectedRows, rowsKeys } = getSelectionProps(
    instance
  );

  const { rows, getToggleAllRowsSelectedProps, selection } = instance;
  const headerRowProps = getToggleAllRowsSelectedProps();

  const handleOnSelectionChange = e => {
    let currentSelectedRow = [];
    let currentSelectedRowKeys = [];
    const currentRows = rows.map(item => item.original);
    if (e.target.checked) {
      if (selection?.needCrossPage) {
        currentSelectedRow = [...selectedRows, ...currentRows];
        currentSelectedRowKeys = [...selectedRowKeys, ...rowsKeys];
      } else {
        currentSelectedRow = [...currentRows];
        currentSelectedRowKeys = [...rowsKeys];
      }
    } else {
      if (selection?.needCrossPage) {
        currentSelectedRow = [...selectedRows];
        currentSelectedRowKeys = [...selectedRowKeys];
      }
    }
    headerRowProps.onChange(e);
    selection?.onSelect(currentSelectedRowKeys, currentSelectedRow, null);
  };

  return [
    props,
    {
      ...headerRowProps,
      onChange: handleOnSelectionChange,
    },
  ];
}

useGridSelection.pluginName = 'useSelection';
