import React from 'react';
import { shallow } from 'enzyme';
import Cascader from 'cascader';

describe('Cascader', () => {
  it('className default to zent-cascader ', () => {
    const wrapper = shallow(<Cascader />);
    expect(wrapper.hasClass('zent-cascader')).toBe(true);
  });
});
