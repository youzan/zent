import React from 'react';
import { Pagination } from 'zent';
import classnames from 'classnames';
import size from 'lodash/size';
import get from 'lodash/get';
import has from 'lodash/has';

class Footer extends React.Component {
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
          current: pageInfo.current || 1,
          pageSize: pageInfo.pageSize || 10
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

    return pageInfo
      ? <div className={classnames(`${prefix}-grid-tfoot-page`)}>
          <Pagination {...pageInfo} onChange={this.handlePageChange} />
        </div>
      : null;
  };

  componentWillReceiveProps(nextProps) {
    if (has(nextProps, 'pageInfo') || has(this.props, 'pageInfo')) {
      this.setState(previousState => {
        const newPagination = {
          ...previousState.pageInfo,
          ...nextProps.pageInfo
        };

        newPagination.current = newPagination.current || 1;
        newPagination.pageSize = newPagination.pageSize || 10;

        return {
          pageInfo: this.hasPagination(nextProps) ? newPagination : null
        };
      });
    }
  }

  render() {
    const { prefix } = this.props;

    return (
      <div className={`${prefix}-grid-tfoot`}>
        {this.renderPage()}
      </div>
    );
  }
}

export default Footer;
