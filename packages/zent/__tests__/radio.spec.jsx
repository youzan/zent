import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Radio from '../src/radio';

Enzyme.configure({ adapter: new Adapter() });

const Group = Radio.Group;
const RadioButton = Radio.Button;

/**
 * Radio Section, 相对简单，而且很多prop会被复写，行为要和Group组合使用才能测试
 */

describe('Radio Section', () => {
  /**
   * label
   *   span
   *     span
   *     input
   *   children
   */
  it('Radio will render default structure without any props', () => {
    const wrapper = mount(<Radio />);
    expect(wrapper.childAt(0).type()).toBe('label');
    expect(wrapper.childAt(0).hasClass('zent-radio-wrap')).toBe(true);
    expect(wrapper.childAt(0).childAt(0).type()).toBe('span');
    expect(wrapper.childAt(0).childAt(0).hasClass('zent-radio')).toBe(true);
    expect(wrapper.childAt(0).children().length).toBe(1);
    expect(wrapper.find('.zent-radio').childAt(0).type()).toBe('span');
    expect(
      wrapper.find('.zent-radio').childAt(0).hasClass('zent-radio-inner')
    ).toBe(true);
    expect(wrapper.find('.zent-radio').childAt(1).type()).toBe('input');
    expect(wrapper.find('.zent-radio').childAt(1).props().type).toBe('radio');
  });

  it('Radio can have custom className and children', () => {
    const wrapper = mount(
      <Radio className="foo">
        <span className="zent-radio-children" />
      </Radio>
    );
    expect(wrapper.childAt(0).hasClass('zent-radio-wrap')).toBe(true);
    expect(wrapper.childAt(0).hasClass('foo')).toBe(true);
    expect(wrapper.childAt(0).childAt(0).hasClass('zent-radio')).toBe(true);
    expect(wrapper.find('.zent-radio-inner').length).toBe(1);
    expect(wrapper.find('.zent-radio-children').length).toBe(1);
  });

  it('Radio can have value prop of any type in javascript', () => {
    const types = [0, 'foo', true, { bar: 'foo' }, undefined, null, [1, 2]];
    // NOTE: NaN is ignored for NaN === NaN return false
    let length = types.length;
    while (length) {
      const wrapper = mount(<Radio value={types[--length]} />);
      expect(wrapper.props().value).toBe(types[length]);
    }
  });

  it('Radio can have independent disable and readOnly state', () => {
    const wrapperD = mount(<Radio disabled />);
    const wrapperR = mount(<Radio readOnly />);
    expect(wrapperD.childAt(0).hasClass('zent-radio-disabled')).toBe(true);
    expect(wrapperR.childAt(0).hasClass('zent-radio-disabled')).toBe(true);
    expect(wrapperD.find('input').props().disabled).toBe(true);
    expect(wrapperR.find('input').props().readOnly).toBe(true);
  });

  it('Radio have independent checked prop (can be number or boolean)', () => {
    let wrapper = mount(<Radio checked={0} />);
    expect(wrapper.find('input').props().checked).toBe(false);
    wrapper = mount(<Radio checked={1} />);
    expect(wrapper.find('input').props().checked).toBe(true);
    expect(wrapper.childAt(0).hasClass('zent-radio-checked')).toBe(true);
    wrapper = mount(<Radio />);
    expect(wrapper.find('input').props().checked).toBe(false);
    wrapper = mount(<Radio checked />);
    expect(wrapper.find('input').props().checked).toBe(true);
    expect(wrapper.childAt(0).hasClass('zent-radio-checked')).toBe(true);
  });

  it('Radio can have custom style which loaded on wrapper', () => {
    const styleObj = { color: 'red' };
    const wrapper = mount(<Radio style={styleObj} />);
    expect(wrapper.find('.zent-radio-wrap').props().style).toEqual(styleObj);
  });

  it('Radio can pass custom prop to the input element', () => {
    const wrapper = mount(<Radio foo="bar" bar="foo" />);
    expect(wrapper.find('input').props().foo).toBe('bar');
    expect(wrapper.find('input').props().bar).toBe('foo');
  });

  it('Radio have an change event liftup', () => {
    const propOnChangeMock = jest.fn();
    const wrapper = mount(<Radio onChange={propOnChangeMock} />);
    expect(wrapper.find('input').props().onChange).not.toBe(propOnChangeMock);
    expect(propOnChangeMock.mock.calls.length).toBe(0);
    wrapper
      .find('input')
      .simulate('change', { target: wrapper.find('input').instance() });
    expect(propOnChangeMock.mock.calls.length).toBe(1);
  });
});

/**
 * RadioGroup Section,
 * Hint: RadioGroup will rewrite some porps of children Radio Components.
 * [onChange, disabled, checked, readOnly]
 */

describe('RadioGroup Section', () => {
  it('RadioGroup will render an empty div without any children', () => {
    const wrapper = mount(<Group />);
    expect(
      wrapper.containsMatchingElement(<div className="zent-radio-group" />)
    ).toBe(true);
  });

  it('RadioGroup can have custom className, style object', () => {
    const styleObj = {
      color: 'red',
    };
    const wrapper = mount(<Group className="foo" style={styleObj} />);
    expect(wrapper.find('.zent-radio-group').length).toBe(1);
    const group = wrapper.find('.zent-radio-group');
    expect(group.hasClass('foo')).toBe(true);
    expect(group.props().style).toBe(styleObj);
  });

  it('Group have custom child', () => {
    const wrapper = mount(
      <Group>
        <div className="deffect" />
        <span />
        hack branch
      </Group>
    );
    expect(wrapper.find('.deffect').props().checked).toBe(undefined);
    expect(wrapper.find('span').props().checked).toBe(undefined);
  });

  it('Group can have value prop of any type in javascript', () => {
    const types = [0, 'foo', true, { bar: 'foo' }, undefined, null, [1, 2]];
    // NOTE: NaN is ignored for NaN === NaN return false
    let length = types.length;
    while (length) {
      const wrapper = mount(<Group value={types[--length]} />);
      expect(wrapper.props().value).toBe(types[length]);
    }
  });

  it('Group can have custom isValueEqual prop', () => {
    const radioValues = ['bar', 123, {}];
    const customISValueEqual = (a, b) => {
      return typeof a === typeof b;
    };
    const wrapper = mount(
      <Group value="foo" isValueEqual={customISValueEqual}>
        <Radio value={radioValues[0]} />
        <Radio value={radioValues[1]} />
        <Radio value={radioValues[2]} />
      </Group>
    );

    expect(
      wrapper.find(Radio).at(0).children().hasClass('zent-radio-checked')
    ).toBe(true);
    wrapper.setProps({ value: null });
    expect(
      wrapper.find(Radio).at(2).children().hasClass('zent-radio-checked')
    ).toBe(true);
    wrapper.setProps({ value: 321 });
    expect(
      wrapper.find(Radio).at(1).children().hasClass('zent-radio-checked')
    ).toBe(true);
  });

  it('Group will liftup the change event of input and props in Radio', () => {
    const groupValue = 'bar';
    const radioValues = ['bar', 'foo', 'foobar', 'barfoo'];
    const groupChangeMock = jest.fn();
    const wrapper = mount(
      <Group onChange={groupChangeMock} value={groupValue}>
        <Radio value={radioValues[0]} />
        <Radio value={radioValues[1]} />
        <Radio value={radioValues[2]} />
        <Radio value={radioValues[3]} />
      </Group>
    );
    groupChangeMock.mockImplementation(evt => {
      expect(typeof evt.stopPropagation).toBe('function');
      expect(typeof evt.preventDefault).toBe('function');
      evt.stopPropagation();
      evt.preventDefault();

      // NOTE: Use gloablValue and wrapper.update() to simulate the state change of ancestor component of Group
      wrapper.setProps({ value: evt.target.value });
    });
    expect(
      wrapper.find(Radio).at(0).children().hasClass('zent-radio-checked')
    ).toBe(true);

    // Radio features
    wrapper.find('input').at(3).simulate('change');
    expect(groupChangeMock.mock.calls.length).toBe(1);
    expect(
      wrapper.find(Radio).at(3).children().hasClass('zent-radio-checked')
    ).toBe(true);
    expect(
      wrapper.find(Radio).at(0).children().hasClass('zent-radio-checked')
    ).toBe(false);

    wrapper.find('input').at(1).simulate('change');
    expect(
      wrapper.find(Radio).at(1).children().hasClass('zent-radio-checked')
    ).toBe(true);
    expect(
      wrapper.find(Radio).at(3).children().hasClass('zent-radio-checked')
    ).toBe(false);
  });

  it('Have button style', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Group onChange={onChange} value="apple">
        <RadioButton value="apple" disabled>
          apple
        </RadioButton>
        <RadioButton value="pear" disabled>
          pear
        </RadioButton>
        <RadioButton value="banana">banana</RadioButton>
        <RadioButton value="tomato">tomato</RadioButton>
      </Group>
    );

    expect(wrapper.find(RadioButton).length).toBe(4);
  });

  it('Radio.Button cannot be used outside a Radio.Group', () => {
    expect(() => {
      mount(<RadioButton>1</RadioButton>);
    }).toThrow();
  });
});
