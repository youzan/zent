import React from 'react';
import CorePagination from './modules/CorePagination';
import Prefix from './modules/Prefix';

const { number, func, string, oneOfType } = React.PropTypes;

const ZentPagination = React.createClass({
  propTypes: {
    className: string,
    prefix: string,
    current: number,
    totalItem: number,
    maxPageToShow: oneOfType([number, null]),
    pageSize(conf) {
      let { pageSize } = conf;

      if (typeof pageSize === 'number') {
        if (pageSize < 0) {
          throw new Error('pageSize必须大等于0');
        }
      } else if (Array.isArray(pageSize)) {
        let isAllNumber;
        if (pageSize.length === 0) {
          throw new Error('pageSize的长度必须大于0');
        }

        isAllNumber = pageSize.every((item) => {
          return (typeof item === 'number' || typeof item === 'object');
        });

        if (!isAllNumber) {
          throw new Error('pageSize每一项必须是数字或对象');
        }
      } else {
        throw Error('pageSize只能是数字或数组');
      }
    },
    onChange: func
  },

  // 为了能本地动态修改每页个数，得自己缓存pageSize了
  getInitialState() {
    let pageSize = this.parsePageSize(this.props.pageSize);
    let currentPageSize = this.getCurrentPageSize(pageSize);
    return {
      currentPageSize
    };
  },

  getCurrentPageSize(pageSize) {
    let currentPageSize;

    if (typeof pageSize === 'number') {
      currentPageSize = pageSize;
    } else {
      pageSize.forEach((item) => {
        if (item.isCurrent) {
          currentPageSize = item.value;
        }
      });

      currentPageSize = currentPageSize || pageSize[0].value;
    }

    return currentPageSize;
  },

  parsePageSize(pageSize) {
    let ps;
    if (typeof pageSize === 'number') {
      ps = [{
        value: pageSize,
        isCurrent: true
      }];
    } else {
      let hasCurrent;

      ps = pageSize.map((item) => {
        let tmp;
        if (typeof item === 'number') {
          tmp = {
            value: item
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
  },

  componentWillReceiveProps(nextProps) {
    let pageSize = this.parsePageSize(nextProps.pageSize);
    let currentPageSize = this.getCurrentPageSize(pageSize);
    this.setState({
      currentPageSize
    });
  },

  getDefaultProps() {
    return {
      prefix: 'zent',
      pageSize: 10,
      className: ''
    };
  },

  setPageSize(num) {
    this.setState({
      currentPageSize: parseInt(num, 10)
    });
  },

  render() {
    // 如果传入的current小于1则进行修改
    let { totalItem, current, pageSize, maxPageToShow } = this.props;
    pageSize = this.parsePageSize(pageSize);
    let { currentPageSize } = this.state;

    let totalPage = Math.ceil(totalItem / currentPageSize);

    current = current > 1 ? current : 1; // 最小值限定
    current = current > totalPage ? totalPage : current; // 最大值限定

    return (
      <div className={`${this.props.prefix}-pagination ${this.props.className}`}>
        <Prefix pageSize={pageSize} currentPageSize={currentPageSize} totalItem={totalItem} setPageSize={this.setPageSize} />
        {
          totalPage > 1 &&
            <CorePagination maxPageToShow={maxPageToShow} current={current} total={totalPage} onChange={this.props.onChange || function () {}} />
        }
      </div>
    );
  }
});

export default ZentPagination;
