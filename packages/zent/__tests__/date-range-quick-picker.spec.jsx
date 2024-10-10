import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import DateRangeQuickPicker from '../src/date-range-quick-picker';

Enzyme.configure({ adapter: new Adapter() });

describe('DateRangeQuickPicker', () => {
  it('renders', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DateRangeQuickPicker
        value={['2017-01-01', '2018-01-01']}
        onChange={onChange}
      />
    );
    expect(wrapper.find('.zent-date-range-quick-picker').length).toBe(1);

    wrapper.instance().handleTimeChange(['2017-02-01', '2018-02-01']);
    expect(onChange.mock.calls.length).toBe(1);

    wrapper.instance().handleChosenDays(0);
    expect(onChange.mock.calls.length).toBe(2);

    wrapper.instance().handleChosenDays(1);
    expect(onChange.mock.calls.length).toBe(3);

    wrapper.instance().handleChosenDays(2);
    expect(onChange.mock.calls.length).toBe(4);
  });

  it('supports number value type', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DateRangeQuickPicker
        value={[1524106071377, 1524107071377]}
        onChange={onChange}
        valueType="number"
        format="YYYY-MM-DD HH:mm:ss"
        min="2020-04-19 10:05:12"
        max="2025-01-01 12:05:12"
      />
    );

    wrapper.instance().handleChosenDays(1);
    expect(onChange.mock.calls.length).toBe(1);
    wrapper.find('.zent-datepicker-trigger').at(1).simulate('click');
  });

  it('suppports default preset', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DateRangeQuickPicker
        value={[1524106071377, 1524107071377]}
        onChange={onChange}
        defaultSelectedPresetIndex={0}
        disabledDate={{
          min: '2018-04-19 10:05:12',
          max: '2018-04-19 15:05:12',
        }}
      />
    );
    expect(onChange.mock.calls.length).toBe(0);
    wrapper.find('.zent-datepicker-trigger').at(0).simulate('click');

    const wrapper2 = mount(
      <DateRangeQuickPicker
        onChange={onChange}
        defaultSelectedPresetIndex={0}
        disabledTime={() => {
          return {
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
          };
        }}
      />
    );
    expect(onChange.mock.calls.length).toBe(1);
    wrapper2.find('.zent-datepicker-trigger').at(1).simulate('click');
  });
});
