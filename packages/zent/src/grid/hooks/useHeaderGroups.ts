import { IGridColumn } from '../types';

interface IHeaderCell {
  colSpan: number;
  colEnd: number;
  key: string;
  column: IGridColumn;
  colStart: number;
  hasSubColumns?: boolean;
  rowSpan: number;
  header?: any;
}

function getInterfaceHeaders(flatHeaders) {
  return flatHeaders.filter(
    header =>
      !header.originalId ||
      (header.originalId && header.originalId.indexOf('placeholder') === -1)
  );
}

export default function useHeaderGroups<Data>(
  columns: IGridColumn<Data>[],
  hooksHeaderGroups: any[]
) {
  const flatterHeaders = getInterfaceHeaders(hooksHeaderGroups);
  const headersById = new Map();
  flatterHeaders.forEach(header => {
    let key = header.title;
    if (header.id === 'expander' || header.id === 'selection') {
      key = header.id;
    }
    headersById.set(key, header);
  });

  const rows = [];

  function fillRowCells(
    columns: IGridColumn[],
    colIndex: number,
    rowIndex = 0
  ) {
    rows[rowIndex] = rows[rowIndex] || [];

    let currentColIndex = colIndex;
    const colSpans: number[] = columns.map((column, idx) => {
      let { colSpan = 1, rowSpan = 1 } = column;
      const cell: IHeaderCell = {
        key: column.key || `col-${idx}`,
        column,
        colStart: currentColIndex,
        colSpan,
        colEnd: 0,
        rowSpan,
      };

      const subColumns = column.children;

      if (subColumns && subColumns.length > 0) {
        cell.hasSubColumns = true;
        colSpan = fillRowCells(
          subColumns,
          currentColIndex,
          rowIndex + 1
        ).reduce((total, count) => total + count, 0);
      }

      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;

      rows[rowIndex].push(cell);
      currentColIndex += colSpan;
      return colSpan;
    });
    return colSpans;
  }

  fillRowCells(columns, 0);

  const rowCount = rows.length;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach((cell: IHeaderCell) => {
      if (!cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
      const key = cell.column.id || cell.column.title;
      cell.header = headersById.get(key);
    });
  }

  return { headerGroups: rows, headersById };
}
