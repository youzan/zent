import React, { Component } from 'react';
import Icon from '../src';

import '../assets/index.scss';
import '../assets/demo.scss';

export default class ReactExample extends Component {
  onClick() {
    alert('clicked on icon'); // eslint-disable-line
  }

  render() {
    return (
      <div className="demo-grid">
        <div className="demo-grid-row"><Icon type="shop" onClick={this.onClick} />快来有赞转转</div>
        <div className="demo-grid-row"><Icon type="casher" />快点交学费</div>
        <div className="demo-grid-row"><Icon type="" spin />加载中...</div>
      </div>
    );
  }
}
