/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as React from 'react';
import {
  UsePaginationOptions,
  UseRowSelectOptions,
  UseSortByOptions,
  UseSortByColumnProps,
  UseExpandedState,
  UseExpandedInstanceProps,
  UsePaginationInstanceProps,
  UseRowSelectInstanceProps,
  UseRowStateInstanceProps,
  TableToggleCommonProps,
  TableCommonProps,
} from 'react-table';

import { GridSortType, GridFixedType } from './types';
declare module 'react-table' {
  export function emptyRender() {}

  export interface ColumnInstance<D extends object> {
    title: React.ReactNode;
    name: string;
  }
  export interface TableOptions<D extends object>
    extends UseExpandedOptions<D>,
      UsePaginationOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  export interface TableInstance<D extends object = {}>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends object>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UsePaginationState<D>,
      UseRowSelectState<D>,
      UseSortByState<D> {}

  export interface UseTableCellProps<D extends object> {
    id: string;
    isFirstRightFixedColumn: boolean;
    isLastLeftFixedColumn: boolean;
    fixed: GridFixedType;
  }

  export interface Row<D extends object = {}>
    extends UseTableRowProps<D>,
      UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}

  export interface HeaderGroup<D extends object = {}>
    extends UseSortByColumnProps<D> {}

  export interface TableToggleCommonProps extends TableCommonProps {
    onChange?: (e: React.ChangeEvent) => void;
  }
  // export interface TableToggleRowsSelectedProps extends TableToggleCommonProps {
  //   onChange: (e: React.ChangeEvent) => void;
  // }

  // export interface TableToggleAllRowsSelectedProps
  //   extends TableToggleCommonProps {
  //   onChange: (e: React.ChangeEvent) => void;
  // }

  export interface TableHeaderProps {
    onClick: (e: React.MouseEvent) => void;
    sortBy?: string;
    sortType?: GridSortType;
    handleOnSortTypeClick: (sortBy: string, sortType: GridSortType) => void;
  }
}
