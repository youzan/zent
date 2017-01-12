import React from 'react';
import ReactDOM from 'react-dom';
import Head from './modules/Head';
import Body from './modules/Body';
import Pagination from '@youzan/zent-pagination';
import Loading from '@youzan/zent-loading';

const { func, bool, string, array, oneOf, object } = React.PropTypes;

let relativeTop;

const Table = React.createClass({
  propTypes: {
    className: string,
    prefix: string,
    columns: array,
    datasets: array,
    onChange: func,
    sortBy: string,
    sortType: oneOf(['desc', 'asc']),
    pageInfo: object,
    rowKey: string,
    loading: bool,
    autoScroll: bool,
    autoStick: bool,
    selection: object
  },

  getDefaultProps() {
    return {
      prefix: 'zent',
      pageSize: 10,
      className: '',
      datasets: [],
      columns: [],
      emptyLabel: '没有更多数据了',
      rowKey: 'id',
      sortType: 'desc',
      loading: false,
      autoScroll: false,
      autoStick: false,
      selection: null
    };
  },

  getInitialState() {
    return {
      current: this.props.pageInfo ? this.props.pageInfo.current : 1,
      placeHolderHeight: false,
      fixStyle: {}
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.pageInfo ? nextProps.pageInfo.current : 1
    });
  },

  componentDidMount() {
    let tableRectTop = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
    relativeTop = tableRectTop - document.body.getBoundingClientRect().top;
  },

  // 对外部传进来的onChange进行封装
  wrapPropsOnChange(conf) {
    if (typeof this.props.onChange !== 'function') {
      throw new Error('请传入一个onChange方法');
    }
    this.props.onChange(conf);
  },

  onChange(conf) {
    this.setState(conf);

    this.wrapPropsOnChange(conf);
  },

  onSort(conf) {
    // 排序的时候也要触发
    this.wrapPropsOnChange(conf);
  },

  onPageChange(current) {
    this.wrapPropsOnChange({
      current
    });
    if (this.props.autoScroll) {
      this.scrollToTop(400);
    }
  },

  /*
   * Head上的选中会全选所有的行
   * @param isSelect {Boolean} 表示是否全选
   */
  onSelectAllRows(isSelect) {
    let allRowKeys = [];
    let allRows = [];
    let { rowKey, datasets, selection, getRowConf = () => { return { canSelect: true } } } = this.props;

    if (isSelect) {
      // 找出所有canSelect为true的row，才能选中
      for (let i = 0, len = datasets.length; i < len; i++) {
        let { canSelect = true } = getRowConf(datasets[i], i);
        if (canSelect) {
          allRowKeys.push(datasets[i][rowKey]);
          allRows.push(datasets[i]);
        }
      }
    }

    selection.onSelect(allRowKeys, allRows);
  },

  /**
   * 选了一行
   * @param rowKey {String} 某一行的key
   * @param isSelect {Boolean} 是否被选中
   */
  onSelectOneRow(rowKey, isSelect) {
    let selectedRowKeys = this.props.selection.selectedRowKeys.slice(0); // copy 一份数组
    let index = selectedRowKeys.indexOf(rowKey);

    if (isSelect) {
      if (index === -1) {
        selectedRowKeys.push(rowKey);
      }
    } else {
      if (index !== -1) {
        selectedRowKeys.splice(index, 1);
      }
    }

    let selectedRows = this.getSelectedRowsByKeys(selectedRowKeys);

    this.props.selection.onSelect(selectedRowKeys, selectedRows);
  },

  /**
   * 根据选择的keys拼装一个选好的列
   * @param rowKeys Array 一个keys的数组
   * @return rows Array 一个每行的数据的数组
   */
  getSelectedRowsByKeys(rowKeys) {
    let rows = [];
    let self = this;

    this.props.datasets.forEach((item) => {
      if (rowKeys.indexOf(item[self.props.rowKey]) >= 0) {
        rows.push(item);
      }
    });

    return rows;
  },

  scrollToTop(scrollDuration) {
    const scrollHeight = window.scrollY;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;

    let scrollCount = 0;
    let scrollMargin;
    let scrollInterval = setInterval(() => {
      if (window.scrollY > relativeTop) {
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, (scrollHeight - scrollMargin));
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  },

  render() {
    let { selection, prefix, columns, className, sortBy, autoStick, sortType, datasets, rowKey, pageInfo, emptyLabel, getRowConf = () => { return { canSelect: true, rowClass: '' } } } = this.props;
    let needSelect = selection !== null;
    let selectedRowKeys = [];

    let isSelectAll = false;
    let isSelectPart = false;

    if (needSelect) {
      let canSelectRowsCount = 0;

      datasets.forEach((item, index) => {
        let { canSelect = true } = getRowConf(item, index);
        if (canSelect) {
          canSelectRowsCount += 1;
        }
      });

      isSelectAll = canSelectRowsCount > 0 && selection.selectedRowKeys.length === canSelectRowsCount;
      isSelectPart = canSelectRowsCount > 0 && selection.selectedRowKeys.length > 0 && !isSelectAll;
      selectedRowKeys = selection.selectedRowKeys;
    }

    return (
      <div className={`${prefix}-table-container`}>
        <Loading show={this.props.loading} static>
          {columns && (
            <table className={`${prefix}-table ${className}`}>
              {
                this.state.placeHolderHeight &&
                  <thead className="place-holder">
                    <tr>
                      {this.cloneHeaderContent()}
                    </tr>
                  </thead>
              }
              <Head
                ref={(c) => this.head = c}
                columns={columns}
                sortBy={sortBy}
                sortType={sortType}
                onSort={this.onSort}
                selection={{
                  needSelect,
                  onSelectAll: this.onSelectAllRows,
                  isSelectAll,
                  isSelectPart
                }}
                autoStick={autoStick}
                style={this.state.fixStyle}
              />
              <Body
                datasets={datasets}
                columns={columns}
                emptyLabel={emptyLabel}
                rowKey={rowKey}
                getRowConf={getRowConf}
                selection={{
                  needSelect,
                  selectedRowKeys,
                  onSelect: this.onSelectOneRow
                }}
              />
            </table>
          )}
        </Loading>
        {pageInfo && (
          <Pagination
            current={this.state.current}
            totalItem={pageInfo.total}
            pageSize={pageInfo.limit}
            maxPageToShow={pageInfo.maxPageToShow}
            onChange={this.onPageChange}
            />
        )}
      </div>
    );
  }
});

export default Table;
