import * as React from 'react';
import cx from 'classnames';

import MiniPageList from './components/list/MiniPageList';
import layoutMini from './layout/mini';
import BasePagination from './impl/BasePagination';

export interface IMiniPaginationPropsDelta {
  buttonBordered?: boolean;
}

export class MiniPagination extends BasePagination<IMiniPaginationPropsDelta> {
  name = 'mini';

  layoutFn = layoutMini;

  static defaultProps = {
    // Don't give a default value
    // total: 0,

    current: 1,
    pageSize: 10,
    buttonBordered: false,
  };

  render() {
    const { current, buttonBordered, className } = this.props;
    const { layout } = this.state;

    return (
      <div
        className={cx(
          `zent-pagination zent-pagination--${this.name}`,
          className
        )}
      >
        <MiniPageList
          layout={layout}
          current={current}
          onPageChange={this.onPageChange}
          buttonBordered={buttonBordered}
        />
      </div>
    );
  }
}

export default MiniPagination;
