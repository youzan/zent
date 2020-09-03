import React from 'react';
import { mount } from 'enzyme';

import Drawer from 'drawer';

describe('<Drawer >', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Drawer visible />);
    expect(wrapper.find('Drawer').length).toBe(1);
  });
});
