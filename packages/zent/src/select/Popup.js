/**
 * Popup
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

import Search from './components/Search';
import Option from './components/Option';
import { KEY_EN, KEY_UP, KEY_DOWN } from './constants';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyCode: '',
      keyword: ''
    };
    this.currentId = null;
    this.sourceData = props.data;
    this.searchFilterHandler = this.searchFilterHandler.bind(this);
    this.optionChangedHandler = this.optionChangedHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.sourceData = nextProps.data;
    if (
      nextProps.keyCode === KEY_EN &&
      this.state.keyCode === nextProps.keyCode
    ) {
      return;
    }
    this.updateCurrentId(nextProps.keyCode, nextProps.keyword);
    if (nextProps.keyword === null) {
      this.setState({
        keyCode: nextProps.keyCode,
        data: nextProps.data
      });
    } else {
      this.setState({
        keyCode: nextProps.keyCode,
        data: nextProps.data,
        keyword: nextProps.keyword
      });
    }
  }

  optionChangedHandler(ev, cid) {
    this.setState({
      keyword: ''
    });
    this.props.onBlur();
    this.props.onChange(
      ev,
      this.props.data.filter(item => item.cid === cid)[0]
    );
  }

  searchFilterHandler(keyword) {
    let { filter, onAsyncFilter } = this.props;

    if (typeof onAsyncFilter === 'function') {
      onAsyncFilter(`${keyword}`, data => {
        this.setState({
          keyword,
          data: this.sourceData.filter(
            item => isArray(data) && data.indexOf(item.value) > -1
          )
        });
      });
    } else {
      // keyword 为空或者没有 filter 则不过滤
      this.setState({
        keyword,
        data: this.sourceData.filter(
          item => !keyword || !filter || filter(item, `${keyword}`)
        )
      });
    }
  }

  updateCurrentId(code, keyword) {
    let itemIds = this.itemIds;
    let index = itemIds.indexOf(this.currentId);

    switch (code) {
      case KEY_DOWN:
        if (index < 0) {
          this.currentId = this.itemIds[0];
        } else if (this.itemIds[index + 1]) {
          this.currentId = this.itemIds[index + 1];
        } else {
          this.currentId = null;
        }
        break;
      case KEY_UP:
        if (index >= 0) {
          this.currentId = this.itemIds[index - 1];
        } else {
          this.currentId = this.itemIds[this.itemIds.length - 1];
        }
        break;
      case KEY_EN:
        this.optionChangedHandler(keyword, this.currentId);
        this.currentId = null;
        break;
      default:
        break;
    }
  }

  render() {
    let {
      cid,
      selectedItems,
      emptyText,
      prefixCls,
      extraFilter,
      searchPlaceholder,
      filter,
      onFocus,
      onBlur,
      open
    } = this.props;

    let { keyword, data } = this.state;

    let filterData = data.filter(item => {
      return !keyword || !filter || filter(item, `${keyword}`);
    });
    let showEmpty = data.length === 0 || filterData.length === 0;

    this.itemIds = filterData.map(item => item.cid);

    return (
      <div
        tabIndex="0"
        className={`${prefixCls}-popup`}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {!extraFilter && filter && open
          ? <Search
              keyword={keyword}
              prefixCls={prefixCls}
              placeholder={searchPlaceholder}
              onChange={this.searchFilterHandler}
            />
          : ''}
        {filterData.map((item, index) => {
          if (keyword && item.text === keyword) {
            this.currentId = item.cid;
          } else if (keyword) {
            this.currentId = null;
          }
          let currentCls = this.currentId !== null &&
            item.cid === this.currentId
            ? 'current'
            : '';
          let activeCls = selectedItems.filter(o => o.cid === item.cid).length >
            0 || item.cid === cid
            ? 'active'
            : '';
          return (
            <Option
              key={index}
              className={`${prefixCls}-option ${activeCls} ${currentCls}`}
              {...item}
              onClick={this.optionChangedHandler}
            />
          );
        })}
        {showEmpty &&
          <Option
            className={`${prefixCls}-empty`}
            text={emptyText}
            onClick={this.optionChangedHandler}
          />}
      </div>
    );
  }
}

Popup.propTypes = {
  cid: PropTypes.string,
  keyword: PropTypes.any,
  selectedItems: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.any,
  prefixCls: PropTypes.string,
  extraFilter: PropTypes.bool,
  filter: PropTypes.func,
  onAsyncFilter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Popup.defaultProps = {
  cid: -1,
  keyword: '',
  selectedItems: [],
  emptyText: '',
  prefixCls: '',
  extraFilter: false,
  searchPlaceholder: ''
};

export default Popup;
