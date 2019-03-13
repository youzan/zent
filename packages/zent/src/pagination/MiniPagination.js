import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import MiniPageList from './components/list/MiniPageList';
import layoutMini from './layout/mini';
import BasePagination from './impl/BasePagination';

export default class MiniPagination extends BasePagination {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    buttonBordered: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    // Don't give a default value
    // total: 0,

    current: 1,
    pageSize: 10,
    buttonBordered: false,
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
