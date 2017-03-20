import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="zent-doc-layout__header">
        <a href="http://www.youzan.com">Zan UI</a>
        <div className="zent-doc-layout__header-nav">
          <a className="zent-doc-layout__header-nav-home">首页</a>
          <a className="zent-doc-layout__header-nav-components">组件</a>
          <span className="zent-doc-layout__header-version">V1.0</span>
        </div>
      </div>
    );
  }
}
