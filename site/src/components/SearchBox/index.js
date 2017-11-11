import React, { Component } from 'react';
import { Popover } from 'zent';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import ResultList from './ResultList';
import makeSearcher from './search';
import './style.pcss';

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
    activeIndex: -1, // not used for now
    matches: [],
    resultVisible: false
  };

  // react-hot-loader rewrites this function into an infinite loop... lol
  // if we use arrow function here
  onKeywordChange(evt) {
    const keyword = evt.target.value;
    this.search(keyword);
  }

  onKeydown(evt) {
    const { key } = evt;

    if (key === 'Enter') {
      setTimeout(() => {
        const { matches } = this.state;
        if (!isEmpty(matches)) {
          this.redirectToResult(matches[0]);
        }
      }, 0);
    }
  }

  onResultVisibleChange(visible) {
    this.setState({
      resultVisible: visible
    });
  }

  onFocus() {
    this.search(this.state.keyword);
  }

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
            onFocus={this.onFocus.bind(this)}
            onKeyDown={this.onKeydown.bind(this)}
          />
        </Popover.Trigger.Click>

        <Popover.Content>
          <ResultList
            matches={matches}
            activeIndex={activeIndex}
            locale={locale}
            redirectToResult={this.redirectToResult.bind(this)}
          />
        </Popover.Content>
      </Popover>
    );
  }

  buildLUT(navData) {
    const data = navData.reduce((lut, section) => {
      const { groups } = section;

      return groups.reduce(
        // eslint-disable-next-line
        (lut, grp) =>
          // eslint-disable-next-line
          grp.list.reduce((lut, item) => {
            lut.push(item);
            return lut;
          }, lut),
        lut
      );
    }, []);

    this.lut = makeSearcher(data);
  }

  search(keyword) {
    const matches = this.lut.search(keyword);

    this.setState({
      keyword,
      resultVisible: true,
      matches
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
