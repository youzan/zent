import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from 'menu';

Enzyme.configure({ adapter: new Adapter() });

const { MenuItem, SubMenu } = Menu;

describe('Menu component', () => {
  it('can have className and style', () => {
    let wrapper = mount(
      <Menu className="hello" style={{ maxHeight: 10, overflow: 'auto' }}>
        {null}
        <MenuItem key="1-1" className="food">
          食品分类
        </MenuItem>
      </Menu>
    );

    expect(wrapper.find('Menu').length).toBe(1);
    expect(wrapper.find('MenuItem').length).toBe(1);
    expect(wrapper.getDOMNode().style.cssText).toMatch(
      /max-height:\s*10px;\s*overflow:\s*auto/
    );
  });

  it('can have prefix', () => {
    let wrapper = mount(
      <Menu prefix="hello">
        <MenuItem key="1-1" prefix="food">
          食品分类
        </MenuItem>
      </Menu>
    );

    expect(wrapper.find('.hello-menu').length).toBe(1);
    expect(wrapper.find('.food-menu-item').length).toBe(1);
  });

  it('can have onClick handler', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu prefix="hello" onClick={onClick}>
        <MenuItem key="1-1" prefix="food">
          食品分类
        </MenuItem>
      </Menu>
    );
    wrapper.find('MenuItem').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can have submenu', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu prefix="hello" onClick={onClick}>
        <MenuItem key="1-1" prefix="food">
          食品分类
        </MenuItem>
        <SubMenu title="美妆分类" className="submenu">
          {null}
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    wrapper.find('SubMenu').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.zent-submenu-content').length).toBe(1);

    wrapper.find('SubMenu MenuItem').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);

    wrapper.find('SubMenu .zent-submenu-title').simulate('click');
    expect(wrapper.find('.zent-submenu-content').length).toBe(0);

    wrapper.find('SubMenu').simulate('mouseleave');
    jest.runAllTimers();
    expect(wrapper.find('.zent-submenu-content').length).toBe(0);

    // simulate fast mouse in/out
    wrapper.find('SubMenu').simulate('mouseenter');
    wrapper.find('SubMenu').simulate('mouseleave');
    jest.runAllTimers();
    expect(wrapper.find('.zent-submenu-content').length).toBe(0);
  });

  it('can have disabled menu items', () => {
    const onClick = jest.fn();
    let wrapper = mount(
      <Menu onClick={onClick}>
        <MenuItem key="1-1" disabled>
          食品分类
        </MenuItem>
        <SubMenu title="美妆分类" disabled>
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.find('.zent-menu-item-disabled').length).toBe(2);

    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');
    expect(onClick.mock.calls.length).toBe(0);
  });

  it('can be inline mode', () => {
    let wrapper = mount(
      <Menu mode="inline">
        <MenuItem key="1-1">食品分类</MenuItem>
        <SubMenu title="美妆分类">
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.find('.zent-menu__inline').length).toBe(1);
  });

  it('can have default keys for inline menu', () => {
    let wrapper = mount(
      <Menu
        defaultSelectedKey="1-1"
        defaultExpandKeys={['3']}
        inlineIndent={10}
        mode="inline"
      >
        <MenuItem key="1-1">食品分类</MenuItem>
        <SubMenu key="3" title="美妆分类">
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.find('.zent-menu__inline-item-selected').length).toBe(1);
    expect(wrapper.find('.zent-menu__inner').length).toBe(1);
  });

  it('can select menuItem and expand subMenu', () => {
    let wrapper = mount(
      <Menu mode="inline">
        <MenuItem key="1-1">食品分类</MenuItem>
        <SubMenu key="3" title="美妆分类">
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );

    wrapper.find('.zent-menu__inline-submenu-title').simulate('click');
    expect(wrapper.find('.zent-menu__inner').length).toBe(1);

    wrapper.find('.zent-menu__inline-submenu-title').simulate('click');
    wrapper.find('SubMenu MenuItem').simulate('click');
    expect(wrapper.find('.zent-menu__inline-item-selected').length).toBe(1);
  });
});
