import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Select } from 'zent';
import { withRouter } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router';

import pkg from '../../../../packages/zent/package.json';
import SearchBox from '../search-box';
import './style.scss';
import { INav, Locale } from '../../types';

interface IVersionInfo {
  key: string;
  text: string;
}

const CONTROLS = {
  'zh-CN': 'EN',
  'en-US': '中文',
};

const VERSIONS: IVersionInfo[] = [
  {
    key: 'latest',
    text: pkg.version,
  },
  {
    key: 'v8',
    text: '8.x',
  },
  {
    key: 'v7',
    text: '7.x',
  },
  {
    key: 'v6',
    text: '6.x',
  },
];

export interface IPageHeaderProps extends RouteComponentProps {
  i18n: Locale;
  sideNavData: INav[];
}

class PageHeader extends Component<IPageHeaderProps> {
  state = {
    version: VERSIONS[0],
  };

  toggle = () => {
    const { history, location } = this.props;
    const path = location.pathname.split('/');
    if (path[1] === 'en') {
      path[1] = 'zh';
    } else {
      path[1] = 'en';
    }
    history.replace(path.join('/'));
  };

  changeVersion = (value: IVersionInfo | null) => {
    this.setState(
      {
        version: value,
      },
      () => {
        if (!value) {
          return;
        }

        const version = value.key;
        if (version === 'latest') {
          return;
        }

        const url = new URL(window.location.href);
        const host =
          url.hostname === '127.0.0.1' || url.hostname === 'localhost'
            ? 'https://youzan.github.io'
            : '';

        window.location.href = `${host}/zent-${version}`;
      }
    );
  };

  render() {
    const { i18n, sideNavData } = this.props;
    const { version } = this.state;

    return (
      <div className="page-header">
        <div className="page-header__top">
          <a
            href="https://design.youzan.com/"
            className="page-header__logo"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png"
              alt="logo"
            />
            <span>Zan UI</span>
          </a>
          <div className="page-header__search-sep" />
          <SearchBox locale={i18n} navData={sideNavData} />
          <div className="page-header__i18n-switcher" onClick={this.toggle}>
            {CONTROLS[i18n] || ''}
          </div>
          <Select
            className="page-header__version-select"
            options={VERSIONS}
            value={version}
            onChange={this.changeVersion}
            inline
            width={120}
          />
          <ul className="page-header__navs">
            <li className="page-header__item">
              <a href="https://github.com/youzan/zent">
                <img
                  className="page-header__github"
                  src="https://img.yzcdn.cn/zanui/react/GitHub-Mark-120px-plus.png"
                  alt="github"
                  width="28"
                  height="28"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(PageHeader);
