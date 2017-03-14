import React, { Component } from 'react';
import Menu, { MenuItem, SubMenu } from '../src';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

/*
## Write Something here

You can write guides for users here
*/

export default class Simple extends Component {
  render() {
    return (
      <Menu onClick={(index, e) => { console.log(index, e) }}>
        <MenuItem key="1-1">食品分类</MenuItem>
        <MenuItem key="1-2">服装分类</MenuItem>
        <MenuItem key="1-3">还有什么</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem key="4-1">41</MenuItem>
          <MenuItem key="4-2">42</MenuItem>
          <MenuItem key="4-3">43</MenuItem>
        </SubMenu>
        <SubMenu title="子菜单">
          <MenuItem key="2-1">21</MenuItem>
          <MenuItem key="2-2">22</MenuItem>
          <MenuItem key="2-3">23</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}
