import React from 'react';
import { shallow, mount } from 'enzyme';
import Radio from 'radio';

const Group = Radio.Group;

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
    const wrapper = shallow(<Radio />);
    expect(wrapper.type()).toBe('label');
    expect(wrapper.hasClass('zent-radio-wrap')).toBe(true);
    expect(wrapper.childAt(0).type()).toBe('span');
    expect(wrapper.childAt(0).hasClass('zent-radio')).toBe(true);
    expect(wrapper.childAt(1).type()).toBe(null);
    expect(
      wrapper
        .find('.zent-radio')
        .childAt(0)
        .type()
    ).toBe('span');
    expect(
      wrapper
        .find('.zent-radio')
        .childAt(0)
        .hasClass('zent-radio-inner')
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-radio')
        .childAt(1)
        .type()
    ).toBe('input');
    expect(
      wrapper
        .find('.zent-radio')
        .childAt(1)
        .props().type
    ).toBe('radio');
  });

  it('Radio can have custom className, prefix and children', () => {
    const wrapper = shallow(
      <Radio className="foo" prefix="bar">
        <span className="zent-radio-children" />
      </Radio>
    );
    expect(wrapper.hasClass('bar-radio-wrap')).toBe(true);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.childAt(0).hasClass('bar-radio')).toBe(true);
    expect(wrapper.find('.bar-radio-inner').length).toBe(1);
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
    const wrapperD = shallow(<Radio disabled />);
    const wrapperR = shallow(<Radio readOnly />);
    expect(wrapperD.hasClass('zent-radio-disabled')).toBe(true);
    expect(wrapperR.hasClass('zent-radio-disabled')).toBe(true);
    expect(wrapperD.find('input').props().disabled).toBe(true);
    expect(wrapperR.find('input').props().readOnly).toBe(true);
  });

  it('Radio have independent checked prop (can be number or boolean)', () => {
    let wrapper = shallow(<Radio checked={0} />);
    expect(wrapper.find('input').props().checked).toBe(false);
    wrapper = shallow(<Radio checked={1} />);
    expect(wrapper.find('input').props().checked).toBe(true);
    expect(wrapper.hasClass('zent-radio-checked')).toBe(true);
    wrapper = shallow(<Radio />);
    expect(wrapper.find('input').props().checked).toBe(false);
    wrapper = shallow(<Radio checked />);
    expect(wrapper.find('input').props().checked).toBe(true);
    expect(wrapper.hasClass('zent-radio-checked')).toBe(true);
  });

  it('Radio can have custom style which loaded on wrapper', () => {
    const styleObj = { color: 'red' };
    const wrapper = shallow(<Radio style={styleObj} />);
    expect(wrapper.find('.zent-radio-wrap').props().style).toEqual(styleObj);
  });

  it('Radio can pass custom prop to the input element', () => {
    const wrapper = shallow(<Radio foo="bar" bar="foo" />);
    expect(wrapper.find('input').props().foo).toBe('bar');
    expect(wrapper.find('input').props().bar).toBe('foo');
  });

  it('Radio have an change event liftup', () => {
    const propOnChangeMock = jest.fn();
    const wrapper = mount(<Radio onChange={propOnChangeMock} />);
    const handleChange = wrapper.find(Radio).node.handleChange;
    expect(wrapper.find('input').props().onChange).not.toBe(propOnChangeMock);
    expect(wrapper.find('input').props().onChange).toBe(handleChange);
    expect(propOnChangeMock.mock.calls.length).toBe(0);
    wrapper
      .find('input')
      .simulate('change', { target: wrapper.find('input').node });
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
    const wrapper = shallow(<Group />);
    expect(
      wrapper.contains(<div className="zent-radio-group" style={{}} />)
    ).toBe(true);
  });

  it('RadioGroup can have custom prefix, className, style object', () => {
    const styleObj = {
      color: 'red'
    };
    const wrapper = shallow(
      <Group className="foo" prefix="bar" style={styleObj} />
    );
    expect(wrapper.hasClass('bar-radio-group')).toBe(true);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.props().style).toBe(styleObj);
  });

  // NOTE: Group will load some useless props to its custom children
  it('Group have conflict when have custom child', () => {
    const wrapper = mount(
      <Group>
        <div className="deffect" />
        <span />
        hack branch
      </Group>
    );
    expect(wrapper.find('.deffect').props().checked).toBe(true);
    expect(wrapper.find('span').props().checked).toBe(true);
  });

  it('RadioGroup will rewrite some props of Radio(onChange: always, checked: always, disabled: conditional, readOnly: conditional), and clone others', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <Group disabled={false} readOnly={false}>
        <Radio
          onChange={onChangeMock}
          checked={1}
          className="foo"
          prefix="bar"
        />
      </Group>
    );
    expect(wrapper.find(Radio).props().onChange).not.toBe(onChangeMock);
    expect(wrapper.find(Radio).props().checked).not.toBe(1);
    expect(wrapper.find(Radio).props().className).toBe('foo');
    expect(wrapper.find(Radio).props().prefix).toBe('bar');

    // NOTE: Group组件没有定义staticProps[(disabled|readOnly)]和defaultProps[(disabled|readOnly)]
    // NOTE: 判断逻辑 radio.props.disabled !== void 0 ? radio.props.disabled : this.props.disabled 存在一个逻辑问题，当上层组件disabled={true}时，内部 Radio 可能disabled＝{false}
    // NOTE: 写成Group.props.disabled默认 false，this.props.disabled ? this.props.disabled : radio.props.disabled 是不是更好些？

    const conditionalOne = mount(
      <Group disabled readOnly={false}>
        <Radio disabled={false} readOnly />
      </Group>
    );
    const conditionalTwo = mount(
      <Group disabled readOnly>
        <Radio />
      </Group>
    );
    expect(conditionalOne.find(Radio).props().disabled).toBe(false);
    expect(conditionalOne.find(Radio).props().readOnly).toBe(true);
    expect(conditionalTwo.find(Radio).props().disabled).toBe(true);
    expect(conditionalTwo.find(Radio).props().readOnly).toBe(true);
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
      <Group value={'foo'} isValueEqual={customISValueEqual}>
        <Radio value={radioValues[0]} />
        <Radio value={radioValues[1]} />
        <Radio value={radioValues[2]} />
      </Group>
    );

    expect(
      wrapper
        .find(Radio)
        .at(0)
        .props().checked
    ).toBe(true);
    wrapper.setProps({ value: null });
    expect(
      wrapper
        .find(Radio)
        .at(2)
        .props().checked
    ).toBe(true);
    wrapper.setProps({ value: 321 });
    expect(
      wrapper
        .find(Radio)
        .at(1)
        .props().checked
    ).toBe(true);
  });

  it('Group will liftup the change event of input and props in Radio', () => {
    let groupValue = 'bar';
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
      wrapper
        .find(Radio)
        .at(0)
        .props().checked
    ).toBe(true);

    // Radio features
    wrapper
      .find('input')
      .at(3)
      .simulate('change');
    expect(groupChangeMock.mock.calls.length).toBe(1);
    expect(
      wrapper
        .find(Radio)
        .at(3)
        .props().checked
    ).toBe(true);
    expect(
      wrapper
        .find(Radio)
        .at(0)
        .props().checked
    ).toBe(false);

    wrapper
      .find('input')
      .at(1)
      .simulate('change');
    expect(
      wrapper
        .find(Radio)
        .at(1)
        .props().checked
    ).toBe(true);
    expect(
      wrapper
        .find(Radio)
        .at(3)
        .props().checked
    ).toBe(false);
  });
});
