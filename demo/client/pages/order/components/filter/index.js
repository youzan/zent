/**
 * 订单筛选区域
 */

import React, { Component } from 'react';
import { Input, Select, Button, DatePicker, DateRangeQuickPicker } from 'zent';
import Field from './Field';
import TabsFilter from './TabsFilter';
import * as Helper from '../../helper';
import {
  orderLabelMap,
  typeMap,
  stateMap,
  buyWayMap,
  expressTypeMap
} from '../../constants';

export default class Filter extends Component {
  state = {
    order_label: 'order_no',
    order_label_value: '',
    start_time: '',
    end_time: '',
    choose_days: 0,
    type: 'all',
    state: 'all',
    express_type: 'all',
    feedback: 'all',
    buy_way: 'all',
    period_send_time: ''
  };

  handleChangeDate = (value, chooseDays) => {
    this.setState({
      start_time: value[0],
      end_time: value[1],
      choose_days: chooseDays
    });
  };

  hanleChangePeriodDate = periodTime => {
    this.setState({
      period_send_time: periodTime
    });
  };

  handleChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  };

  // 筛选列表
  onSearch = () => {
    const { handleFilterChange } = this.props;
    handleFilterChange(this.state);
  };

  onExport = () => {};

  handleTabChange = tabId => {
    const { handleFilterChange } = this.props;
    this.setState({
      state: tabId
    });
    handleFilterChange(this.state);
  };

  render() {
    const {
      order_label: orderLabel,
      order_label_value: orderLabelValue,
      type,
      feedback,
      state,
      express_type: expressType,
      buy_way: buyWay,
      start_time: startTime,
      end_time: endTime,
      choose_days: chooseDays,
      period_send_time: periodSendTime
    } = this.state;

    const dateValue = [startTime, endTime];

    return (
      <div className="trade-order-list__filter-div">
        <div className="trade-order-list__filter">
          <div className="trade-order-list__filter-row">
            <div className="trade-order-list__filter-order-search">
              <Select
                wrapperClassName="order-label"
                name="order_label"
                value={orderLabel}
                data={Helper.transformSelectData(orderLabelMap)}
                onChange={this.handleChange}
              />
              <Input
                className="order-input"
                name="order_label_value"
                type="text"
                value={orderLabelValue}
                onChange={this.handleChange}
              />
            </div>
            <Field
              label="订单类型"
              content={
                <Select
                  name="type"
                  value={type}
                  data={Helper.transformSelectData(typeMap)}
                  onChange={this.handleChange}
                />
              }
            />
            <Field
              label="维权状态"
              className="feedback-change-line-style"
              content={
                <Select
                  name="feedback"
                  value={feedback}
                  data={Helper.transformSelectData(stateMap.feedback)}
                  onChange={this.handleChange}
                />
              }
            />
          </div>

          <div
            className="trade-order-list__filter-row"
            style={{ marginLeft: '110px' }}
          >
            <Field
              label="订单状态"
              content={
                <Select
                  name="state"
                  value={state}
                  data={Helper.transformSelectData(stateMap[type])}
                  onChange={this.handleChange}
                />
              }
            />
            <Field
              label="物流方式"
              content={
                <Select
                  name="express_type"
                  value={expressType}
                  data={Helper.transformSelectData(expressTypeMap)}
                  onChange={this.handleChange}
                />
              }
            />
            <Field
              className="buyway-change-line-style"
              label="付款方式"
              content={
                <Select
                  name="buy_way"
                  value={buyWay}
                  data={Helper.transformSelectData(buyWayMap)}
                  onChange={this.handleChange}
                />
              }
            />
          </div>

          <div
            className="trade-order-list__filter-row"
            style={{ marginLeft: '110px' }}
          >
            <Field
              label="订单时间"
              content={
                <DateRangeQuickPicker
                  onChange={this.handleChangeDate}
                  value={dateValue}
                  format="YYYY-MM-DD HH:mm:ss"
                  chooseDays={chooseDays}
                />
              }
            />
          </div>

          {type === 'period' && (
            <div className="trade-order-list__filter-row">
              <Field
                label="送达日期"
                content={
                  <DatePicker
                    name="period_send_time"
                    value={periodSendTime}
                    onChange={this.hanleChangePeriodDate}
                  />
                }
              />
            </div>
          )}

          <div
            className="trade-order-list__filter-row"
            style={{ marginLeft: '170px' }}
          >
            <Button
              className="trade-refundsManage__filter-btn"
              type="primary"
              onClick={this.onSearch}
            >
              筛选
            </Button>
            <Button onClick={this.onExport}>批量导出</Button>
            <Button
              href="https://youzan.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看已导出报表
            </Button>
          </div>
        </div>
        <TabsFilter
          activeId={state}
          tabs={Helper.transformSelectData(stateMap[type])}
          onChange={this.handleTabChange}
        />
      </div>
    );
  }
}
