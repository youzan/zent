import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

import NormalPagination from './impl/NormalPagination';
import LitePagination from './impl/LitePagination';
import MiniPagination from './impl/MiniPagination';

export default class Pagination extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['normal', 'lite', 'mini']),
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    onChange: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    buttonBordered: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'normal',
    total: 0,
    current: 1,
    pageSize: 10,
  };

  render() {
    const { type } = this.props;
    const propsWithNoType = omit(this.props, [
      'type',
      'buttonBordered',
      'total',
      'showQuickJumper',
      'showSizeChanger',
    ]);
    const bordered = this.isBordered();
    const showQuickJumper = this.isShowQuickJumper();
    const showSizeChanger = this.isShowSizeChanger();
    const total = this.getTotal();

    if (type === 'normal') {
      return (
        <NormalPagination
          {...propsWithNoType}
          buttonBordered={bordered}
          showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          total={total}
        />
      );
    }

    if (type === 'lite') {
      return (
        <LitePagination
          {...propsWithNoType}
          buttonBordered={bordered}
          showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          total={total}
        />
      );
    }

    if (type === 'mini') {
      const props = omit(propsWithNoType, ['pageSizeOptions']);
      return (
        <MiniPagination {...props} buttonBordered={bordered} total={total} />
      );
    }
  }

  isBordered() {
    const { type, buttonBordered } = this.props;

    if (!isUndefined(buttonBordered)) {
      return !!buttonBordered;
    }

    if (type === 'normal') {
      return true;
    }

    return false;
  }

  isShowQuickJumper() {
    const { type, showQuickJumper } = this.props;
    if (!isUndefined(showQuickJumper)) {
      return showQuickJumper;
    }

    if (type === 'normal') {
      return true;
    }

    return false;
  }

  isShowSizeChanger() {
    const { type, showSizeChanger } = this.props;
    if (!isUndefined(showSizeChanger)) {
      return showSizeChanger;
    }

    if (type === 'normal') {
      return true;
    }

    return false;
  }

  /**
   * 兼容老的参数
   */
  getTotal() {
    const { total, totalItem } = this.props;

    return total || totalItem;
  }
}
