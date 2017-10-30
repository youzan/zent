/* eslint-disable no-script-url */

import React, { Component } from 'react';
import { Button, Dialog, Input, Layout, Notify } from 'zent';
import map from 'lodash/map';
import fullfillImage from 'zan-utils/fullfillImage';
import formatDate from 'zan-utils/date/formatDate';

const { Row, Col } = Layout;

export default class OrderItem extends Component {
  handleOpenRemark = () => {
    const dialogId = 'order-list-remark-dialog';
    const onClick = () => {
      Dialog.closeDialog(dialogId);
      Notify.success('提交成功');
    };

    Dialog.openDialog({
      dialogId,
      className: 'remark-dialog',
      title: '卖家备注',
      children: <Input type="textarea" placeholder="最多输入256个字" />,
      footer: (
        <Button type="primary" onClick={onClick}>
          提交
        </Button>
      )
    });
  };

  handleStar = () => {
    Notify.success('加星成功');
  };

  render() {
    const { orderInfo } = this.props;

    return (
      <div className="order-table__item-region">
        <Row className="item-header-row">
          <Col span={16} className="header-row-left">
            <div>
              订单号: {orderInfo.order_no}&nbsp;&nbsp;
              <span className="c-gray">{orderInfo.buy_way_str}</span>
            </div>
            <div>
              {orderInfo.outer_transaction_number && (
                <span>
                  外部订单号:{' '}
                  <span className="c-gray">
                    {orderInfo.outer_transaction_number}
                  </span>&nbsp;&nbsp;
                </span>
              )}
              {orderInfo.inner_transaction_number && (
                <span>
                  支付流水号:{' '}
                  <span className="c-gray">
                    {orderInfo.inner_transaction_number}
                  </span>
                </span>
              )}
            </div>
          </Col>
          <Col span={8} className="header-row-right">
            <div className="order-opts-container">
              <div className="js-opts">
                <a
                  href="http://youzan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看详情
                </a>
                &nbsp;-&nbsp;
                <a
                  href="javascript:void(0)"
                  onClick={this.handleOpenRemark}
                  className="js-remark"
                >
                  备注
                </a>
                &nbsp;-&nbsp;
                <a
                  href="javascript:void(0)"
                  onClick={this.handleStar}
                  className="js-star"
                >
                  加星
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {map(orderInfo.items, (goodsItem, itemIndex) => {
          return (
            <div key={itemIndex} className="item-content-row">
              <div className="image-cell cell-style">
                <img
                  alt="商品图片"
                  src={fullfillImage(goodsItem.image_url, '!100x100.jpg')}
                />
              </div>

              <div className="title-cell cell-style">
                <p className="goods-title">
                  <a
                    href={goodsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={goodsItem.title}
                  >
                    {goodsItem.title}
                  </a>
                </p>
                <p>
                  {map(goodsItem.sku, (skuItem, skuIndex) => {
                    return (
                      <span key={skuIndex} className="goods-sku">
                        {skuItem.v}
                      </span>
                    );
                  })}
                  {orderInfo.order_type === '35' && (
                    <span className="goods-sku">
                      {formatDate((goodsItem.goods_info || {}).goods_date)}
                    </span>
                  )}
                </p>
              </div>

              <div className="price-cell cell-style">
                <p className="goods-price">{goodsItem.price}</p>
                <p>{`(${goodsItem.num}件)`}</p>
              </div>

              <div className="aftermarket-cell cell-style">
                {goodsItem.feedback_str && (
                  <div>
                    <a
                      href="https://www.youzan.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {goodsItem.feedback_str}
                    </a>
                    {orderInfo.feedback === 250 && (
                      <a
                        href="https://www.youzan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        钱款去向
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="customer-cell cell-style">
                {orderInfo.customer ? (
                  <p className="user-customer margin-bottom10">
                    {orderInfo.customer}
                  </p>
                ) : (
                  <p>非粉丝</p>
                )}
                <p className="user-name margin-bottom10">
                  {orderInfo.user_name}
                </p>
                <p className="user-tel">{orderInfo.tel}</p>
              </div>

              <div className="time-cell cell-style">{orderInfo.book_time}</div>

              <div className="state-cell cell-style">{orderInfo.state_str}</div>

              <div className="pay-price-cell cell-style">
                <div>
                  {orderInfo.is_points ? (
                    <span>{`${orderInfo.real_point_pay}积分`}</span>
                  ) : (
                    <span>{orderInfo.real_pay}</span>
                  )}
                  <br />
                  {orderInfo.postage !== '0.00' && (
                    <span className="c-gray">{`(含运费: ${orderInfo.postage})`}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
