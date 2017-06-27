/**
 * Popup
 */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

import Search from './components/Search';
import Option from './components/Option';
import { KEY_EN, KEY_UP, KEY_DOWN } from './constants';

class Popup extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      currentId: 0,
      keyword: props.keyword || ''
    };
    this.currentId = 0;
    this.sourceData = props.data;
    this.searchFilterHandler = this.searchFilterHandler.bind(this);
    this.optionChangedHandler = this.optionChangedHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.filter) {
      this.popup.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sourceData = nextProps.data;
    this.setState({
      data: nextProps.data
    });
    if (nextProps.keyword !== null) {
      this.setState({
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

    this.setState({
      keyword
    });
    if (typeof onAsyncFilter === 'function') {
      onAsyncFilter(`${keyword}`, data => {
        this.setState({
          data: this.sourceData.filter(
            item => isArray(data) && data.indexOf(item.value) > -1
          )
        });
      });
    } else {
      // keyword 为空或者没有 filter 则不过滤
      this.setState({
        data: this.sourceData.filter(
          item => !keyword || !filter || filter(item, `${keyword}`)
        )
      });
    }
  }

  keydownHandler(ev) {
    let code = ev.keyCode;
    let itemIds = this.itemIds;
    let { currentId, keyword } = this.state;
    let index = itemIds.indexOf(currentId);
    switch (code) {
      case KEY_DOWN:
        ev.preventDefault();
        if (this.itemIds[index + 1]) {
          currentId = this.itemIds[index + 1];
          this.currentIdUpdated = true;
        }
        break;
      case KEY_UP:
        ev.preventDefault();
        if (index > 0) {
          currentId = this.itemIds[index - 1];
          this.currentIdUpdated = true;
        }
        break;
      case KEY_EN:
        ev.preventDefault();
        this.optionChangedHandler(keyword, currentId);
        this.currentIdUpdated = false;
        break;
      default:
        break;
    }
    this.setState({
      currentId
    });
  }

  updateCurrentId(cid) {
    this.setState({
      currentId: cid
    });
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
      onAsyncFilter,
      onFocus,
      onBlur
    } = this.props;

    let { keyword, data, currentId } = this.state;

    let filterData = data.filter(item => {
      return !keyword || !filter || filter(item, `${keyword}`);
    });

    let showEmpty = data.length === 0 || filterData.length === 0;

    this.itemIds = filterData.map(item => item.cid);

    return (
      <div
        ref={popup => (this.popup = popup)}
        tabIndex="0"
        className={`${prefixCls}-popup`}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={this.keydownHandler}
      >
        {!extraFilter && (filter || onAsyncFilter)
          ? <Search
              keyword={keyword}
              prefixCls={prefixCls}
              placeholder={searchPlaceholder}
              onChange={this.searchFilterHandler}
            />
          : ''}
        {filterData.map((item, index) => {
          if (index === 0 && !currentId) {
            currentId = item.cid;
            this.state.currentId = currentId;
          }
          if (keyword && item.text === keyword) {
            currentId = item.cid;
          }
          let currentCls = item.cid === currentId ? 'current' : '';
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
              onMouseEnter={this.updateCurrentId.bind(this, item.cid)}
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
