import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import parser from '../data/parser';
import Pager from './Pager';
import Jump from './Jump';

const { number, func } = PropTypes;

export default class CorePagination extends (PureComponent || Component) {
  static propTypes = {
    current: number,
    total: number,
    onChange: func
  };

  renderPager = (item, index) => {
    if (!item) {
      return null;
    }

    if (item.type === 'input') {
      return (
        <Jump
          key={index}
          content={item.content}
          total={item.total}
          onChange={this.props.onChange}
        />
      );
    }

    return (
      <Pager
        key={index}
        content={item.content}
        current={item.current}
        target={item.target}
        type={item.type}
        onChange={this.props.onChange}
      />
    );
  };

  render() {
    let { current, total, maxPageToShow } = this.props;

    if (maxPageToShow && maxPageToShow > 0) {
      total = Math.min(total, maxPageToShow);
    }

    let pages = parser.getPages({
      current,
      total
    });

    return (
      <div className="pagination-list">
        {pages.map((item, index) => this.renderPager(item, index))}
      </div>
    );
  }
}
