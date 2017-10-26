import React, { Component } from 'react';
import { Loading, Pagination, Affix } from 'zent';
import map from 'lodash/map';

import OrderItem from './OrderItem';

import './style.pcss';

class OrderList extends Component {
  render() {
    const {
      list,
      loading,
      pageInfo: { page, count, total },
      onChange
    } = this.props;

    if (loading) {
      return <Loading show />;
    }

    return (
      <div className="order-list-container">
        <div className="order-list-container__table">
          <Affix>
            <div className="order-table__header-region">
              <div className="head-cell text-align-left image-cell">商品</div>
              <div className="head-cell text-align-left title-cell" />
              <div className="head-cell text-align-right price-cell">单价/数量</div>
              <div className="head-cell aftermarket-cell">售后</div>
              <div className="head-cell customer-cell">买家</div>
              <div className="head-cell time-cell">下单时间</div>
              <div className="head-cell state-cell">订单状态</div>
              <div className="head-cell pay-price-cell">实付金额</div>
            </div>
          </Affix>
          {map(list, (item, index) => {
            return <OrderItem key={index} orderInfo={item} />;
          })}
        </div>
        <Pagination
          current={page}
          totalItem={total}
          onChange={onChange}
          pageSize={count}
        />
      </div>
    );
  }
}

export default OrderList;
