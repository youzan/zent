import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Simulate } from 'react-dom/test-utils';

import {
  DatePicker,
  WeekPicker,
  MonthPicker,
  QuarterPicker,
  YearPicker,
  TimePicker,
  CombinedTimeRangePicker,
  TimeRangePicker,
} from '../../src/date-picker';
import { Disabled } from '../../src/disabled';

Enzyme.configure({ adapter: new Adapter() });

describe('All of the Picker', () => {
  it('DatePicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<DatePicker value="2020-05-11" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('2020-04-26');
  });

  it('WeekPicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(
      <WeekPicker
        value={['2020-05-11', '2020-05-17']}
        defaultDate={['2020-05-11', '2020-05-17']}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[1]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe('2020-04-27');
    expect(wrapper.prop('value')[1]).toBe('2020-05-03');

    mount(
      <WeekPicker
        value="2020-05-11"
        defaultDate="2020-05-11"
        onChange={onChangeMock}
      />
    );
  });

  it('MonthPicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<MonthPicker value="2020-08" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('2020-01');
  });

  it('QuarterPicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(
      <QuarterPicker value={['2020-04']} onChange={onChangeMock} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe('2020-01');
    expect(wrapper.prop('value')[1]).toBe('2020-03');

    wrapper.unmount();
  });

  it('YearPicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<YearPicker value="2024" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('2020');
  });

  it('TimePicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<TimePicker value="00:00:00" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');

    // unit
    Simulate.click(
      pop
        .querySelectorAll('.zent-datepicker-time-panel-body_scroll')[0]
        .querySelectorAll('.zent-datepicker-time-panel-body-unit')[1]
    );

    // confirm
    Simulate.click(pop.querySelector('.zent-datepicker-panel-footer-btn'));
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')).toBe('01:00:00');
    wrapper.unmount();
  });

  it('CombinedTimeRangePicker value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(
      <CombinedTimeRangePicker value={[]} onChange={onChangeMock} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    expect(wrapper.find('.zent-datepicker-trigger-focus').length).toBe(1);
    const pop = document.querySelector('.zent-popover-v2');

    Simulate.click(
      pop
        .querySelectorAll('.zent-datepicker-time-panel-body_scroll')[0]
        .querySelectorAll('.zent-datepicker-time-panel-body-unit')[2]
    );
    Simulate.click(
      pop
        .querySelectorAll('.zent-datepicker-time-panel-body_scroll')[3]
        .querySelectorAll('.zent-datepicker-time-panel-body-unit')[3]
    );
    Simulate.click(pop.querySelector('.zent-datepicker-panel-footer-btn'));
    expect(onChangeMock.mock.calls.length).toBe(1);

    expect(wrapper.prop('value')[0]).toBe('02:00:00');
    expect(wrapper.prop('value')[1]).toBe('03:00:00');
  });

  it('TimeRangePicker  value and onChange', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <TimeRangePicker
        value={['00:30:00', '00:50:00']}
        onChange={onChangeMock}
      />
    );

    wrapper.find('.zent-datepicker-trigger').at(0).simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');

    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(wrapper.prop('value')[0]).toBe('00:30:00');

    wrapper.find('.zent-datepicker-trigger').at(1).simulate('click');
    const pop2 = document.querySelector('.zent-datepicker-panel-footer');

    Simulate.click(
      pop2.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(2);
    expect(wrapper.prop('value')[1]).toBe('00:50:00');
    wrapper.unmount();
  });
  it('DatePicker used in Disabled', () => {
    const wrapper = mount(
      <Disabled>
        <DatePicker />
      </Disabled>
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    expect(pop).toBe(null);
  });
});
