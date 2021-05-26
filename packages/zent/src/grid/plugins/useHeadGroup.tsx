import { IGridColumn } from '../types';

export function useHeadGroup(hooks) {
  hooks.getHeaderProps.push(getHeaderProps);
  hooks.headerGroups.push(getHeaderGroups);
}

function getHeaderGroups(headerGroups, instance) {
  const { columns = [], allColumns } = instance;

  const expanderAndSelections = allColumns.filter(
    item => item.id === 'expander' || item.id === 'selection'
  );

  const copyColumns = [...expanderAndSelections, ...columns];

  let rows = [];

  function fillRowCells(
    columns: IGridColumn[],
    colIndex: number,
    rowIndex = 0
  ) {
    rows[rowIndex] = rows[rowIndex] || [];

    let currentColIndex = colIndex;
    const colSpans: number[] = columns.map((column, idx) => {
      let { colSpan = 1, rowSpan = 1 } = column;
      const cell = {
        colStart: currentColIndex,
        colSpan,
        colEnd: 0,
        rowSpan,
        hasSubColumns: false,
        isVisible: true,
        ...column,
      };

      const subColumns = column.columns;

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

  fillRowCells(copyColumns, 0);

  const rowCount = rows.length;

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach(cell => {
      if (!cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }

  rows = rows.map(row => ({
    headers: row,
  }));

  return rows;
}

function getHeaderProps(props, { column }) {
  return [
    props,
    {
      rowSpan: column.rowSpan,
      colSpan: column.colSpan,
    },
  ];
}

useHeadGroup.pluginName = 'useHeadGroup';
