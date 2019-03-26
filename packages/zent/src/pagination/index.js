import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';

import CorePagination from './modules/CorePagination';
import Prefix from './modules/Prefix';

const { number, func, string } = PropTypes;

export default class Pagination extends PureComponent {
  static propTypes = {
    className: string,
    prefix: string,
    current: number,
    onChange: func,
    totalItem: number,
    maxPageToShow: number,
    pageSize(conf) {
      let { pageSize } = conf;

      if (typeof pageSize === 'number') {
        if (pageSize < 0) {
          return new Error('PageSize must be greater than or equal to 0.');
        }
      } else if (Array.isArray(pageSize)) {
        let isAllNumber;
        if (pageSize.length === 0) {
          return new Error('The length of pageSize must be greater than 0.');
        }

        isAllNumber = pageSize.every(item => {
          return typeof item === 'number' || typeof item === 'object';
        });

        if (!isAllNumber) {
          return new Error('Each item of pageSize must be a number or object.');
        }
      } else {
        return new Error('PageSize can only be numbers or arrays.');
      }
    },

    // Change callback when pageSize is an array
    onPageSizeChange: func,
  };

  static defaultProps = {
    prefix: 'zent',
    pageSize: 10,
    className: '',
    onChange: noop,
  };

  // 为了能本地动态修改每页个数，得自己缓存pageSize了
  state = {
    currentPageSize: this.getCurrentPageSize(
      this.parsePageSize(this.props.pageSize)
    ),
  };

  setPageSize = num => {
    const ps = parseInt(num, 10);

    const { onPageSizeChange } = this.props;
    let shouldChangePageSize = true;
    if (isFunction(onPageSizeChange)) {
      shouldChangePageSize = onPageSizeChange(ps);
    }

    // Don't change page size if onPageSizeChange returns `false`
    if (shouldChangePageSize !== false) {
      this.setState({
        currentPageSize: ps,
      });
    }
  };

  /**
   * [getCurrentPageSize description]
   * @method getCurrentPageSize
   * @param  {[Array]}           ps [从parsePageSize返回的标准数组]
   * @return {[Number]}              [返回currentPageSize的数字值]
   */
  getCurrentPageSize(ps) {
    for (let i = 0, len = ps.length; i < len; i++) {
      if (ps[i].isCurrent) {
        return ps[i].value;
      }
    }
    throw new Error(`PageSize data is wrong, ${ps}`);
  }

  parsePageSize(pageSize) {
    let ps;
    if (typeof pageSize === 'number') {
      ps = [
        {
          value: pageSize,
          isCurrent: true,
        },
      ];
    } else {
      let hasCurrent;
      ps = pageSize.map(item => {
        let tmp;
        if (typeof item === 'number') {
          tmp = {
            value: item,
          };
        } else {
          tmp = item;
          if (tmp.isCurrent) {
            hasCurrent = true;
          }
        }
        return tmp;
      });
      if (!hasCurrent) {
        ps[0].isCurrent = true;
      }
    }
    return ps;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.pageSize, nextProps.pageSize)) {
      let pageSize = this.parsePageSize(nextProps.pageSize);
      let currentPageSize = this.getCurrentPageSize(pageSize);
      this.setState({
        currentPageSize,
      });
    }
  }

  render() {
    // 如果传入的current小于1则进行修改
    let { totalItem, current, pageSize, maxPageToShow } = this.props;
    pageSize = this.parsePageSize(pageSize);
    let { currentPageSize } = this.state;

    let totalPage = Math.ceil(totalItem / currentPageSize);

    current = current > 1 ? current : 1; // 最小值限定
    current = current > totalPage ? totalPage : current; // 最大值限定

    return (
      <div
        className={`${this.props.prefix}-pagination ${this.props.className}`}
      >
        <Prefix
          pageSize={pageSize}
          currentPageSize={currentPageSize}
          totalItem={totalItem}
          setPageSize={this.setPageSize}
        />
        {totalPage > 1 && (
          <CorePagination
            maxPageToShow={maxPageToShow}
            current={current}
            total={totalPage}
            onChange={this.props.onChange}
          />
        )}
      </div>
    );
  }
}
