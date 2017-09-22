import React, { PureComponent, Component } from 'react';
import Pagination from 'pagination';
import classnames from 'classnames';
import size from 'lodash/size';
import get from 'lodash/get';
import has from 'lodash/has';

const defaultPageInfo = {
  current: 1,
  pageSize: 10
};

class Footer extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      pageInfo: this.getDefaultPagination(props)
    };
  }

  hasPagination(props) {
    const { pageInfo } = props || this.props;
    return pageInfo && size(pageInfo);
  }

  getDefaultPagination(props) {
    const { pageInfo } = props;

    return this.hasPagination(props)
      ? {
          ...pageInfo,
          current: pageInfo.current || defaultPageInfo.current,
          pageSize: pageInfo.pageSize || defaultPageInfo.pageSize
        }
      : null;
  }

  handlePageChange = current => {
    if (get(this.state, 'pageInfo.current', 1) !== current) {
      this.props.onChange({ current });
    }
  };

  renderPage = () => {
    const { prefix } = this.props;
    const { pageInfo } = this.state;

    return pageInfo ? (
      <div className={classnames(`${prefix}-grid-tfoot-page`)}>
        <Pagination {...pageInfo} onChange={this.handlePageChange} />
      </div>
    ) : null;
  };

  componentWillReceiveProps(nextProps) {
    if (has(nextProps, 'pageInfo') || has(this.props, 'pageInfo')) {
      this.setState(previousState => {
        const newPagination = {
          ...previousState.pageInfo,
          ...nextProps.pageInfo
        };

        newPagination.current =
          newPagination.current || defaultPageInfo.current;
        newPagination.pageSize =
          newPagination.pageSize || defaultPageInfo.pageSize;

        return {
          pageInfo: this.hasPagination(nextProps) ? newPagination : null
        };
      });
    }
  }

  render() {
    const { prefix } = this.props;

    if (this.state.pageInfo) {
      return <div className={`${prefix}-grid-tfoot`}>{this.renderPage()}</div>;
    }
    return null;
  }
}

export default Footer;
