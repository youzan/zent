import React, { Component } from 'react';

import SearchBox from '../search-box';
import RouterContext from '../router-context-type';
import './style.scss';

const CONTROLLS = {
  'zh-CN': 'EN',
  'en-US': '中文',
};

export default class PageHeader extends Component {
  static contextTypes = RouterContext;

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

  render() {
    const { i18n, sideNavData } = this.props;

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
          <div
            className="page-header__i18n-switcher"
            type="primary"
            onClick={this.toggle}
          >
            {CONTROLLS[i18n] || ''}
          </div>
        </div>
      </div>
    );
  }
}
