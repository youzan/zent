import {
  usePagination,
  useRowSelect,
  useSortBy,
  useExpanded,
} from 'react-table';
import { IGridProps, IGridColumn } from './types';

export function getHooks(props: IGridProps) {
  const hooks = [useSortBy, useExpanded] as any;
  const { pageInfo, selection } = props;
  pageInfo && hooks.push(usePagination);
  selection && hooks.push(useRowSelect);
  return hooks;
}

export function getFixedPosition(
  columns: IGridColumn[],
  columnsWidth: Map<IGridColumn, number>,
  currentIndex: number
) {
  const prevColumn = columns[currentIndex - 1];
  const nextColumn = columns[currentIndex + 1];
  const currentColumn = columns[currentIndex];
  const { fixed } = currentColumn;

  let prevColumnWidth = 0;
  let nextColumnWidth = 0;

  if (prevColumn) {
    prevColumnWidth = columnsWidth.get(prevColumn);
  }

  if (nextColumn) {
    nextColumnWidth = columnsWidth.get(nextColumn);
  }

  return {
    left: prevColumnWidth,
    right: nextColumnWidth,
    fixed,
    isLastLeftFixedColumn:
      (currentColumn.fixed === true || currentColumn.fixed === 'left') &&
      nextColumn &&
      !nextColumn.fixed,
    isFirstRightFixedColumn:
      currentColumn.fixed === 'right' &&
      prevColumn &&
      prevColumn.fixed !== 'right',
  };
}
