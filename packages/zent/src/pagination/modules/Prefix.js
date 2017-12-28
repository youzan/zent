import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'select';

import { I18nReceiver as Receiver } from 'i18n';
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

  render() {
    const { totalItem, pageSize, currentPageSize } = this.props;
    const isNeedSelect = Array.isArray(pageSize) && pageSize.length > 1;
    const pageSizeForSelect = pageSize.map(item => `${item.value}`);
    return (
      <span className="zent-pagination__info">
        <Receiver componentName="Pagination" defaultI18n={I18nDefault}>
          {i18n => (
            <span className="total each">
              {`${i18n.total} ${totalItem} ${i18n.items}${i18n.comma}`}
              {isNeedSelect ? (
                <Select
                  value={currentPageSize}
                  onChange={this.changePageSize}
                  width={60}
                  autoWidth
                >
                  {pageSizeForSelect.map((item, i) => (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              ) : (
                currentPageSize
              )}
              {`${i18n.items}${i18n.perPage}`}
            </span>
          )}
        </Receiver>
      </span>
    );
  }
}
