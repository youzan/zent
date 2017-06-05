import React from 'react';
import { mount } from 'enzyme';
import ColorPicker from 'colorpicker';

describe('ColorPicker', () => {
  it('change color', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker color="#5197FF" onChange={handleChange} />
    );
    expect(wrapper.find('.zent-color-picker').length).toBe(1);
  });
});
