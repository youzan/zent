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
      />
    );

    wrapper.instance().handleChosenDays(1);
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('suppports default preset', () => {
    const onChange = jest.fn();
    mount(
      <DateRangeQuickPicker
        value={[1524106071377, 1524107071377]}
        onChange={onChange}
        defaultSelectedPresetIndex={0}
      />
    );
    expect(onChange.mock.calls.length).toBe(0);

    mount(
      <DateRangeQuickPicker
        onChange={onChange}
        defaultSelectedPresetIndex={0}
      />
    );
    expect(onChange.mock.calls.length).toBe(1);
  });
});
