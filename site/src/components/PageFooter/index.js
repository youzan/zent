import React, { Component } from 'react';

import './style.pcss';

const curYear = new Date().getFullYear();

export default class PageFooter extends Component {
  render() {
    return (
      <div className="page-footer">
        <ul className="page-footer__navs">
          <li className="page-footer__item">
            <a
              href="https://www.youzan.com/"
              className="page-footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              有赞官网
            </a>
          </li>
          <li className="page-footer__item">
            <a
              href="//www.youzanyun.com"
              className="page-footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              有赞云
            </a>
          </li>
          <li className="page-footer__item">
            <a
              href="https://job.youzan.com/"
              className="page-footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              加入我们
            </a>
          </li>
        </ul>
        <p className="page-footer__copyright">
          2012-
          {curYear} © youzanyun.com - 浙公网安备 33010602004354号
          增值电信业务经营许可证：浙B2-20140331 - 浙ICP备13037466号
        </p>
      </div>
    );
  }
}
