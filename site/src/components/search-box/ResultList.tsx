import { Component, createRef } from 'react';
import cx from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { smoothScroll } from 'zent';

import { SKIP_SCROLL } from './constants';
import { INavItem, Locale } from '../../types';

const i18n = {
  'zh-CN': {
    notFound: '未找到结果',
  },
  'en-US': {
    notFound: 'No results found',
  },
};

export interface IResultListProps {
  matches: INavItem[];
  locale: Locale;
  activeIndex: number;
  redirectToResult: (page: INavItem) => void;
  clearActiveIndex: () => void;
}

export default class ResultList extends Component<IResultListProps> {
  listRef = createRef<HTMLUListElement>();

  itemHeight = 0;

  componentDidUpdate() {
    this.scrollActiveElementToViewport();
  }

  render() {
    const { matches, locale, activeIndex, redirectToResult } = this.props;

    if (!matches || matches.length === 0) {
      return (
        <div className="zandoc-react-search-box-result-list zandoc-react-search-box-result-list--no-result">
          {i18n[locale].notFound}
        </div>
      );
    }

    return (
      <ul
        className="zandoc-react-search-box-result-list"
        ref={this.listRef}
        onMouseMove={this.props.clearActiveIndex}
      >
        {matches.map((item, idx) => {
          const { title, subtitle, path } = item;

          return (
            <li
              key={path}
              className={cx('zandoc-react-search-box-result-item', {
                'zandoc-react-search-box-result-item__active':
                  idx === activeIndex,
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

  getListItemHeight() {
    if (this.listRef.current && !this.itemHeight) {
      const itemNode = this.listRef.current.querySelector(
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
    if (!this.listRef.current || activeIndex === SKIP_SCROLL) {
      return;
    }

    const { scrollTop, offsetHeight } = this.listRef.current;
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

      smoothScroll(this.listRef.current, 0, scrollY, 100);
    }
  }
}
