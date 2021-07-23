import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Simulate } from 'react-dom/test-utils';

import { CombinedTimeRangePicker, TimePicker } from '../../src/date-picker';

Enzyme.configure({ adapter: new Adapter() });

describe('TimePicker', () => {
  it('TimePicker canClear', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<TimePicker value="00:30:00" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');

    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')).toBe('');
  });

  it('CombinedTimeRangePicker value and canClear', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <CombinedTimeRangePicker
        value={['00:03:00', '01:04:00']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-time-panel-body-unit')[1]
    );
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe('01:03:00');

    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');
    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')[0]).toBe('');
    expect(wrapper.prop('value')[1]).toBe('');
  });

  it('CombinedTimeRangePicker disabledTime', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    const disabledTime = jest.fn().mockImplementation((_, type) => {
      return type === 'start'
        ? {
            disabledHours: () => [0],
          }
        : {};
    });

    wrapper = mount(
      <CombinedTimeRangePicker
        value={['02:04:00', '02:04:30']}
        disabledTime={disabledTime}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-time-panel-body-unit')[0]
    );
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(wrapper.prop('value')[0]).toBe('02:04:00');

    wrapper.find('.zent-datepicker-trigger').simulate('click');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-time-panel-body-unit')[90]
    );
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(wrapper.prop('value')[0]).toBe('02:04:06');
    wrapper.unmount();
  });

  it('CombinedTimeRangePicker defaultTime', () => {
    const wrapper = mount(
      <CombinedTimeRangePicker
        value={[]}
        defaultTime={['02:04:00', '02:04:30']}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    wrapper.unmount();
  });
});
