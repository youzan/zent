import React, { Component } from 'react';
import Menu, { MenuItem, SubMenu } from '../src';
import '../assets/index.scss';
import 'zent-icon/lib/index.css';

/*
## Write Something here

You can write guides for users here
*/
export default class Simple extends Component {
  onClick = (e, key) => {
    console.log(e, key); // eslint-disable-line
  }

  render() {
    return (
      <Menu
        onClick={this.onClick}
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
        <SubMenu title="日化" overlayClassName="sub-chemical">
          <MenuItem className="cleanser">洗面奶</MenuItem>
          <MenuItem disabled>沐浴露</MenuItem>
          <MenuItem>防晒霜</MenuItem>
        </SubMenu>
        <SubMenu title="零食" overlayClassName="sub-snacks" fade={false}>
          <MenuItem className="beef-cubes">猪肉粒</MenuItem>
          <MenuItem disabled>辣条</MenuItem>
          <MenuItem>开心果</MenuItem>
        </SubMenu>
        <SubMenu title="美妆" disabled>
          <MenuItem>眼影</MenuItem>
          <MenuItem>洗面奶</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}
