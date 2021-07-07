import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Timeline from '../src/timeline';
import { TimelineDot } from '../src/timeline/Dot';

Enzyme.configure({ adapter: new Adapter() });

const color1 = '#5197FF';
const color2 = 'red';
const color3 = 'green';

describe('Timeline', () => {
  it('Timeline Legend', () => {
    const wrapper = shallow(
      <Timeline.Legend color={color1}>Sample</Timeline.Legend>
    );
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('zent-timeline-legend'));
    expect(wrapper.find('.zent-timeline-legend-label').text()).toBe('Sample');
    expect(
      wrapper.find('.zent-timeline-legend-line').prop('style').backgroundColor
    ).toBe(color1);
    expect(
      wrapper.find('.zent-timeline-legend-line').find(TimelineDot).props().color
    ).toBe(color1);
  });

  it('Timeline Basic', () => {
    const wrapper = mount(
      <Timeline type="horizontal">
        <Timeline.Item label="Time 1" dotColor={color1} lineColor={color2} />
        <Timeline.Item
          label="Time 2"
          dotColor={color1}
          lineColor={color2}
          color={color3}
          tip="test"
        />
        <Timeline.Item label="Time 3" />
      </Timeline>
    );
    expect(
      wrapper.find('.zent-timeline').hasClass('zent-timeline-horizontal')
    ).toBe(true);
    expect(wrapper.find('.zent-timeline').children().length).toBe(3);
    const first = wrapper.find('.zent-timeline').childAt(0);
    expect(first.find('.zent-timeline-item-label').text()).toBe('Time 1');
    expect(first.find('.zent-timeline-dot').prop('style').borderColor).toBe(
      color1
    );
    expect(
      first.find('.zent-timeline-item-line').prop('style').backgroundColor
    ).toBe(color2);
    const second = wrapper.find('.zent-timeline').childAt(1);
    expect(second.find('.zent-timeline-dot').prop('style').borderColor).toBe(
      color3
    );
    expect(
      second.find('.zent-timeline-item-line').prop('style').backgroundColor
    ).toBe(color3);
    second.find('.zent-timeline-item-hover').simulate('mouseenter');
    jest.runAllTimers();
    // expect(wrapper.find('.zent-popover-v2')).toBe('test');
  });

  it('Timeline Vertical', () => {
    const wrapper = shallow(<Timeline type="vertical" />);
    expect(wrapper.hasClass('zent-timeline-vertical'));
  });

  it('Timeline Array', () => {
    const timeline = [
      'hello',
      'world',
      {
        label: 'blue',
        dotColor: '#5197FF',
      },
      {
        label: 'red',
        lineColor: '#E70000',
      },
      {
        label: 'color',
        color: '#E70000',
      },
    ];

    const wrapper = mount(<Timeline timeline={timeline} />);
    expect(wrapper.find('.zent-timeline').children().length).toBe(5);
    expect(wrapper.find('.zent-timeline').childAt(0).find('label').text()).toBe(
      'hello'
    );
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(2)
        .find('.zent-timeline-dot')
        .prop('style').borderColor
    ).toBe(timeline[2].dotColor);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(3)
        .find('.zent-timeline-item-line')
        .prop('style').backgroundColor
    ).toBe(timeline[3].lineColor);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(4)
        .find('.zent-timeline-dot')
        .prop('style').borderColor
    ).toBe(timeline[4].color);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(4)
        .find('.zent-timeline-item-line')
        .prop('style').backgroundColor
    ).toBe(timeline[4].color);
  });

  it('Timeline Dynamic', () => {
    const timeline = [
      {
        label: 'blue',
        dotColor: '#5197FF',
        percent: 0.3,
      },
      {
        label: 'red',
        lineColor: '#E70000',
        percent: 0.4,
      },
      {
        label: 'color',
        color: '#E70000',
        percent: 0.3,
      },
    ];

    const wrapper = mount(<Timeline timeline={timeline} size={1000} />);
    expect(wrapper.find('.zent-timeline').prop('style').width).toBe(1000);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(0)
        .find('.zent-timeline-item-line')
        .prop('style').width
    ).toBe(300);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(1)
        .find('.zent-timeline-item-line')
        .prop('style').width
    ).toBe(400);
    expect(
      wrapper
        .find('.zent-timeline')
        .childAt(2)
        .find('.zent-timeline-item-line')
        .prop('style').width
    ).toBe(300);
  });
});
