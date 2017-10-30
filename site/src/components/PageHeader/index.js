import React, { Component } from 'react';

import './style.pcss';

export default class PageHeader extends Component {
  state = {
    scrollTop: 0
  };

  componentDidMount() {
    let timer;
    window.addEventListener('scroll', () => {
      clearTimeout(timer);
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      timer = setTimeout(() => {
        this.setState({ scrollTop });
      }, 500);
    });
  }

  render() {
    return (
      <div className="page-header">
        <div className="page-header__top">
          <h1 className="page-header__logo">
            <a href="//www.youzanyun.com/zanui" />
          </h1>
          <ul className="page-header__navs">
            <li className="page-header__item">
              <a href="https://github.com/youzan/zent">
                <img
                  className="page-header__github"
                  src="https://img.yzcdn.cn/zanui/react/GitHub-Mark-120px-plus.png"
                  alt="github"
                  width="32"
                  height="32"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
