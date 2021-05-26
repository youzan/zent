import * as React from 'react';

export function useSelectedRow(selectedRowKeys) {
  return React.useMemo(() => {
    const selectedRowIds: Record<string, boolean> = {};
    selectedRowKeys?.forEach(item => {
      selectedRowIds[item] = true;
    });
    return selectedRowIds;
  }, [selectedRowKeys]);
}
