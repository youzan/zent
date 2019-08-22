import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import size from 'lodash-es/size';
import Pagination from '../pagination';
import LitePagination from '../pagination/LitePagination';
import {
  IGridOnChangeConfig,
  GridPaginationType,
  IGridPageInfo,
} from './types';
import { PaginationChangeHandler } from '../pagination/impl/BasePagination';
import MiniPagination from '../pagination/MiniPagination';

const defaultPageInfo = {
  current: 1,
  pageSize: 10,
};

export interface IGridFooterProps {
  prefix: string;
  pageInfo: IGridPageInfo;
  paginationType: GridPaginationType;
  onChange: (conf: IGridOnChangeConfig) => any;
  onPaginationChange: (pageSize: number, current: number) => any;
}

class Footer extends PureComponent<IGridFooterProps> {
  hasPagination(props?: IGridFooterProps) {
    const { pageInfo } = props || this.props;
    return pageInfo && size(pageInfo);
  }

  getDefaultPagination(props?: IGridFooterProps) {
    const { pageInfo } = props || this.props;

    return this.hasPagination(props)
      ? {
          ...pageInfo,
          current: pageInfo.current || defaultPageInfo.current,
          pageSize: pageInfo.pageSize || defaultPageInfo.pageSize,
        }
      : null;
  }

  handlePageChange: PaginationChangeHandler = ({ pageSize, current }) => {
    const { onPaginationChange } = this.props;
    onPaginationChange && onPaginationChange(pageSize, current);
  };

  render() {
    const { prefix, paginationType } = this.props;
    const curPageInfo = this.getDefaultPagination();

    if (curPageInfo) {
      return (
        <div className={`${prefix}-grid-tfoot`}>
          <div className={classnames(`${prefix}-grid-tfoot-page`)}>
            {paginationType === 'default' && (
              <Pagination {...curPageInfo} onChange={this.handlePageChange} />
            )}
            {paginationType === 'lite' && (
              <LitePagination
                {...curPageInfo}
                onChange={this.handlePageChange}
              />
            )}
            {paginationType === 'mini' && (
              <MiniPagination
                {...curPageInfo}
                onChange={this.handlePageChange}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Footer;
