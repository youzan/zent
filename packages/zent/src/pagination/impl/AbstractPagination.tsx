import * as React from 'react';
import cx from 'classnames';

import PageSizeChanger, {
  PaginationPageSizeOption,
} from '../components/PageSizeChanger';
import NormalPageList from '../components/list/NormalPageList';
import PageJumper from '../components/jumper/PageJumper';
import BasePagination, { IBasePaginationProps } from './BasePagination';

export interface IAbstractPaginationProps extends IBasePaginationProps {
  pageSizeOptions?: PaginationPageSizeOption[];
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  buttonBordered?: boolean;
}

export abstract class AbstractPagination extends BasePagination<
  IAbstractPaginationProps
> {
  render() {
    const layout = this.getLayout(this.props);
    const {
      current,
      pageSize,
      pageSizeOptions,
      showQuickJumper,
      showSizeChanger,
      buttonBordered,
      className,
      formatTotal,
    } = this.props;
    const total = this.getTotal();

    return (
      <div
        className={cx(
          `zent-pagination zent-pagination--${this.name}`,
          className
        )}
      >
        {showSizeChanger && (
          <PageSizeChanger
            pageSize={pageSize}
            total={total}
            formatTotal={formatTotal}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={this.onPageSizeChange}
          />
        )}
        <NormalPageList
          layout={layout}
          current={current}
          buttonBordered={buttonBordered}
          onPageChange={this.onPageChange}
        />
        {showQuickJumper && <PageJumper onJump={this.onPageChange} />}
      </div>
    );
  }
}

export default AbstractPagination;
