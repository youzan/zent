import * as React from 'react';
import { useSelectedRow } from './useSelectedRow';
import { BaseGridInnerColumnsType } from '../types';

export default function useInitialState(props) {
  const {
    pageInfo,
    selection,
    columns,
    sortBy,
    sortType,
    defaultSortType,
  } = props;
  const selectedRowId = useSelectedRow(selection?.selectedRowKeys);

  return React.useMemo(() => {
    return {
      pageIndex: pageInfo?.current - 1,
      pageSize: pageInfo?.pageSize,
      hiddenColumns: columns
        .filter((column: BaseGridInnerColumnsType) => column.colSpan === 0)
        .map(item => item.id),
      selectedRowIds: selectedRowId,
    };
  }, [columns, pageInfo, selectedRowId]);
}
