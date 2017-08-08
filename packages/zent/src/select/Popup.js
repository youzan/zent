/**
 * Popup
 */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import trim from 'lodash/trim';
import Popover from 'popover';
import Search from './components/Search';
import Option from './components/Option';
import { KEY_EN, KEY_UP, KEY_DOWN, KEY_ESC } from './constants';

class Popup extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      // 默认选中第一项
      currentId: props.data[0] ? props.data[0].cid : 0,
      keyword: props.keyword || ''
    };
  }

  componentDidMount() {
    if (!this.props.filter) {
      this.popup.focus();
    }
    this.popup.addEventListener('mousewheel', this.handleScroll);
  }

  handleScroll = evt => {
    if (
      (this.popup.scrollTop === 0 && evt.deltaY < 0) ||
      (this.popup.scrollTop + this.popup.clientHeight ===
        this.popup.scrollHeight &&
        evt.deltaY > 0)
    ) {
      evt.preventDefault();
    }
  };

  componentWillReceiveProps(nextProps) {
    let keyword = nextProps.keyword;
    this.setState({
      data: nextProps.data,
      // 默认选中第一项
      currentId: nextProps.data[0] ? nextProps.data[0].cid : 0
    });

    // trigger中传入的keyword
    if (keyword !== null) {
      this.setState({
        keyword,
        currentId: ''
      });
    }
  }

  optionChangedHandler = (ev, cid) => {
    let { filter, data } = this.props;
    let { keyword } = this.state;
    this.setState({
      keyword: ''
    });
    this.props.popover.close();
    this.props.onChange(
      ev,
      data.filter(
        item =>
          (!keyword || !filter || filter(item, `${keyword}`)) &&
          item.cid === cid
      )[0]
    );
  };

  searchFilterHandler = keyword => {
    let { onAsyncFilter } = this.props;
    keyword = trim(keyword);
    this.setState({
      keyword,
      currentId: ''
    });

    if (typeof onAsyncFilter === 'function') {
      onAsyncFilter(`${keyword}`);
    }
  };

  componentWillUpdate(nextProps, nextState) {
    let { filter } = nextProps;
    let { data, keyword, currentId } = nextState;
    data
      .filter(item => {
        return !keyword || !filter || filter(item, `${keyword}`);
      })
      .forEach((item, index) => {
        if ((keyword && item.text === keyword) || (!currentId && index === 0)) {
          this.setState({
            currentId: item.cid
          });
        }
      });
  }

  keydownHandler = ev => {
    let code = ev.keyCode;
    let itemIds = this.itemIds;
    let { currentId, keyword } = this.state;
    let index = itemIds.indexOf(currentId);
    let popupHeight = this.popup.clientHeight;
    let scrollHeight = this.popup.scrollHeight;
    let currentNode = this.popup.getElementsByClassName('current')[0];
    switch (code) {
      case KEY_ESC:
        this.props.popover.close();
        break;
      case KEY_DOWN:
        ev.preventDefault();
        if (this.itemIds[index + 1]) {
          currentId = this.itemIds[index + 1];
          this.currentIdUpdated = true;
          if (
            currentNode &&
            currentNode.offsetTop + 28 >= this.popup.scrollTop + popupHeight
          ) {
            this.popup.scrollTop = currentNode.offsetTop + 28 * 2 - popupHeight;
          }
        } else {
          currentId = this.itemIds[0];
          this.popup.scrollTop = 0;
        }
        break;
      case KEY_UP:
        ev.preventDefault();
        if (index > 0) {
          currentId = this.itemIds[index - 1];
          this.currentIdUpdated = true;
          if (currentNode && currentNode.offsetTop <= this.popup.scrollTop) {
            this.popup.scrollTop = currentNode.offsetTop - 28;
          }
        } else {
          currentId = this.itemIds[this.itemIds.length - 1];
          this.popup.scrollTop = scrollHeight;
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
  };

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
      maxToShow
    } = this.props;

    let { keyword, data, currentId } = this.state;

    let filterData = data.filter(item => {
      return !keyword || !filter || filter(item, `${keyword}`);
    });

    let showEmpty = data.length === 0 || filterData.length === 0;

    this.itemIds = filterData.map(item => item.cid);

    if (maxToShow && !extraFilter && filter) {
      filterData = take(filterData, maxToShow);
    }

    return (
      <div
        ref={popup => (this.popup = popup)}
        className={`${prefixCls}-popup`}
        onKeyDown={this.keydownHandler}
        tabIndex="0"
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
          let currentCls = item.cid === currentId ? 'current' : '';
          let activeCls =
            selectedItems.filter(o => o.cid === item.cid).length > 0 ||
            item.cid === cid
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
  onAsyncFilter: PropTypes.func
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

export default Popover.withPopover(Popup);
