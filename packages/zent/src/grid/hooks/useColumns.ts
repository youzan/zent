import * as React from 'react';
import { IGridColumn } from '../types';

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

function useColumns<Data>(columns, children) {
  const baseColumns: IGridColumn[] = React.useMemo(() => {
    return columns || convertChildrenToColumns(children);
  }, [children, columns]);
  return React.useMemo(() => {
    return formatColumns(baseColumns);
  }, [baseColumns]);
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

export default useColumns;
