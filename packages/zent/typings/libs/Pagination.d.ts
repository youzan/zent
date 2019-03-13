/// <reference types="react" />

import { declare, interface } from 'tcomb';
import { decl } from 'postcss';

interface CompoundPageSizeOption {
  text: string;
  value: number;
}

type PageSizeOption = number | CompoundPageSizeOption;

interface PaginationOnChangeParameter {
  current: number;
  pageSize: number;
}

interface IPaginationProps {
  current?: number;
  total?: number;
  pageSize?: number;
  pageSizeOptions?: PageSizeOption[];
  onChange: (arg: PaginationOnChangeParameter) => any;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  buttonBordered?: boolean;
  className?: string;
}

declare module 'zent/lib/pagination' {
  export default class Pagination extends React.Component<
    IPaginationProps,
    any
  > {}
}

declare module 'zent/lib/pagination/LitePagination' {
  export default class LitePagination extends React.Component<
    IPaginationProps,
    any
  > {}
}

declare module 'zent/lib/pagination/MiniPagination' {
  interface IMiniPaginationProps {
    current?: number;
    total?: number;
    pageSize?: number;
    onChange: (arg: PaginationOnChangeParameter) => any;
    buttonBordered?: boolean;
    className?: string;
  }

  export default class MiniPagination extends React.Component<
    IMiniPaginationProps,
    any
  > {}
}
