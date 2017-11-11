import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';

const i18n = {
  'zh-CN': {
    notFound: '未找到结果'
  },
  'en-US': {
    notFound: 'No result found'
  }
};

export default class ResultList extends Component {
  static propTypes = {
    matches: PropTypes.array,
    locale: PropTypes.string.isRequired,
    activeIndex: PropTypes.number,
    redirectToResult: PropTypes.func.isRequired
  };

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
      <ul className="zandoc-react-search-box-result-list">
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
}
