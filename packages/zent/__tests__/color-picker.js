import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ColorPicker from 'colorpicker';
import * as alpha from 'colorpicker/helpers/alpha';
import * as hue from 'colorpicker/helpers/hue';
import * as saturation from 'colorpicker/helpers/saturation';
import flattenNames from 'colorpicker/helpers/reactcss/flattenNames.js';
import mergeClasses from 'colorpicker/helpers/reactcss/mergeClasses.js';
import helpColor from 'colorpicker/helpers/color';
import SketchFields from 'colorpicker/SketchFields';
import SketchPresetColors from 'colorpicker/SketchPresetColors';
import {
  Alpha,
  Checkboard,
  EditableInput,
  Hue,
  Saturation,
  Swatch
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
    expect(document.querySelectorAll('.zent-colorpicker-board').length).toBe(1);
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

    const color = {
      hsl: { a: 1, h: 0, l: 0.5, s: 1 },
      hex: '#ff0000',
      rgba: { r: 255, g: 0, b: 0, a: 1 },
      hsv: { h: 0, s: 1, v: 1, a: 1 }
    };
    const ColorPickerDom = wrapper.find('ColorPicker');
    expect(ColorPickerDom.node.handleChange(color)).toBe(undefined);
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

    const color = {
      hsl: { a: 1, h: 0, l: 0.5, s: 1 },
      hex: '#ff0000',
      rgba: { r: 255, g: 0, b: 0, a: 1 },
      hsv: { h: 0, s: 1, v: 1, a: 1 }
    };
    const ColorPickerDom = wrapper.find('ColorPicker');
    expect(ColorPickerDom.node.handleChange(color)).toBe(undefined);
  });

  it('colorPicker type simple', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <ColorPicker
        color="#5197FF"
        type="simple"
        presetColors={['#FFFFFF']}
        onChange={handleChange}
      />
    );
    const props = wrapper.props();
    const state = wrapper.state();
    expect(state.popVisible).toBe(false);
    expect(props.color).toBe('#5197FF');
  });

  it('SketchFields renders correctly', () => {
    const handleChange = jest.fn();
    const data = {
      hsl: { a: 1, h: 0, l: 0.5, s: 1 },
      hex: '#ff0000',
      r: 255,
      g: 0,
      b: 0,
      a: 1
    };
    const e = {
      target: {
        value: 0
      }
    };
    const wrapper = mount(<SketchFields {...red} onChange={handleChange} />);
    const editableInputs = wrapper.find('EditableInput');
    expect(editableInputs.length).toBe(5);
    expect(editableInputs.node.props.onChange(data, e)).toBe(undefined);
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

    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 2
    };
    const AlphaDom = wrapper.find('Alpha');
    expect(AlphaDom.node.componentWillUnmount()).toBe(undefined);
    expect(AlphaDom.node.handleMouseDown(e)).toBe(undefined);
    expect(AlphaDom.node.handleMouseUp()).toBe(undefined);
    expect(AlphaDom.node.unbindEventListeners()).toBe(undefined);
  });

  it('Alpha renders correctly branch check', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Alpha
        {...red}
        pointer={() => {
          return <div>Alpha</div>;
        }}
        onChange={handleChange}
      />
    );
    expect(wrapper.find('Checkboard').length).toBe(1);
  });

  it('Hue renders correctly', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Hue {...red} onChange={handleChange} />);
    expect(wrapper.find('.hue-area').length).toBe(1);
    const div = wrapper.find('.hue-bar');
    expect(div.length).toBe(1);

    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 2
    };
    const HueDom = wrapper.find('Hue');
    expect(HueDom.node.componentWillUnmount()).toBe(undefined);
    expect(HueDom.node.handleMouseDown(e)).toBe(undefined);
    expect(HueDom.node.handleMouseUp()).toBe(undefined);
    expect(HueDom.node.unbindEventListeners()).toBe(undefined);
  });

  it('Hue renders correctly branch check', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Hue
        {...red}
        pointer={() => {
          return <div>Alpha</div>;
        }}
        onChange={handleChange}
      />
    );
    expect(wrapper.find('.hue-area').length).toBe(1);
  });

  it('Saturation renders correctly', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Saturation {...red} onChange={handleChange} />);

    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 2
    };
    const SaturationDom = wrapper.find('Saturation');
    expect(SaturationDom.node.componentWillUnmount()).toBe(undefined);
    expect(SaturationDom.node.handleMouseDown(e)).toBe(undefined);
    expect(SaturationDom.node.handleMouseUp()).toBe(undefined);
    expect(SaturationDom.node.unbindEventListeners()).toBe(undefined);
  });

  it('Saturation renders correctly branch check', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Saturation
        {...red}
        pointer={() => {
          return <div>Alpha</div>;
        }}
        onChange={handleChange}
      />
    );
    expect(wrapper.find('Saturation').length).toBe(1);
  });

  it('Checkboard renders correctly', () => {
    const tree = renderer.create(<Checkboard />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('EditableInput mount', () => {
    const handleChange = jest.fn();
    const style = {
      wrap: 1
    };
    const wrapper = mount(
      <EditableInput
        style={style}
        label="Hex"
        placeholder="#fff"
        value={10}
        dragMax={10}
        dragLabel
        onChange={handleChange}
      />
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

    const e = {
      preventDefault: () => {},
      target: {
        value: 1
      },
      pageX: 1,
      pageY: 2,
      keyCode: 40,
      movementX: 0
    };
    const EditableInputDom = wrapper.find('EditableInput');
    expect(EditableInputDom.node.componentWillUnmount()).toBe(undefined);
    expect(EditableInputDom.node.handleMouseDown(e)).toBe(undefined);
    expect(EditableInputDom.node.handleMouseUp()).toBe(undefined);
    expect(EditableInputDom.node.handleDrag(e)).toBe(undefined);
    expect(EditableInputDom.node.handleKeyDown(e)).toBe(undefined);
    expect(EditableInputDom.node.unbindEventListeners()).toBe(undefined);
    expect(EditableInputDom.node.handleChange(e)).toBe(undefined);
  });

  it('EditableInput mount', () => {
    const handleChange = jest.fn();
    const style = {
      input: 1
    };
    const wrapper = mount(
      <EditableInput
        style={style}
        placeholder="#fff"
        value={10}
        dragMax={10}
        dragLabel
        onChange={handleChange}
      />
    );
    const e = {
      preventDefault: () => {},
      target: {
        value: 1
      },
      pageX: 1,
      pageY: 2,
      keyCode: 40,
      movementX: 0
    };
    const EditableInputDom = wrapper.find('EditableInput');
    expect(EditableInputDom.node.handleChange(e)).toBe(undefined);

    const nextProps = {
      value: 10
    };
    const style1 = {
      labal: 1
    };
    const wrapper1 = mount(
      <EditableInput
        style={style1}
        label={null}
        placeholder="#fff"
        value={10}
        dragMax={20}
        dragLabel
        onChange={handleChange}
      />
    );
    const EditableInputDom1 = wrapper1.find('EditableInput');
    expect(EditableInputDom1.node.handleKeyDown(e)).toBe(undefined);
    expect(EditableInputDom1.node.componentWillReceiveProps(nextProps)).toBe(
      undefined
    );

    const e1 = {
      preventDefault: () => {},
      target: {
        value: 1
      },
      pageX: 1,
      pageY: 2,
      keyCode: 38,
      movementX: 0
    };
    expect(EditableInputDom1.node.handleKeyDown(e1)).toBe(undefined);
  });

  it('check helpers alpha func', () => {
    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 2
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, true, props, container)).toMatchObject({
      a: 0
    });
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 0
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, true, props, container)).toMatchObject({
      source: 'rgb'
    });
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 1,
      pageY: 30
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, true, props, container)).toBe(null);
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, true, props, container)).toMatchObject({
      s: 20
    });
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 2,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, true, props, container)).toMatchObject({
      l: 30
    });
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 2,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, false, props, container)).toMatchObject({
      a: 0.1
    });
  });

  it('check helpers func alpha other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: '2',
      pageY: '23',
      touches: [
        {
          pageX: 2,
          pageY: 23
        }
      ]
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      },
      a: 1
    };
    const container = {
      clientWidth: 19,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(alpha.calculateChange(e, false, props, container)).toMatchObject({
      a: 0.05
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 30
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, true, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 30
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, true, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 1
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, true, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, true, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 20,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 19,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, true, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 20,
      pageY: 30
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 19,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, false, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: '2',
      pageY: '23',
      touches: [
        {
          pageX: 2,
          pageY: 23
        }
      ]
    };
    const props = {
      direction: 'vertical1',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 19,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, false, props, container)).toMatchObject({
      a: 1
    });
  });

  it('check helpers func hue null branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: '2',
      pageY: '23',
      touches: [
        {
          pageX: 2,
          pageY: 23
        }
      ]
    };
    const props = {
      direction: 'quux',
      hsl: {
        h: 18,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 20,
      clientHeight: 28,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(hue.calculateChange(e, false, props, container)).toBe(null);
  });

  it('check helpers func saturation other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 0,
      pageY: 20
    };
    const props = {
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(
      saturation.calculateChange(e, true, props, container)
    ).toMatchObject({ a: 1 });
  });

  it('check helpers func saturation other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 2,
      pageY: 1
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(
      saturation.calculateChange(e, true, props, container)
    ).toMatchObject({ a: 1 });
  });

  it('check helpers func saturation other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 2,
      pageY: 23
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(
      saturation.calculateChange(e, true, props, container)
    ).toMatchObject({ a: 1 });
  });

  it('check helpers func saturation other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: 2,
      pageY: 23
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(
      saturation.calculateChange(e, false, props, container)
    ).toMatchObject({ a: 1 });
  });

  it('check helpers func saturation other branch', () => {
    const e = {
      preventDefault: () => {},
      pageX: '2',
      pageY: '23',
      touches: [
        {
          pageX: 2,
          pageY: 23
        }
      ]
    };
    const props = {
      direction: 'vertical',
      hsl: {
        h: 1,
        s: 20,
        l: 30,
        a: 1
      }
    };
    const container = {
      clientWidth: 10,
      clientHeight: 20,
      getBoundingClientRect: () => {
        return {
          left: 1,
          top: 2
        };
      }
    };
    expect(
      saturation.calculateChange(e, false, props, container)
    ).toMatchObject({ a: 1 });
  });

  it('check helpers func flattenNames other branch', () => {
    const things = ['1', '2', [1]];
    expect(flattenNames(things)).toEqual(['1', '2']);
    expect(flattenNames()).toEqual([]);
  });

  it('check helpers func mergeClasses other branch', () => {
    const classes = {
      default: {
        name: 'name'
      },
      test1: {
        name: 'name'
      }
    };
    const activeNames = ['test1'];
    expect(mergeClasses(classes, activeNames)).toMatchObject({
      name: { '0': 'n', '1': 'a', '2': 'm', '3': 'e' }
    });
  });

  it('check helpColor func null', () => {
    const data = null;
    expect(() => helpColor.simpleCheckForValidColor(data)).toThrow(TypeError);
  });

  it('check helpColor func undefined', () => {
    const data = undefined;
    expect(() => helpColor.simpleCheckForValidColor(data)).toThrow(TypeError);
  });

  it('check helpColor func 255', () => {
    const data = 255;
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func fff', () => {
    const data = 'ffffff';
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func rgb', () => {
    const data = { r: 255, g: 255, b: 255 };
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(data);
  });

  it('check helpColor func isNaN', () => {
    const data = { r: 'aa', g: 0, b: 0 };
    expect(helpColor.simpleCheckForValidColor(data)).toEqual(false);
  });

  it('check helpColor func toState1', () => {
    const data = { r: 0, g: 0, b: 0 };
    expect(helpColor.toState(data)).toBeTruthy();
  });

  it('check helpColor func toState1', () => {
    const data = { hex: '#ff0000' };
    expect(helpColor.toState(data)).toBeTruthy();
  });

  it('check helpColor func toState2', () => {
    expect(helpColor.toState('blue')).toMatchObject({
      hex: '#0000ff'
    });
  });

  it('check helpColor func toState3', () => {
    expect(helpColor.isValidHex('ffffff')).toBe(true);
  });

  it('Swatch handles click', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Swatch color="#fffffff" onClick={handleChange} />);
    wrapper.simulate('click');
    expect(handleChange.mock.calls.length).toBe(1);
  });
});
