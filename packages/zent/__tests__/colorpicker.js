import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ColorPicker from 'colorpicker';
import * as alpha from 'colorpicker/helpers/alpha';
import * as hue from 'colorpicker/helpers/hue';
import * as saturation from 'colorpicker/helpers/saturation';
import helpColor from 'colorpicker/helpers/color';
import SketchFields from 'colorpicker/SketchFields';
import SketchPresetColors from 'colorpicker/SketchPresetColors';
import {
  Alpha,
  Checkboard,
  EditableInput,
  Hue,
  Saturation
} from 'colorpicker/common';

const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 }
};

describe('ColorPicker', () => {
  it('class check', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker color="#5197FF" onChange={handleChange} />
    );
    wrapper.find('.zent-color-picker').simulate('click');
    expect(wrapper.find('.zent-color-picker').length).toBe(1);
    expect(wrapper.find('.zent-color-picker__text').length).toBe(1);
    expect(wrapper.find('.zent-color-picker__preview').length).toBe(1);

    expect(document.querySelectorAll('.zent-color-picker-popover').length).toBe(
      1
    );
    expect(document.querySelectorAll('.zent-colorpicker').length).toBe(1);
    expect(document.querySelectorAll('.zent-colorpicker-input').length).toBe(1);
    expect(document.querySelectorAll('.zent-colorpicker-colors').length).toBe(
      1
    );
  });

  it('colorPicker props check', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker color="#5197FF" onChange={handleChange} />
    );
    const props = wrapper.props();
    const state = wrapper.state();
    expect(state.popVisible).toBe(false);
    expect(props.color).toBe('#5197FF');
    expect(props.showAlpha).toBe(false);
  });

  it('colorPicker showAlpha true', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker color="#5197FF" showAlpha onChange={handleChange} />
    );
    const props = wrapper.props();
    const state = wrapper.state();
    expect(state.popVisible).toBe(false);
    expect(props.color).toBe('#5197FF');
    expect(props.showAlpha).toBe(true);
  });

  it('SketchFields renders correctly', () => {
    const tree = renderer.create(<SketchFields {...red} />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('SketchPresetColors renders correctly', () => {
    const tree = renderer
      .create(<SketchPresetColors colors={['#fff', '#999', '#000']} />)
      .toJSON();
    expect(tree).toBeTruthy();
  });

  it('Alpha renders correctly', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Alpha {...red} onChange={handleChange} />);
    expect(wrapper.find('Checkboard').length).toBe(1);
    const div = wrapper.find('.alpha-bar');
    expect(div.length).toBe(1);
  });

  it('Checkboard renders correctly', () => {
    const tree = renderer.create(<Checkboard />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('EditableInput mount', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <EditableInput label="Hex" placeholder="#fff" onChange={handleChange} />
    );
    const input = wrapper.find('input');
    const span = wrapper.find('span');
    expect(input.length).toBe(1);
    expect(span.length).toBe(1);
    expect(span.at(0).text()).toBe('Hex');
    input.simulate('focus');
    input.simulate('change');
    input.simulate('blur');
    expect(handleChange.mock.calls.length).toBe(1);

    input.simulate('keyDown', { keyCode: 38 });
    input.simulate('keyDown', { keyCode: 40 });
  });

  it('Hue renders correctly', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Hue {...red} onChange={handleChange} />);
    expect(wrapper.find('.hue-area').length).toBe(1);
    const div = wrapper.find('.hue-bar');
    expect(div.length).toBe(1);
  });

  it('Saturation renders correctly', () => {
    const tree = renderer.create(<Saturation {...red} />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('check helpers func', () => {
    const data = undefined;
    expect(() => alpha.calculateChange(data)).toThrow(TypeError);
    expect(() => hue.calculateChange(data)).toThrow(TypeError);
    expect(() => saturation.calculateChange(data)).toThrow(TypeError);
  });

  it('check helpColor func', () => {
    const data = null;
    expect(() => helpColor.simpleCheckForValidColor(data)).toThrow(TypeError);
  });

  it('check helpColor func', () => {
    const data = undefined;
    expect(() => helpColor.simpleCheckForValidColor(data)).toThrow(TypeError);
  });

  it('check helpColor func', () => {
    const data = 255;
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func', () => {
    const data = 'ffffff';
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func', () => {
    const data = { r: 255, g: 255, b: 255 };
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func', () => {
    const data = { r: 0, g: 0, b: 0 };
    expect(helpColor.toState(data)).toBeTruthy();
  });

  it('check helpColor func', () => {
    expect(helpColor.toState('blue')).toMatchObject({
      hex: '#0000ff'
    });
  });

  it('check helpColor func', () => {
    expect(helpColor.isValidHex('ffffff')).toBe(true);
  });
});
