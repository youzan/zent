import React, { Component } from 'react';
import Dropdown from '../src';
import Menu from 'zent-menu';
import 'zent-menu/lib/index.css';
import 'zent-icon/lib/index.css';
import '../assets/index.scss';


const { MenuItem, SubMenu } = Menu;

export default class Simple extends Component {
  render() {
    return (
      <Dropdown mode="click">
        <Dropdown.Trigger>
          <a>Hover Me</a>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Menu
            className="whole-menu"
          >
            <MenuItem className="food">食品</MenuItem>
            <MenuItem disabled>服装</MenuItem>
            <SubMenu title="电器" overlayClassName="sub-electronic">
              <SubMenu title="电视机" overlayClassName="sub-tv">
                <MenuItem key="unique-key" className="sony">索尼</MenuItem>
                <MenuItem disabled>熊猫</MenuItem>
                <MenuItem>长虹</MenuItem>
              </SubMenu>
              <MenuItem disabled>传呼机</MenuItem>
              <MenuItem>洗衣机</MenuItem>
            </SubMenu>
          </Menu>
        </Dropdown.Content>
      </Dropdown>
    );
  }
}
