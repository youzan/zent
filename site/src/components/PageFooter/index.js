import React, { Component } from 'react';
import './style.pcss';

export default class PageFooter extends Component {
  curYear = (new Date()).getFullYear();

  render() {
    return (
      <div className="page-footer">
        <ul className="page-footer__navs">
          <li className="page-footer__item">
            <a href="https://www.youzan.com/" className="page-footer__link" target="_blank">有赞官网</a>
          </li>
          <li className="page-footer__item">
            <a href="//www.youzanyun.com" className="page-footer__link" target="_blank">有赞云</a>
          </li>
          <li className="page-footer__item">
            <a href="https://job.youzan.com/" className="page-footer__link" target="_blank">加入我们</a>
          </li>
        </ul>
        <p className="page-footer__copyright">
          2012-{this.curYear} © youzanyun.com -  浙公网安备 33010602004354号 增值电信业务经营许可证：浙B2-20140331 - 浙ICP备13037466号
        </p>
      </div>
    )
  }
}
