import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Menu from '../src/menu';

Enzyme.configure({ adapter: new Adapter() });

const { MenuItem, SubMenu } = Menu;

describe('Menu component', () => {
  it('can have className and style', () => {
    const wrapper = mount(
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

  it('can have onClick handler', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Menu onClick={onClick}>
        <MenuItem key="1-1">食品分类</MenuItem>
      </Menu>
    );
    wrapper.find('MenuItem').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can have submenu', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Menu onClick={onClick}>
        <MenuItem key="1-1">食品分类</MenuItem>
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
    const wrapper = mount(
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

    wrapper.find('MenuItem').at(0).simulate('click');
    expect(onClick.mock.calls.length).toBe(0);
  });

  it('can be inline mode', () => {
    const wrapper = mount(
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
    const wrapper = mount(
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
    const wrapper = mount(
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

  it('can get subMenu id when subMenu is clicked', () => {
    const subMenuClick = jest.fn();
    const wrapper = mount(
      <Menu mode="inline" onSubMenuClick={subMenuClick}>
        <MenuItem key="1-1">食品分类</MenuItem>
        <SubMenu key="333" title="美妆分类" className="abc">
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
      </Menu>
    );
    wrapper.find('.abc > div').at(0).simulate('click');

    expect(subMenuClick.mock.calls[0][0]).toBe('333');
  });

  it('can emit the expanded ids when toggle expand', () => {
    const onExpandCallback = jest.fn();
    const wrapper = mount(
      <Menu
        mode="inline"
        onExpandChange={onExpandCallback}
        defaultExpandKeys={['333', '444']}
      >
        <MenuItem key="1-1">食品分类</MenuItem>
        <SubMenu key="333" title="美妆分类" className="submenu">
          <MenuItem key="3-1">眼影</MenuItem>
        </SubMenu>
        <SubMenu key="444" title="水果分类" className="submenu">
          <MenuItem key="3-1">西红柿</MenuItem>
        </SubMenu>
      </Menu>
    );
    wrapper.find('.submenu > div').at(0).simulate('click');
    expect(onExpandCallback.mock.calls[0][0]).toEqual(['444']);

    wrapper.find('.submenu > div').at(0).simulate('click');
    expect(onExpandCallback.mock.calls[1][0]).toEqual(['333', '444']);
  });
});
