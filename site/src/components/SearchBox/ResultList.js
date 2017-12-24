import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';
import scroll from 'utils/scroll';

import { SKIP_SCROLL } from './constants';

const i18n = {
  'zh-CN': {
    notFound: '未找到结果'
  },
  'en-US': {
    notFound: 'No results found'
  }
};

export default class ResultList extends Component {
  static propTypes = {
    matches: PropTypes.array,
    locale: PropTypes.string.isRequired,
    activeIndex: PropTypes.number,
    redirectToResult: PropTypes.func.isRequired,
    clearActiveIndex: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    this.scrollActiveElementToViewport();
  }

  render() {
    const { matches, locale, activeIndex, redirectToResult } = this.props;

    if (isEmpty(matches)) {
      return (
        <div className="zandoc-react-search-box-result-list zandoc-react-search-box-result-list--no-result">
          {i18n[locale].notFound}
        </div>
      );
    }

    return (
      <ul
        className="zandoc-react-search-box-result-list"
        ref={this.saveListNode}
        onMouseMove={this.props.clearActiveIndex}
      >
        {matches.map((item, idx) => {
          const { title, subtitle, path } = item;

          return (
            <li
              key={path}
              className={cx('zandoc-react-search-box-result-item', {
                'zandoc-react-search-box-result-item__active':
                  idx === activeIndex
              })}
              onClick={() => redirectToResult(item)}
            >
              <span className="zandoc-react-search-box-result-item__title">
                {title}
              </span>
              {subtitle && (
                <span className="zandoc-react-search-box-result-item__subtitle">
                  {subtitle}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  saveListNode = node => {
    this.list = node;
  };

  getListItemHeight() {
    if (this.list && !this.itemHeight) {
      const itemNode = this.list.querySelector(
        '.zandoc-react-search-box-result-item'
      );
      if (itemNode) {
        this.itemHeight = itemNode.scrollHeight;
      }
    }

    return this.itemHeight || 0;
  }

  scrollActiveElementToViewport() {
    const { activeIndex } = this.props;
    const { list } = this;
    if (!list || activeIndex === SKIP_SCROLL) {
      return;
    }

    const { scrollTop, offsetHeight } = list;
    const itemHeight = this.getListItemHeight();
    const activeElementPosition = itemHeight * (activeIndex + 1);
    const actualPosition = scrollTop + offsetHeight;

    // 如果高亮节点不在可见区域就滚动
    const bottomOverflow = activeElementPosition > actualPosition;
    const topOverflow =
      activeElementPosition - itemHeight < actualPosition - offsetHeight;
    if (bottomOverflow || topOverflow) {
      let scrollY;

      if (bottomOverflow) {
        scrollY =
          Math.ceil((activeElementPosition - offsetHeight) / itemHeight) *
          itemHeight;
      } else {
        scrollY =
          Math.ceil((activeElementPosition - itemHeight) / itemHeight) *
          itemHeight;
      }

      scroll(this.list, 0, scrollY, 100);
    }
  }
}
