import React, { Component } from 'react';
import { Popover } from 'zent';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import ResultList from './ResultList';
import makeSearcher from './search';
import './style.pcss';
import { SKIP_SCROLL } from './constants';

const i18n = {
  'zh-CN': {
    placeholder: '搜索组件...'
  },

  'en-US': {
    placeholder: 'Search components...'
  }
};

class SearchBox extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    navData: PropTypes.array.isRequired
  };

  state = {
    keyword: '',
    activeIndex: SKIP_SCROLL,
    matches: [],
    resultVisible: false
  };

  constructor(props) {
    super(props);
    this.buildLUT(props.navData);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.navData, this.props.navData)) {
      this.buildLUT();
    }
  }

  render() {
    const { keyword, matches, activeIndex, resultVisible } = this.state;
    const { locale } = this.props;

    return (
      <Popover
        position={Popover.Position.BottomLeft}
        visible={resultVisible}
        cushion={5}
        onVisibleChange={this.onResultVisibleChange.bind(this)}
        display="inline-block"
        wrapperClassName="zandoc-react-search-box-popover-wrapper"
      >
        <Popover.Trigger.Click>
          <input
            className="zandoc-react-search-box-input"
            placeholder={i18n[locale].placeholder}
            value={keyword}
            onChange={this.onKeywordChange.bind(this)}
            onClick={this.onInputClick.bind(this)}
            onKeyDown={this.onKeydown.bind(this)}
          />
        </Popover.Trigger.Click>

        <Popover.Content>
          <ResultList
            matches={matches}
            activeIndex={activeIndex}
            locale={locale}
            redirectToResult={this.redirectToResult.bind(this)}
            clearActiveIndex={this.clearActiveIndex.bind(this)}
          />
        </Popover.Content>
      </Popover>
    );
  }

  // react-hot-loader rewrites this function into an infinite loop... lol
  // if we use arrow function here
  onKeywordChange(evt) {
    const keyword = evt.target.value;
    if (keyword !== this.state.keyword) {
      this.search(keyword);
    }
  }

  onKeydown(evt) {
    const { key } = evt;

    if (key === 'Enter') {
      return setTimeout(() => {
        const { matches } = this.state;
        if (!isEmpty(matches)) {
          let { activeIndex } = this.state;
          if (activeIndex < 0) {
            activeIndex = 0;
          }
          this.redirectToResult(matches[activeIndex]);
        }
      }, 0);
    }

    if (key !== 'ArrowDown' && key !== 'ArrowUp') {
      return;
    }

    const { resultVisible } = this.state;
    if (!resultVisible) {
      this.setState({
        activeIndex: 0,
        resultVisible: true
      });
      return;
    }

    // Scroll list with arrow keys
    let { activeIndex } = this.state;
    if (activeIndex === SKIP_SCROLL) {
      activeIndex = -1;
    }

    if (key === 'ArrowDown') {
      activeIndex++;
    } else if (key === 'ArrowUp') {
      activeIndex--;
    } else {
      return;
    }
    const { matches } = this.state;
    const maxIndex = matches.length - 1;
    if (activeIndex < 0) {
      activeIndex = maxIndex;
    } else if (activeIndex > maxIndex) {
      activeIndex = 0;
    }

    this.setState({
      activeIndex,
      resultVisible: true
    });
  }

  onResultVisibleChange(visible) {
    this.setState({
      resultVisible: visible
    });
  }

  onInputClick() {
    this.search(this.state.keyword);
  }

  clearActiveIndex() {
    this.setState({
      activeIndex: SKIP_SCROLL
    });
  }

  buildLUT(navData) {
    // Only include components
    const { groups } = navData[1];
    const data = groups.reduce(
      // eslint-disable-next-line
      (lut, grp) =>
        // eslint-disable-next-line
        grp.list.reduce((lut, item) => {
          lut.push(item);
          return lut;
        }, lut),
      []
    );

    data.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title === b.title) {
        return 0;
      }

      return -1;
    });

    this.lut = makeSearcher(data);
  }

  search(keyword) {
    if (!this.lut) {
      return;
    }

    const matches = this.lut.search(keyword);

    this.setState({
      keyword,
      resultVisible: true,
      matches,
      activeIndex: 0
    });
  }

  redirectToResult(item) {
    const { path } = item;
    const { history, locale } = this.props;
    const prefix = locale.split('-')[0];

    history.replace(`/${prefix}/${path}`);
    this.onResultVisibleChange(false);
  }
}

export default withRouter(SearchBox);
