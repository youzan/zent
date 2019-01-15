/// <reference types="react" />

declare module 'zent/lib/pagination' {
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
    type?: 'normal' | 'lite' | 'mini';
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

  export default class Pagination extends React.Component<
    IPaginationProps,
    any
  > {}
}
