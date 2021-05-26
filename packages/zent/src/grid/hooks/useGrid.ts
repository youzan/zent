import {
  useTable,
  useExpanded,
  useRowSelect,
  usePagination,
  Row,
} from 'react-table';
import {
  useFixedColumns,
  useZentPlugin,
  useHeadGroup,
  useGridSelection,
  useGridExpandation,
} from '../plugins';
import { IGridProps } from '../types';
import useColumns from './useColumns';
import useInitialState from './useInitialState';

export default function useGrid(props: IGridProps, tableRef) {
  const {
    datasets,
    columns: userColumns,
    children,
    selection,
    expandation,
  } = props;
  const columns = useColumns(userColumns, children);
  const initialState = useInitialState(props);

  const hooks = [];

  selection && hooks.push(useGridSelection);

  expandation && hooks.push(useGridExpandation);

  return useTable(
    {
      data: datasets,
      columns,
      initialState,
      manualPagination: true,
      pageCount: -1,
      scroll,
      tableRef,
      selection,
      expandation,
      getRowId: (row: Row, relativeIndex) => `${row.id || relativeIndex}`,
    },
    useExpanded,
    usePagination,
    ...hooks,
    useHeadGroup,
    useRowSelect,
    useFixedColumns,
    useZentPlugin
  );
}
