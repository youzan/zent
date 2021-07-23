import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Simulate } from 'react-dom/test-utils';

import { DateRangePicker } from '../../src/date-picker';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('RangePicker', () => {
  it('DateRangePicker showTime', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        showTime={{ format: 'HH:mm', defaultTime: ['00:00', '23:59'] }}
        format={DateTimeFormat}
        onChange={onChangeMock}
        width={260}
        value={['2020-08-01 12:00']}
      />
    );
    wrapper.find('.zent-datepicker-trigger').first().simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel');
    expect(pop.querySelectorAll('.zent-datepicker').length).toBe(1);
    // unit
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    // confirm
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(wrapper.prop('value')[0]).toBe('2020-07-26 00:00');
    wrapper.unmount();
  });

  it('DateRangePicker valueType equals to `date`', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DateRangePicker
        value={[new Date()]}
        valueType="date"
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').first().simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop.querySelector('a'));
    expect(typeof wrapper.prop('value')[0]).toBe('object');
    wrapper.unmount();
  });

  it('DateRangePicker onOpen / onClose callback', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount(
      <DateRangePicker value={[]} onOpen={onOpen} onClose={onClose} />
    );

    wrapper.find('.zent-datepicker-trigger').at(0).simulate('click');
    expect(onOpen.mock.calls.length).toBe(1);
    const pop1 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop1.querySelector('a'));

    wrapper.find('.zent-datepicker-trigger').at(1).simulate('click');
    const pop2 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop2.querySelector('a'));
    jest.runAllTimers();
    expect(onOpen.mock.calls[0][0]).toBe('start');
    expect(onOpen.mock.calls[1][0]).toBe('end');
    expect(onClose.mock.calls[0][0]).toBe('start');
    expect(onClose.mock.calls[1][0]).toBe('end');
    wrapper.unmount();
  });

  it('DateRangePicker disabledDate', () => {
    const disabledDate = jest
      .fn()
      .mockImplementation((val, type) =>
        type === 'start' ? val.getDate() === 15 : val.getDate() === 12
      );
    const wrapper = mount(
      <DateRangePicker
        value={['2020-05-15', '2020-05-20']}
        disabledDate={disabledDate}
      />
    );
    wrapper.find('.zent-datepicker-trigger').at(0).simulate('click');

    wrapper.setProps({ value: ['2020-05-15', '2020-05-12'] });
    wrapper.find('.zent-datepicker-trigger').at(1).simulate('click');
    wrapper.update();
    wrapper.unmount();
  });

  it('DateRangePicker defaultDate', () => {
    const wrapper = mount(
      <DateRangePicker defaultDate={['2020-05-01', '2020-06-01']} />
    );
    wrapper.find('.zent-datepicker-trigger').at(0).simulate('click');
    wrapper.unmount();
  });

  it('DateRangePicker disabled', () => {
    const wrapper = mount(<DateRangePicker disabled={[true, false]} />);
    wrapper.find('.zent-datepicker-trigger').at(1).simulate('click');
    wrapper.unmount();
  });

  it('DateRangePicker canClear', () => {
    const wrapper = mount(<DateRangePicker canClear={[true, false]} />);
    wrapper.unmount();
  });
});
