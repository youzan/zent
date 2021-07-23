import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Input from '../src/input';

Enzyme.configure({ adapter: new Adapter() });

describe('Input', () => {
  beforeAll(() => {
    window.getSelection = function () {
      return 'autoSelect';
    };
  });

  it('will render div wrapper contains an input without any props', () => {
    const wrapper = mount(<Input />);
    expect(wrapper.childAt(0).type()).toBe('div');
    expect(wrapper.childAt(0).hasClass('zent-input-wrapper')).toBe(true);
    expect(wrapper.find('div input').length).toBe(1);
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('can have custom wrapper classNames', () => {
    const wrapper = mount(<Input className="foo" addonAfter="bar" />);
    expect(wrapper.childAt(0).hasClass('foo')).toBe(true);
    expect(wrapper.childAt(0).hasClass('zent-input-addons')).toBe(true);
    expect(wrapper.find('input').hasClass('foo')).toBe(false);
  });

  it('can supports showClear props', () => {
    class InputTest extends Component {
      state = {
        value: '',
      };

      handleChange = e => {
        this.setState({ value: e.target.value });
        e.preventDefault();
        e.stopPropagation();
      };

      render() {
        const { value } = this.state;
        return <Input value={value} onChange={this.handleChange} showClear />;
      }
    }
    const wrapper = mount(<InputTest />);
    expect(wrapper.find('ZentIcon').length).toBe(0);
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('ZentIcon').length).toBe(1);
    expect(wrapper.find('Input').props().value).toBe('test');
    wrapper
      .find('ZentIcon')
      .simulate('mouseDown', { preventDefault: jest.fn() });
    wrapper.find('ZentIcon').simulate('click');
    expect(wrapper.find('Input').props().value).toBe('');
    expect(wrapper.find('ZentIcon').length).toBe(0);
  });

  it('pass any props to real input element except "className"', () => {
    let wrapper = mount(
      <Input
        defaultValue="not placeholder"
        min={8}
        max={11}
        readOnly
        type="number"
        className="foo"
      />
    );
    expect(wrapper.find('input').props().className).toBe('zent-input');
    expect(wrapper.find('input').props().type).toBe('number');
    expect(wrapper.find('input').props().readOnly).toBe(true);
    expect(wrapper.find('input').props().max).toBe(11);
    expect(wrapper.find('input').props().min).toBe(8);
    expect(wrapper.find('input').props().defaultValue).toBe('not placeholder');
    wrapper = mount(<Input placeholder="default" type="password" disabled />);
    expect(wrapper.find('input').props().type).toBe('password');
    expect(wrapper.find('input').props().placeholder).toBe('default');
    expect(wrapper.find('input').props().disabled).toBe(true);
  });

  it('can insert div aside controlled by prop addon(Before|After)(node)', () => {
    const wrapper = mount(<Input addonAfter="foo" addonBefore="bar" />);
    expect(
      wrapper.find('.zent-input-wrapper').childAt(0).childAt(0).type()
    ).toBe('div');
    expect(
      wrapper.find('.zent-input-wrapper').childAt(0).childAt(0).text()
    ).toBe('bar');
    expect(
      wrapper.find('.zent-input-wrapper').childAt(0).childAt(1).type()
    ).toBe('input');
    expect(
      wrapper.find('.zent-input-wrapper').childAt(0).childAt(2).type()
    ).toBe('div');
    expect(
      wrapper.find('.zent-input-wrapper').childAt(0).childAt(2).text()
    ).toBe('foo');
  });

  it('can handle onChange event', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(<Input onChange={onChangeMock} />);
    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('change');
    wrapper.find('input').simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(3);
  });

  it('can distinguish enter and other keys through keyDown event', () => {
    const onPressEnterMock = jest.fn();
    const onKeyUpMock = jest.fn();
    const onKeyDownMock = jest.fn();
    const wrapper = mount(
      <Input
        onKeyUp={onKeyUpMock}
        onKeyDown={onKeyDownMock}
        onPressEnter={onPressEnterMock}
      />
    );
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    expect(onPressEnterMock.mock.calls.length).toBe(1);
    expect(onKeyDownMock.mock.calls.length).toBe(1);
    expect(onKeyUpMock.mock.calls.length).toBe(0);
    wrapper.find('input').simulate('keyDown', { key: 'Clear' });
    wrapper.find('input').simulate('keyDown', { key: 'Clear' });
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    wrapper.find('input').simulate('keyUp', { key: 'Enter' });
    wrapper.find('input').simulate('keyUp', { key: 'Clear' });
    expect(onPressEnterMock.mock.calls.length).toBe(2);
    expect(onKeyDownMock.mock.calls.length).toBe(4);
    expect(onKeyUpMock.mock.calls.length).toBe(2);
  });

  // hack branch
  it('can load with only the enterPress function', () => {
    const onPressEnterMock = jest.fn();
    const wrapper = mount(<Input onPressEnter={onPressEnterMock} />);
    expect(typeof wrapper.find('input').props().onKeyDown).toBe('function');
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    expect(onPressEnterMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('keyDown', { key: 'Clear' });
    wrapper.find('input').simulate('keyDown', { key: 'Clear' });
    wrapper.find('input').simulate('keyDown', { key: 'Enter' });
    wrapper.find('input').simulate('keyUp', { key: 'Enter' });
    wrapper.find('input').simulate('keyUp', { key: 'Clear' });
    expect(onPressEnterMock.mock.calls.length).toBe(2);
  });

  it('can supports textarea', () => {
    const wrapper = mount(<Input type="textarea" />);
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('can supports textarea with showCount', () => {
    const wrapper = mount(<Input type="textarea" showCount />);
    expect(wrapper.find('.zent-textarea-count').length).toBe(1);
  });

  it('can supports textarea with onChange and autoSize', () => {
    class TextArea extends Component {
      state = {
        value: '',
      };

      handleChange = e => {
        this.setState({ value: e.target.value });
      };

      render() {
        const { value } = this.state;
        return (
          <div>
            <Input
              type="textarea"
              value={value}
              onChange={this.handleChange}
              maxLength={100}
              showCount
              autoSize
            />
          </div>
        );
      }
    }
    const wrapper = mount(<TextArea />);

    wrapper
      .find('textarea')
      .simulate('change', { target: { value: '12345678' } });

    expect(wrapper.find('textarea').instance().value).toBe('12345678');
    wrapper.unmount();
  });

  it('can have input auto focus', () => {
    // https://github.com/jsdom/jsdom/issues/2924#issuecomment-828084958
    const wrapper = mount(<Input autoFocus />, {
      attachTo: document.body,
    });
    expect(wrapper.find('input').getDOMNode() === document.activeElement).toBe(
      true
    );
    wrapper.unmount();
  });

  it('can call input focus method', () => {
    // https://github.com/jsdom/jsdom/issues/2924#issuecomment-828084958
    const wrapper = mount(<Input />, {
      attachTo: document.body,
    });
    wrapper.instance().focus();
    expect(wrapper.find('input').getDOMNode() === document.activeElement).toBe(
      true
    );
    wrapper.unmount();
  });

  it('can call textarea focus method', () => {
    // https://github.com/jsdom/jsdom/issues/2924#issuecomment-828084958
    const wrapper = mount(<Input type="textarea" />, {
      attachTo: document.body,
    });
    wrapper.instance().focus();
    expect(
      wrapper.find('textarea').getDOMNode() === document.activeElement
    ).toBe(true);
    wrapper.unmount();
  });

  it('can have input auto select', () => {
    const wrapper = mount(<Input defaultValue="autoSelect" autoSelect />);
    expect(
      wrapper.find('input').props().defaultValue ===
        window.getSelection().toString()
    ).toBe(true);
  });

  it('can have input auto select and inintSelectionRange', () => {
    const wrapper = mount(
      <Input
        defaultValue="autoSelect"
        autoSelect
        initSelectionStart={0}
        initSelectionEnd={10}
      />
    );
    expect(
      wrapper.find('input').props().defaultValue ===
        window.getSelection().toString()
    ).toBe(true);
  });

  it('can call input select method', () => {
    const wrapper = mount(<Input defaultValue="autoSelect" />);
    wrapper.instance().select();
    expect(
      wrapper.find('input').props().defaultValue ===
        window.getSelection().toString()
    ).toBe(true);
  });

  it('can call textarea select method', () => {
    const wrapper = mount(<Input type="textarea" defaultValue="autoSelect" />);
    wrapper.instance().select();
    expect(
      wrapper.find('textarea').props().defaultValue ===
        window.getSelection().toString()
    ).toBe(true);
  });
});
