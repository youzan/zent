import * as React from 'react';
import classnames from 'classnames';
import { IGridColumn, GridInnerColumnsType } from '../types';
import { clsPrefix } from '../constants';

// const getSelectionProps = (
//   cell: GridCellType,
//   selection: IGridSelection,
//   rowKey: string
// ) => {
//   const { row: currentRow } = cell;
//   const selectionProps = currentRow.getToggleRowSelectedProps();
//   const { onChange } = selectionProps;

//   const handleOnChange = e => {
//     onChange(e);
//     const { state } = cell;
//     const selectedFlatRows = cell.selectedFlatRows as Row[];
//     let selectedRowKeys = Object.keys(state.selectedRowIds);
//     let selectedRows = selectedFlatRows.map(item => item.original);
//     const originId = currentRow.original[rowKey] as string;
//     const index = selectedRowKeys.indexOf(originId);
//     if (index === -1) {
//       selectedRows.push(currentRow.original);
//       selectedRowKeys.push(currentRow.original[rowKey] as string);
//     } else {
//       selectedRows = selectedRows.filter(item => item[rowKey] !== originId);
//       selectedRowKeys = selectedRowKeys.filter(item => item !== originId);
//     }

//     if (!selection.needCrossPage) {
//       selectedRowKeys = selectedRowKeys.filter(item => item in cell.rowsById);
//       selectedRows = selectedRows.filter(item => item[rowKey] in cell.rowsById);
//     }

//     selection.onSelect(selectedRowKeys, selectedRows, currentRow.original);
//   };
//   return {
//     ...selectionProps,
//     record: currentRow.original,
//     rowKey,
//     onChange: handleOnChange,
//   };
// };

// function getSelectionColumns(selection: IGridSelection, rowKey: string) {
//   return {
//     id: 'selection',
//     accessor: 'selection',
//     width: '40px',
//     Header: function SelectAll(header: GridHeaderRowType) {
//       return selection.type === 'radio' ? null : (
//         <SelectionCheckboxAll
//           {...header.getToggleAllPageRowsSelectedProps()}
//           selection={selection}
//           header={header}
//         />
//       );
//     },
//     Cell: function SelectCell(cell: GridCellType) {
//       const { row, index } = cell;
//       const rowSelectionProps = getSelectionProps(cell, selection, rowKey);
//       const checkboxProps = selection.getCheckboxProps
//         ? selection.getCheckboxProps(row.original)
//         : {};

//       return selection.type === 'radio' ? (
//         <SelectionRadio
//           {...rowSelectionProps}
//           toggleAllRowsSelected={cell.toggleAllRowsSelected}
//           {...checkboxProps}
//           rowIndex={index}
//         />
//       ) : (
//         <SelectionCheckbox
//           {...rowSelectionProps}
//           {...checkboxProps}
//           key={row.id}
//           rowIndex={index}
//         />
//       );
//     },
//   };
// }

function getExpandColumn(expandation) {
  return {
    id: 'expander',
    accessor: 'expander',
    width: 20,
    Cell: function ExpandCell({ row }) {
      const expandable =
        row.canExpand && expandation.isExpanded?.(row.original, row.index);
      return expandable ? (
        <span
          className={classnames(`${clsPrefix}-expandable-btn`, {
            [`${clsPrefix}-expand-btn`]: !row.isExpanded,
            [`${clsPrefix}-collapse-btn`]: row.isExpanded,
          })}
          {...row.getToggleRowExpandedProps()}
        ></span>
      ) : null;
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

function getColumns<Data>({
  columns,
  children,
  expandation,
  selection,
  rowKey,
}) {
  const baseColumns: IGridColumn[] =
    columns || convertChildrenToColumns(children);
  const formattedColumns: GridInnerColumnsType[] = formatColumns(baseColumns);

  if (expandation) {
    formattedColumns.unshift(getExpandColumn(expandation));
  }

  return formattedColumns;
}

function formatColumns(columns: IGridColumn[]) {
  return columns.map(column => {
    const baseItem = {
      ...column,
      render: column.bodyRender,
      Header: column.title,
      sortDescFirst: true,
      accessor: column.name as any,
      width: column.width ? column.width : 'auto',
    };
    if (column && column.children) {
      baseItem.columns = formatColumns(column.children);
    }
    if (baseItem.fixed) {
      baseItem.fixed = baseItem.fixed === 'right' ? 'right' : 'left';
    }
    return baseItem;
  });
}

export default getColumns;
