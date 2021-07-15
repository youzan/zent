import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Popover, Input, IInputChangeEvent } from 'zent';
import memoize from 'memoize-one';
import { withRouter } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router';

import ResultList from './ResultList';
import makeSearcher, { ISearcher } from './search';
import { SKIP_SCROLL } from './constants';
import { INav, INavItem, Locale } from '../../types';

import './style.scss';

const i18n = {
  'zh-CN': {
    placeholder: '搜索组件...',
  },

  'en-US': {
    placeholder: 'Search components...',
  },
};

export interface ISearchBoxProps extends RouteComponentProps {
  locale: Locale;
  navData: INav[];
}

interface ISearchBoxState {
  keyword: string;
  activeIndex: number;
  matches: INavItem[];
  resultVisible: boolean;
}

class SearchBox extends Component<ISearchBoxProps, ISearchBoxState> {
  state: ISearchBoxState = {
    keyword: '',
    activeIndex: SKIP_SCROLL,
    matches: [],
    resultVisible: false,
  };

  render() {
    const { keyword, matches, activeIndex, resultVisible } = this.state;
    const { locale } = this.props;

    return (
      <div className="zandoc-react-search-box-popover-wrapper">
        <Popover
          position={Popover.Position.BottomLeft}
          visible={resultVisible}
          cushion={5}
          onVisibleChange={this.onResultVisibleChange}
        >
          <Popover.Trigger.Click>
            <Input
              className="zandoc-react-search-box-input"
              icon="search"
              placeholder={i18n[locale].placeholder}
              value={keyword}
              onChange={this.onKeywordChange}
              onClick={this.onInputClick}
              onKeyDown={this.onKeydown}
            />
          </Popover.Trigger.Click>

          <Popover.Content>
            <ResultList
              matches={matches}
              activeIndex={activeIndex}
              locale={locale}
              redirectToResult={this.redirectToResult}
              clearActiveIndex={this.clearActiveIndex}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  }

  onKeywordChange = (evt: IInputChangeEvent) => {
    const keyword = evt.target.value;
    if (keyword !== this.state.keyword) {
      this.search(keyword);
    }
  };

  onKeydown = (evt: React.KeyboardEvent) => {
    const { key } = evt;

    if (key === 'Enter') {
      return setTimeout(() => {
        const { matches } = this.state;
        if (matches && matches.length > 0) {
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
        resultVisible: true,
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
      resultVisible: true,
    });
  };

  onResultVisibleChange = (visible: boolean) => {
    this.setState({
      resultVisible: visible,
    });
  };

  onInputClick = () => {
    this.search(this.state.keyword);
  };

  clearActiveIndex = () => {
    this.setState({
      activeIndex: SKIP_SCROLL,
    });
  };

  buildLUT: (navData: INav[]) => ISearcher<INavItem> = memoize(
    (navData: INav[]) => {
      // Only include components
      const { groups } = navData[1];
      const data = groups.reduce<INavItem[]>(
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
        }

        if (a.title === b.title) {
          return 0;
        }

        return -1;
      });

      return makeSearcher(data);
    }
  );

  search(keyword: string) {
    const lut = this.buildLUT(this.props.navData);

    if (!lut) {
      return;
    }

    const matches = lut.search(keyword);

    this.setState({
      keyword,
      resultVisible: true,
      matches,
      activeIndex: 0,
    });
  }

  redirectToResult = (item: INavItem) => {
    const { path } = item;
    const { history, locale } = this.props;
    const prefix = locale.split('-')[0];

    history.replace(`/${prefix}/${path}`);
    this.onResultVisibleChange(false);
  };
}

export default withRouter(SearchBox);
