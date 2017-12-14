import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'select';

import { I18nReciever as Reciever } from 'i18n';
import { Pagination as I18nDefault } from 'i18n/default';

const { number, array, oneOfType, func } = PropTypes;
const { Option } = Select;

export default class Prefix extends (PureComponent || Component) {
  static propTypes = {
    totalItem: number,
    pageSize: oneOfType([number, array]),
    setPageSize: func
  };

  changePageSize = (e, data) => {
    this.props.setPageSize(data.text);
  };

  renderTotal = i18n => {
    const { totalText, itemsText, comma } = i18n;
    return (
      <span className="total">
        {`${totalText} ${this.props.totalItem} ${itemsText}${comma}`}
      </span>
    );
  };

  renderEach = i18n => {
    let { pageSize, currentPageSize } = this.props;
    let isNeedSelect = Array.isArray(pageSize) && pageSize.length > 1;
    pageSize = pageSize.map(item => `${item.value}`);
    const { perPageText, itemsText } = i18n;
    return (
      <span className="each">
        {isNeedSelect ? (
          <Select
            value={currentPageSize}
            onChange={this.changePageSize}
            width={60}
            autoWidth
          >
            {pageSize.map((item, i) => (
              <Option key={i} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        ) : (
          currentPageSize
        )}
        {`${itemsText}${perPageText}`}
      </span>
    );
  };

  render() {
    return (
      <span className="zent-pagination__info">
        <Reciever componentName="Pagination" defaultI18n={I18nDefault}>
          {this.renderTotal}
        </Reciever>
        <Reciever componentName="Pagination" defaultI18n={I18nDefault}>
          {this.renderEach}
        </Reciever>
      </span>
    );
  }
}
