import React from 'react';
import { shallow } from 'enzyme';
import Cascader from 'cascader';

describe('Cascader', () => {
  it('className default to zent-swiper ', () => {
    const wrapper = shallow(<Cascader />);
    expect(wrapper.hasClass('zent-swiper')).toBe(true);
  });
});
