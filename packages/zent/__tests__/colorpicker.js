import React from 'react';
import { mount } from 'enzyme';
import ColorPicker from 'colorpicker';

describe('ColorPicker', () => {
  it('can have custom className', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker color="#5197FF" onChange={handleChange} />
    );
    expect(wrapper.find('.zent-alert.foobar').length).toBe(1);
  });
});
