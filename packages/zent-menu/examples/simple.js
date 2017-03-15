import React, { Component } from 'react';
import Menu, { MenuItem, SubMenu } from '../src';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

/*
## Write Something here

You can write guides for users here
*/

export default class Simple extends Component {
  onClick = (key, e) => {
    console.log(key, e);
  }

  render() {
    return (
      <Menu
        onClick={this.onClick}
        className="hello"
        wrapperClassName="world"
      >
        <MenuItem key="1-1" className="food">食品分类</MenuItem>
        <MenuItem key="1-2" disabled>服装分类</MenuItem>
        <SubMenu title="电器分类" wrapperClassName="sub">
          <MenuItem key="2-1" className="tv">电视机</MenuItem>
          <MenuItem key="2-2" disabled>笔记本</MenuItem>
          <MenuItem key="2-3">洗衣机</MenuItem>
        </SubMenu>
        <SubMenu title="美妆分类" disabled>
          <MenuItem key="3-1">眼影</MenuItem>
          <MenuItem key="3-2">洗面奶</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}
