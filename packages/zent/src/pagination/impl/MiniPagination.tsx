import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import MiniPageList from '../components/list/MiniPageList';
import layoutMini from '../layout/mini';
import BasePagination from './BasePagination';

export default class MiniPagination extends BasePagination {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    buttonBordered: PropTypes.bool,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: layoutMini(this.getLayoutOptions(props)),
    };
  }

  render() {
    const { current, buttonBordered, className } = this.props;
    const { layout } = this.state;

    return (
      <div className={cx('zent-pagination zent-pagination--mini', className)}>
        <MiniPageList
          layout={layout}
          current={current}
          onPageChange={this.onPageChange}
          buttonBordered={buttonBordered}
        />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldUpdateLayout(this.props, nextProps)) {
      this.setState({
        layout: layoutMini(this.getLayoutOptions(nextProps)),
      });
    }
  }
}
