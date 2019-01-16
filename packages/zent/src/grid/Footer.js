import React, { PureComponent } from 'react';
import Pagination from 'pagination';
import classnames from 'classnames';
import size from 'lodash/size';

const defaultPageInfo = {
  current: 1,
  pageSize: 10,
};

class Footer extends PureComponent {
  hasPagination(props) {
    const { pageInfo } = props || this.props;
    return pageInfo && size(pageInfo);
  }

  getDefaultPagination(props) {
    const { pageInfo } = props || this.props;

    return this.hasPagination(props)
      ? {
          ...pageInfo,
          current: pageInfo.current || defaultPageInfo.current,
          pageSize: pageInfo.pageSize || defaultPageInfo.pageSize,
        }
      : null;
  }

  handlePageChange = ({ pageSize, current }) => {
    const { onPaginationChange } = this.props;
    onPaginationChange && onPaginationChange(pageSize, current);
  };

  render() {
    const { prefix } = this.props;
    const curPageInfo = this.getDefaultPagination();

    if (curPageInfo) {
      return (
        <div className={`${prefix}-grid-tfoot`}>
          <div className={classnames(`${prefix}-grid-tfoot-page`)}>
            <Pagination {...curPageInfo} onChange={this.handlePageChange} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Footer;
