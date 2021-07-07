import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Simulate } from 'react-dom/test-utils';

import {
  DatePicker,
  WeekPicker,
  MonthPicker,
  QuarterPicker,
  YearPicker,
} from '../../src/date-picker';

Enzyme.configure({ adapter: new Adapter() });
const DateTimeFormat = 'YYYY-MM-DD HH:mm';

describe('SinglePicker', () => {
  it('DatePicker valueType', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });

    wrapper = mount(<DatePicker valueType="date" onChange={onChangeMock} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const footer = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(footer.querySelector('a'));
    expect(typeof wrapper.prop('value')).toBe('object');

    wrapper.setProps({ valueType: 'number' });
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const footer2 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(footer2.querySelector('a'));
    expect(typeof wrapper.prop('value')).toBe('number');
    wrapper.unmount();
  });

  it('DatePicker showTime', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(
      <DatePicker
        value="2020-08-01 12:00"
        showTime={{ format: 'HH:mm' }}
        format={DateTimeFormat}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    // unit
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    // confirm
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-footer-btn')[0]
    );
    expect(wrapper.prop('value')).toBe('2020-07-26 00:00');
    wrapper.unmount();

    const onChangeMock2 = jest.fn();
    const wrapper2 = mount(
      <DatePicker
        value="2020-08-01 12:00"
        showTime={{ format: 'HH:mm' }}
        format={DateTimeFormat}
        onChange={onChangeMock2}
      />
    );
    wrapper2.find('.zent-datepicker-trigger').simulate('click');
    const pop2 = document.querySelector('.zent-datepicker-panel-footer');
    Simulate.click(pop2.querySelector('a'));
    expect(onChangeMock2.mock.calls.length).toBe(1);
    wrapper2.unmount();
  });

  it('DatePicker disabledDate', () => {
    const disabledDate = jest
      .fn()
      .mockImplementation(date => date.getDate() === 26);
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <DatePicker
        value="2020-08-01"
        disabledDate={disabledDate}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    // unit
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('DatePicker disabledDate with `min`, `max`', () => {
    const disabledDate = {
      min: '2020-08-01',
      max: '2020-08-03',
    };
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <DatePicker
        value={undefined}
        disabledDate={disabledDate}
        onChange={onChangeMock}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    // unit
    Simulate.click(
      pop.querySelectorAll('.zent-datepicker-panel-body-cells_item')[0]
    );
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('DatePicker disabledTime', () => {
    const disabledTime = jest.fn();
    const wrapper = mount(<DatePicker showTime disabledTime={disabledTime} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    expect(disabledTime.mock.calls.length).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it('DatePicker disabled cell', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    const disabledDate = () => true;

    wrapper = mount(
      <DatePicker
        value="2020-05-01"
        onChange={onChangeMock}
        disabledDate={disabledDate}
      />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    const pop = document.querySelector('.zent-datepicker-panel');
    const cells = pop.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );

    const cellInner = pop.querySelectorAll('.zent-datepicker-cell-inner');
    Simulate.mouseEnter(cellInner[0]);
    Simulate.mouseLeave(cellInner[0]);

    Simulate.click(cells[0]);
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('DatePicker canClear', () => {
    // eslint-disable-next-line prefer-const
    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(value => {
      wrapper.setProps({ value });
    });
    wrapper = mount(<DatePicker value="2020-05-11" onChange={onChangeMock} />);

    wrapper.find('.zent-datepicker-can-clear').simulate('mouseenter');
    wrapper.find('.zenticon-close-circle').simulate('click');
    expect(wrapper.prop('value')).toBe(null);
  });

  it('DatePicker name', () => {
    const wrapper = mount(<DatePicker name="date" />);

    expect(
      wrapper
        .find('.zent-datepicker-trigger')
        .containsMatchingElement(<input name="date" />)
    ).toBe(true);
  });

  it('DatePicker showTime Object', () => {
    const wrapper = mount(
      <DatePicker showTime={{}} value="2020-05-20 12:10:10" />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const cells = pop.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(cells[6]);

    const timeTrigger = pop
      .querySelectorAll('.zent-datepicker-panel-footer')[0]
      .querySelectorAll('.zent-datepicker-trigger')[0];
    Simulate.click(timeTrigger);
    const timePicker = document.querySelectorAll('.zent-datepicker-panel')[1];
    const timePanel = timePicker.querySelectorAll(
      '.zent-datepicker-time-panel-body'
    )[0];
    const timeUnits = timePanel.querySelectorAll(
      '.zent-datepicker-time-panel-body-unit'
    );
    Simulate.click(timeUnits[6]);
    const timeBtn = timePicker.querySelector(
      '.zent-datepicker-panel-footer-btn'
    );
    Simulate.click(timeBtn);

    const confirmBtn = pop.querySelectorAll(
      '.zent-datepicker-panel-footer-btn'
    )[0];
    Simulate.click(confirmBtn);
    wrapper.unmount();
  });

  it('DatePicker title', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DatePicker value="2020-05-20" onChange={onChange} />
    );
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year/month
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    const monthTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[1];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    Simulate.click(monthTitle);
    const monthPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const monthUnits = monthPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(monthUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    Simulate.click(prevBtns[1]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    Simulate.click(nextBtns[1]);

    const cells = document
      .querySelector('.zent-datepicker-panel')
      .querySelectorAll('.zent-datepicker-panel-body-cells_item');
    Simulate.click(cells[1]);
    expect(onChange.mock.calls.length).toBe(1);

    wrapper.unmount();
  });

  it('MonthPicker title', () => {
    const wrapper = mount(<MonthPicker value="2020-05" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });

  it('QuarterPicker title', () => {
    const wrapper = mount(<QuarterPicker value="2020-05" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');
    // change year
    const yearTitle = header.querySelectorAll(
      '.zent-datepicker-panel-header-title_clickable'
    )[0];
    Simulate.click(yearTitle);
    const yearPanel = document.querySelector('.zent-datepicker-ym-panel-body');
    const yearUnits = yearPanel.querySelectorAll(
      '.zent-datepicker-panel-body-cells_item'
    );
    Simulate.click(yearUnits[1]);

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });
  it('YearPicker title', () => {
    const wrapper = mount(<YearPicker value="2020" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    const header = pop.querySelector('.zent-datepicker-panel-header');

    // prev
    const prevs = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[0];
    const prevBtns = prevs.querySelectorAll('svg');
    Simulate.click(prevBtns[0]);
    // next
    const nexts = header.querySelectorAll(
      '.zent-datepicker-panel-header-btns'
    )[1];
    const nextBtns = nexts.querySelectorAll('svg');
    Simulate.click(nextBtns[0]);
    wrapper.unmount();
  });

  it('WeekPicker hoverRange', () => {
    const wrapper = mount(<WeekPicker value={[]} />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');

    const pop = document.querySelector('.zent-datepicker-panel');
    Simulate.mouseEnter(
      pop.querySelectorAll('.zent-datepicker-cell-inner')[20]
    );
    Simulate.mouseLeave(
      pop.querySelectorAll('.zent-datepicker-cell-inner')[20]
    );

    wrapper.unmount();
  });

  it('YearPicker largest value', () => {
    const wrapper = mount(<YearPicker value="2999" />);
    wrapper.find('.zent-datepicker-trigger').simulate('click');
    wrapper.unmount();
  });
});
