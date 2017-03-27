import React, { Component } from 'react';
import Menu, { MenuItem, SubMenu } from '../src';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

/*
## Write Something here

You can write guides for users here
*/
export default class MultiStage extends Component {
  onClick = (e, key) => {
    console.log(e, key); // eslint-disable-line
  }

  render() {
    return (
      <Menu
        onClick={this.onClick}
        className="hello"
      >
        <MenuItem key="1-1" className="food">食品分类</MenuItem>
        <MenuItem key="1-2" >服装分类</MenuItem>
        <SubMenu title="电器分类" overlayClassName="sub">
          <SubMenu title="电视机" overlayClassName="sub">
            <MenuItem key="2-1-1" >成洛马</MenuItem>
            <MenuItem key="2-1-2">沈霍伊</MenuItem>
          </SubMenu>
          <MenuItem key="2-2" >笔记本</MenuItem>
          <MenuItem key="2-3">洗衣机</MenuItem>
        </SubMenu>
        <SubMenu title="美妆分类" >
          <MenuItem key="3-1">眼影</MenuItem>
          <MenuItem key="3-2">洗面奶</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}
