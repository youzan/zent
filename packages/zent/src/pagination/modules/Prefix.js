import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'select';

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

  renderSelect() {
    let { pageSize, currentPageSize } = this.props;

    pageSize = pageSize.map(item => `${item.value}`);

    return (
      <span className="each">
        ，每页
        <Select value={currentPageSize} onChange={this.changePageSize}>
          {pageSize.map((item, i) =>
            <Option key={i} value={item}>
              {item}
            </Option>
          )}
        </Select>
        条
      </span>
    );
  }

  render() {
    let { pageSize, totalItem, currentPageSize } = this.props;
    let isNeedSelect = Array.isArray(pageSize) && pageSize.length > 1;

    return (
      <span className="zent-pagination__info">
        <span className="total">
          共{totalItem}条
        </span>
        {!isNeedSelect &&
          <span className="each">
            ，每页{currentPageSize}条
          </span>}
        {isNeedSelect && this.renderSelect()}
      </span>
    );
  }
}
