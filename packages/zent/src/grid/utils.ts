import { IGridInnerColumn } from './Grid';

function setRowSpan<Data>(
  column: IGridInnerColumn<Data>,
  rows: Array<Array<IGridInnerColumn<Data>>>,
  currentRow: number
) {
  const rowSpan = rows.length - currentRow;
  if (
    column &&
    !column.children && // parent columns are supposed to be one row
    rowSpan > 1 &&
    (!column.rowSpan || column.rowSpan < rowSpan)
  ) {
    column.rowSpan = rowSpan;
  }
}

export function groupedColumns<Data>(
  columns: Array<IGridInnerColumn<Data>>,
  currentRow = 0,
  parentColumn: IGridInnerColumn<Data> = {} as IGridInnerColumn<Data>,
  rows: Array<Array<IGridInnerColumn<Data>>> = []
) {
  // track how many rows we got
  rows[currentRow] = rows[currentRow] || [];
  const grouped: Array<IGridInnerColumn<Data>> = [];
  columns.forEach((column, index) => {
    const newColumn = { ...column };
    rows[currentRow].push(newColumn);
    parentColumn.colSpan = parentColumn.colSpan || 0;
    if (newColumn.children && newColumn.children.length > 0) {
      if (newColumn.needSort) {
        newColumn.needSort = false;
      }
      newColumn.children = groupedColumns(
        newColumn.children,
        currentRow + 1,
        newColumn,
        rows
      );
      parentColumn.colSpan += newColumn.colSpan as number;
    } else {
      parentColumn.colSpan++;
    }
    // update rowspan to all same row columns
    for (let i = 0; i < rows[currentRow].length - 1; ++i) {
      setRowSpan(rows[currentRow][i], rows, currentRow);
    }
    // last column, update rowspan immediately
    if (index + 1 === columns.length) {
      setRowSpan(newColumn, rows, currentRow);
    }
    grouped.push(newColumn);
  });
  return grouped;
}

export function getLeafColumns<Data>(columns: Array<IGridInnerColumn<Data>>) {
  const leafColumns: Array<IGridInnerColumn<Data>> = [];
  columns.forEach(column => {
    if (!column.children) {
      leafColumns.push(column);
    } else {
      leafColumns.push(...getLeafColumns(column.children));
    }
  });
  return leafColumns;
}
