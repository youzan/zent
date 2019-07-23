import { Component } from 'react';
import has from 'lodash-es/has';
import { PaginationLayout } from '../layout/type';
import memoize from '../../utils/memorize-one';

export type PaginationChangeHandler = (detail: {
  current: number;
  pageSize: number;
}) => any;

export interface IBasePaginationProps {
  current: number;
  pageSize: number;
  total?: number;
  formatTotal?: (total: number) => React.ReactNode;
  onChange: PaginationChangeHandler;

  /** deprecated, use total */
  totalItem?: number;
  className?: string;
}

export interface IPaginationLayoutOptions {
  current: number;
  total: number;
  pageSize: number;
}

export type PaginationLayoutFunction = (
  options: IPaginationLayoutOptions
) => PaginationLayout[];

export abstract class BasePagination<
  IProps extends IBasePaginationProps
> extends Component<IProps> {
  name!: string;
  layoutFn!: PaginationLayoutFunction;

  getLayout = memoize((props: IProps) => {
    return this.layoutFn(this.getLayoutOptions(props));
  });

  shouldUpdateLayout(props: IProps, nextProps: IProps) {
    const { current, pageSize } = nextProps;

    return (
      current !== props.current ||
      this.getTotal(nextProps) !== this.getTotal(props) ||
      pageSize !== props.pageSize
    );
  }

  getLayoutOptions(props: IProps) {
    const { current, pageSize } = props;

    return {
      current,
      total: this.getTotal(props),
      pageSize,
    } as IPaginationLayoutOptions;
  }

  onPageChange = (page: number) => {
    const { current, pageSize, onChange } = this.props;
    const total = this.getTotal();
    page = Math.max(1, page);
    page = Math.min(page, this.getTotalPages(total, pageSize));

    if (page !== current) {
      onChange({
        current: page,
        pageSize,
      });
    }
  };

  onPageSizeChange = (pageSize: number) => {
    const { current } = this.props;
    const total = this.getTotal();
    if (this.props.pageSize !== pageSize) {
      const maxPageNumber = this.getTotalPages(total, pageSize);
      const options = {
        pageSize,
        current: Math.min(current, maxPageNumber),
      };

      this.props.onChange(options);
    }
  };

  getTotalPages(total: number, pageSize: number) {
    return Math.ceil(total / pageSize);
  }

  /**
   * 兼容老的参数
   */
  getTotal(props?: IProps) {
    props = props || this.props;

    if (has(props, 'total')) {
      return props.total || 0;
    }

    if (has(props, 'totalItem')) {
      return props.totalItem || 0;
    }

    return 0;
  }
}

export default BasePagination;
