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
              <a href="//www.youzanyun.com/zanui" className="page-header__link">
                首页
              </a>
            </li>
            <li className="page-header__item">
              <a
                href="//www.youzanyun.com/zanui/react"
                className="page-header__link page-header__link--active"
              >
                Zent - PC端
              </a>
            </li>
            <li className="page-header__item">
              <a
                href="//www.youzanyun.com/zanui/vue"
                className="page-header__link"
              >
                Vant - 移动端
              </a>
            </li>
            <li className="page-header__item">
              <a
                href="https://github.com/youzan/zanui-weapp"
                className="page-header__link"
              >
                ZanUi-WeApp - 微信小程序
              </a>
            </li>
          </ul>
        </div>
        <ul
          className={`page-header__subnavs ${this.state.scrollTop > 0
            ? 'page-header__subnavs--shadow'
            : ''}`}
        >
          <li className="page-header__item">
            <a
              href="//www.youzanyun.com/zanui/react"
              className="page-header__link page-header__link--active"
            >
              基础组件
            </a>
          </li>
          <li className="page-header__item">
            <a
              className="page-header__link"
              href="https://github.com/youzan/zent"
            >{`V${this.props.version}`}</a>
          </li>
          <li className="page-header__item">
            <a
              href="https://github.com/youzan/zent"
              className="page-header__github"
              target="_blank"
              rel="noopener noreferrer"
            />
          </li>
        </ul>
      </div>
    );
  }
}
