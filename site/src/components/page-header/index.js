import { Component } from 'react';
import { Select } from 'zent';

import pkg from '../../../../packages/zent/package.json';
import SearchBox from '../search-box';
import RouterContext from '../router-context-type';
import './style.scss';

const CONTROLS = {
  'zh-CN': 'EN',
  'en-US': '中文',
};

const VERSIONS = [
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

export default class PageHeader extends Component {
  static contextTypes = RouterContext;

  state = {
    version: VERSIONS[0],
  };

  toggle = () => {
    const { replace } = this.context.router.history;
    const path = this.context.router.route.location.pathname.split('/');
    if (path[1] === 'en') {
      path[1] = 'zh';
    } else {
      path[1] = 'en';
    }
    replace(path.join('/'));
  };

  changeVersion = value => {
    this.setState(
      {
        version: value,
      },
      () => {
        const version = value.key;
        if (version === 'latest') {
          return;
        }

        window.location.href = `https://youzan.github.io/zent-${version}`;
      }
    );
  };

  render() {
    const { i18n, sideNavData } = this.props;
    const { version } = this.state;

    return (
      <div className="page-header">
        <div className="page-header__top">
          <a href="//www.youzanyun.com/zanui" className="page-header__logo">
            <img
              src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png"
              alt="logo"
            />
            <span>Zan UI</span>
          </a>
          <div className="page-header__search-sep" />
          <SearchBox locale={i18n} navData={sideNavData} />
          <div
            className="page-header__i18n-switcher"
            type="primary"
            onClick={this.toggle}
          >
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
