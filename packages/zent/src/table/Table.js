/* eslint-disable no-lonely-if */
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Loading from 'loading';
import PropTypes from 'prop-types';
import isBrowser from 'utils/isBrowser';
import throttle from 'lodash/throttle';

import Head from './modules/Head';
import Body from './modules/Body';
import Foot from './modules/Foot';

const { func, bool, string, array, oneOf, object } = PropTypes;

export default class Table extends (PureComponent || Component) {
  static propTypes = {
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
    selection: object,
    expandation: object,
    batchComponentsAutoFixed: bool,
    batchComponents: array
  };

  static defaultProps = {
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
    selection: null,
    batchComponentsAutoFixed: true,
    batchComponents: null
  };

  constructor(props) {
    super(props);

    this.state = {
      current: props.pageInfo ? props.pageInfo.current : 1,
      placeHolderHeight: false,
      fixStyle: {}
    };
    this.tableRect = null;
    this.relativeTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.pageInfo ? nextProps.pageInfo.current : 1
    });
  }

  componentDidMount() {
    const { batchComponents } = this.props;

    this.calculateRectParam();
    if (batchComponents && batchComponents.length > 0) {
      this.throttleSetBatchComponents = throttle(
        () => {
          this.calculateRectParam();
          this.toggleBatchComponents();
        },
        100,
        {
          leading: true
        }
      );

      window.addEventListener('scroll', this.throttleSetBatchComponents, true);
      window.addEventListener('resize', this.throttleSetBatchComponents, true);
    }
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.throttleSetBatchComponents, true);
    window.removeEventListener('resize', this.throttleSetBatchComponents, true);
  }

  calculateRectParam() {
    this.tableRectTop = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
    this.tableRectHeight = ReactDOM.findDOMNode(
      this
    ).getBoundingClientRect().height;
    this.relativeTop =
      this.tableRectTop - document.documentElement.getBoundingClientRect().top;
  }

  toggleBatchComponents() {
    if (this.isTableInView() && !this.isFootInView()) {
      if (!this.state.batchComponentsAutoFixed) {
        this.setState({
          batchComponentsAutoFixed: true
        });
      }
    } else {
      if (this.state.batchComponentsAutoFixed) {
        this.setState({
          batchComponentsAutoFixed: false
        });
      }
    }
  }

  // 对外部传进来的onChange进行封装
  wrapPropsOnChange(conf) {
    if (typeof this.props.onChange !== 'function') {
      throw new Error('请传入一个onChange方法');
    }
    this.props.onChange(conf);
  }

  onChange = conf => {
    this.setState(conf);

    this.wrapPropsOnChange(conf);
  };

  onSort = conf => {
    // 排序的时候也要触发
    this.wrapPropsOnChange(conf);
  };

  onPageChange = current => {
    this.wrapPropsOnChange({
      current
    });
    if (this.props.autoScroll) {
      this.scrollToTop(400);
    }
  };

  /*
   * Head上的选中会全选所有的行
   * @param isSelect {Boolean} 表示是否全选
   */
  onSelectAllRows = isSelect => {
    let allRowKeys = [];
    let allRows = [];
    let {
      rowKey,
      datasets,
      selection,
      getRowConf = () => {
        return { canSelect: true };
      }
    } = this.props;

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

    selection.onSelect(allRowKeys, allRows, null);
  };

  /**
   * 选了一行
   * @param rowKey {String} 某一行的key
   * @param isSelect {Boolean} 是否被选中
   */
  onSelectOneRow = (rowKey, isSelect) => {
    let selectedRowKeys = this.props.selection.selectedRowKeys.slice(0); // copy 一份数组
    let index = selectedRowKeys.indexOf(rowKey);
    let isSingleSelection = this.props.selection.isSingleSelection || false;

    if (isSingleSelection) {
      // radio的isSelect永远是true，所以一旦选择了，则不能取消
      if (isSelect) {
        selectedRowKeys = [rowKey];
      } else {
        selectedRowKeys = [];
      }
    } else if (isSelect && index === -1) {
      selectedRowKeys.push(rowKey);
    } else if (index !== -1) {
      selectedRowKeys.splice(index, 1);
    }

    let selectedRows = this.getSelectedRowsByKeys(selectedRowKeys);
    let currentRow = isSelect ? this.getCurrentRow(rowKey) : null;

    this.props.selection.onSelect(selectedRowKeys, selectedRows, currentRow);
  };

  getCurrentRow(key) {
    let currentRow;
    let self = this;

    if (key) {
      this.props.datasets.forEach(item => {
        if (item[self.props.rowKey] === key) {
          currentRow = item;
        }
      });
    }

    return currentRow;
  }

  isTableInView() {
    const tableY =
      this.tableRectTop - document.documentElement.getBoundingClientRect().top;
    return (
      tableY + this.tableRectHeight > window.pageYOffset &&
      tableY <= window.pageYOffset + window.innerHeight
    );
  }

  isFootInView() {
    const footRect = ReactDOM.findDOMNode(this.foot).getBoundingClientRect();
    const footY =
      footRect.top - document.documentElement.getBoundingClientRect().top;
    return (
      footY + footRect.height > window.pageYOffset &&
      footY <= window.pageYOffset + window.innerHeight
    );
  }

  /**
   * 根据选择的keys拼装一个选好的列
   * @param rowKeys Array 一个keys的数组
   * @return rows Array 一个每行的数据的数组
   */
  getSelectedRowsByKeys(rowKeys) {
    let rows = [];
    let self = this;

    this.props.datasets.forEach(item => {
      if (rowKeys.indexOf(item[self.props.rowKey]) >= 0) {
        rows.push(item);
      }
    });

    return rows;
  }

  scrollToTop(scrollDuration) {
    if (!isBrowser) return;

    const scrollHeight = window.scrollY;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;

    let scrollCount = 0;
    let scrollMargin;
    let scrollInterval = setInterval(() => {
      if (window.scrollY > this.relativeTop) {
        scrollCount += 1;
        scrollMargin =
          cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else {
        clearInterval(scrollInterval);
      }
    }, 16);
  }

  render() {
    let {
      selection,
      prefix,
      columns,
      className,
      sortBy,
      autoStick,
      sortType,
      datasets,
      rowKey,
      pageInfo,
      emptyLabel,
      getRowConf = () => {
        return { canSelect: true, rowClass: '' };
      },
      expandation = null,
      batchComponents = null
    } = this.props;

    let needSelect = selection !== null;
    let isSingleSelection;
    if (selection) {
      isSingleSelection = selection.isSingleSelection || false;
    }
    let selectedRowKeys = [];

    let isSelectAll = false;
    let isSelectPart = false;

    let needExpand = false;
    let isExpanded;
    let expandRender;
    if (expandation) {
      needExpand = true;
      isExpanded = expandation.isExpanded;
      expandRender = expandation.expandRender;
    }

    if (needSelect) {
      let canSelectRowsCount = 0;

      datasets.forEach((item, index) => {
        let { canSelect = true } = getRowConf(item, index);
        if (canSelect) {
          canSelectRowsCount += 1;
        }
      });

      isSelectAll =
        canSelectRowsCount > 0 &&
        selection.selectedRowKeys.length === canSelectRowsCount;
      isSelectPart =
        canSelectRowsCount > 0 &&
        selection.selectedRowKeys.length > 0 &&
        !isSelectAll;
      selectedRowKeys = selection.selectedRowKeys;
    }

    return (
      <div className={`${prefix}-table-container`}>
        <Loading show={this.props.loading} static>
          {columns &&
            <div className={`${prefix}-table ${className}`}>
              {this.state.placeHolderHeight &&
                <div className="thead place-holder">
                  <div className="tr">
                    {this.cloneHeaderContent()}
                  </div>
                </div>}
              <Head
                ref={c => (this.head = c)}
                columns={columns}
                sortBy={sortBy}
                sortType={sortType}
                onSort={this.onSort}
                selection={{
                  needSelect,
                  onSelectAll: this.onSelectAllRows,
                  isSingleSelection,
                  isSelectAll,
                  isSelectPart
                }}
                needExpand={needExpand}
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
                  isSingleSelection,
                  onSelect: this.onSelectOneRow
                }}
                needExpand={needExpand}
                isExpanded={isExpanded}
                expandRender={expandRender}
              />
              <Foot
                ref={c => (this.foot = c)}
                batchComponents={batchComponents}
                pageInfo={pageInfo}
                batchComponentsAutoFixed={this.state.batchComponentsAutoFixed}
                selection={{
                  needSelect,
                  isSingleSelection,
                  onSelectAll: this.onSelectAllRows,
                  selectedRows: this.getSelectedRowsByKeys(selectedRowKeys),
                  isSelectAll,
                  isSelectPart
                }}
                current={this.state.current}
                onPageChange={this.onPageChange}
              />
            </div>}
        </Loading>
      </div>
    );
  }
}
