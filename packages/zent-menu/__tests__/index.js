import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import Menu, { MenuItem, SubMenu } from '../src';

describe('Menu component', () => {
  it('menu className', () => {
    let wrapper = mount(
      <Menu className="hello">
        <MenuItem key="1-1" className="food">食品分类</MenuItem>
      </Menu>
    );

    expect(wrapper.find('.hello').length).toBe(1);
    expect(wrapper.find('.food').length).toBe(1);
  });
});

