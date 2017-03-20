import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export default class Layout extends Component {
  render() {
    return (
      <div className="zent-doc-layout">
        <Header />
        <Sidebar />
        <Content />
      </div>
    );
  }
}
