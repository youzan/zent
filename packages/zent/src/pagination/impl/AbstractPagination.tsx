import * as React from 'react';
import cx from 'classnames';

import PageSizeChanger from '../components/PageSizeChanger';
import NormalPageList from '../components/list/NormalPageList';
import PageJumper from '../components/jumper/PageJumper';
import BasePagination from './BasePagination';

export interface IPaginationPageSizeCompoundOption {
  text: React.ReactNode;
  value: number;
}

export type PaginationPageSizeOption =
  | number
  | IPaginationPageSizeCompoundOption;

export interface IAbstractPaginationPropsDelta {
  pageSizeOptions?: PaginationPageSizeOption[];
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  buttonBordered?: boolean;
}

export default abstract class AbstractPagination extends BasePagination<
  IAbstractPaginationPropsDelta
> {
  render() {
    const { layout } = this.state;
    const {
      current,
      pageSize,
      pageSizeOptions,
      showQuickJumper,
      showSizeChanger,
      buttonBordered,
      className,
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
