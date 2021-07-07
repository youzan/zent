import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Decimal from 'big.js';

import NumberInput from '../src/number-input';
import { trimLeadingPlus } from '../src/number-input/utils';

Enzyme.configure({ adapter: new Adapter() });

describe('NumberInput', () => {
  it('will render div wrapper contains an Input component', () => {
    const wrapper = render(<NumberInput />);
    expect(wrapper.hasClass('zent-number-input')).toBe(true);
  });

  it('will throw error with showStepper and showCounter', () => {
    expect(() => {
      mount(<NumberInput showCounter showStepper />);
    }).toThrow();
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = mount(<NumberInput className="foo" />);
    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('change value is - or + ', () => {
    const wrapper = mount(<NumberInput value={0} />);
    wrapper.find('input').simulate('change', {
      target: {
        value: '+',
      },
    });
    wrapper.find('input').simulate('blur');
    expect(wrapper.state('input')).toBe('');
    expect(wrapper.state('value').cmp(new Decimal(0))).toBe(0);

    wrapper.find('input').simulate('change', {
      target: {
        value: '-',
      },
    });
    wrapper.find('input').simulate('blur');
    expect(wrapper.state('input')).toBe('');
    expect(wrapper.state('value').cmp(new Decimal(0))).toBe(0);
  });

  it('change value within min and max ', () => {
    let wrapper = mount(<NumberInput showStepper value={2} min={0} max={3} />);
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('input')).toBe('3');
    expect(wrapper.state('value').cmp(new Decimal(3))).toBe(0);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('input')).toBe('0');
    expect(wrapper.state('value').cmp(new Decimal(0))).toBe(0);
    wrapper = mount(<NumberInput showStepper value={0} min={1} max={3} />);
    expect(wrapper.state('input')).toBe('1');
    expect(wrapper.state('value').cmp(new Decimal(1))).toBe(0);
    wrapper = mount(<NumberInput showStepper value={6} min={0} max={3} />);
    expect(wrapper.state('input')).toBe('3');
    expect(wrapper.state('value').cmp(new Decimal(3))).toBe(0);

    wrapper = mount(
      <NumberInput showStepper step={2} value={6} min={0} max={3} decimal={2} />
    );
    expect(wrapper.state('input')).toBe('3.00');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value').cmp(new Decimal(1))).toBe(0);

    wrapper = mount(<NumberInput showStepper step={2} value={6} integer />);
    expect(wrapper.state('input')).toBe('6');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value') === 4).toBe(true);
  });

  it('NumberInput has its core function, change value with click on arrow', () => {
    let wrapper = mount(<NumberInput showStepper value={2} />);
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({
        value,
      });
    });
    const onBlurMock = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = mount(
      <NumberInput
        onChange={onChangeMock}
        onBlur={onBlurMock}
        onPressEnter={onPressEnter}
        showStepper
        value={2}
      />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('input')).toBe('3');
    expect(wrapper.state('value').cmp(new Decimal(3))).toBe(0);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('input')).toBe('2');
    expect(wrapper.state('value').cmp(new Decimal(2))).toBe(0);

    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(2);
    wrapper.find('input').simulate('blur');
    expect(onBlurMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    expect(onPressEnter.mock.calls.length).toBe(1);
    wrapper.setProps({ value: 4 });
    expect(wrapper.state('input')).toBe('4');
    expect(wrapper.state('value').cmp(new Decimal(4))).toBe(0);
    wrapper = mount(<NumberInput min={0} showStepper value={-1} />);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('input')).toBe('0');
    expect(wrapper.state('value').cmp(new Decimal(0))).toBe(0);
  });

  it('NumberInput onchange value', () => {
    const handleChange = value => {
      expect(value).toBe('1');
    };

    const wrapper = mount(<NumberInput onChange={handleChange} value={1} />);
    wrapper.find('input').simulate('change', {
      target: {
        value: '',
      },
    });
    expect(wrapper.state('input')).toBe('');
  });

  it('NumberInput integer mode', () => {
    let wrapper = mount(
      <NumberInput showStepper integer value={2} min={0} max={3} />
    );
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    wrapper.find('.zent-number-input-arrowup').simulate('click');
    expect(wrapper.state('value')).toBe(3);
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    wrapper.find('.zent-number-input-arrowdown').simulate('click');
    expect(wrapper.state('value')).toBe(0);
    wrapper = mount(
      <NumberInput showStepper integer value={0} min={1} max={3} />
    );
    expect(wrapper.state('value')).toBe(1);
    wrapper = mount(
      <NumberInput showStepper integer value={6} min={0} max={3} />
    );
    expect(wrapper.state('value')).toBe(3);
  });

  it('Null for empty input in integer mode', () => {
    let value = 0;
    const wrapper = mount(<NumberInput integer onChange={v => (value = v)} />);
    const input = wrapper.find('input');
    input.simulate('blur');
    expect(value).toBe(null);
    input.instance().value = '+1';
    input.simulate('change');
    input.simulate('blur');
    expect(value).toBe(1);
  });

  it('Utils', () => {
    expect(trimLeadingPlus('+1')).toBe('1');
  });
});
