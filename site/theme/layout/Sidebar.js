import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="zent-doc-layout__sidebar">
        <a className="zent-doc-layout__sidebar-nav-level-one">快速上手</a>
        <a className="zent-doc-layout__sidebar-nav-level-one">更新日志</a>
        <a className="zent-doc-layout__sidebar-nav-level-one">Components 组件</a>
      </div>
    );
  }
}
