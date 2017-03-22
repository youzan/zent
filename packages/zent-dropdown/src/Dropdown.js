import Popover from 'zent-popover';
import Menu from 'zent-menu';
import 'zent-menu/lib/index.css';
import React, { PropTypes, Component } from 'react';

const { Trigger, Content } = Popover;
const { MenuItem, SubMenu } = Menu;

export default class Dropdown extends Component {
  render() {
    return (
      <Popover position={Popover.Position.BottomLeft} display="block">
        <Trigger.Click>
          <a>Hover me</a>
        </Trigger.Click>
        <Content>
          <Menu
            onClick={(e, key) => { console.log(key) }}
            className="hello"
          >
            <MenuItem key="1-1" className="food">食品分类</MenuItem>
            <MenuItem key="1-2" disabled>服装分类</MenuItem>
            <SubMenu title="电器分类" overlayClassName="sub">
              <SubMenu key="2-1-0" className="tv" title="电视机">
                <MenuItem key="2-1-1" disabled>三星</MenuItem>
                <MenuItem key="2-1-2">夏普</MenuItem>
              </SubMenu>
              <MenuItem key="2-2" disabled>笔记本</MenuItem>
              <MenuItem key="2-3">洗衣机</MenuItem>
            </SubMenu>
            <SubMenu title="美妆分类" disabled>
              <MenuItem key="3-1">眼影</MenuItem>
              <MenuItem key="3-2">洗面奶</MenuItem>
            </SubMenu>
          </Menu>
        </Content>
      </Popover>
    );
  }
};
