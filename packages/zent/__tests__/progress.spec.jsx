import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Progress from '../src/progress';

Enzyme.configure({ adapter: new Adapter() });

describe('Progress', () => {
  it('render a default Progress', () => {
    const wrapper = mount(<Progress />);
    expect(wrapper.find('.zent-progress').length).toBe(1);
    expect(wrapper.find('.zent-progress-type__line').length).toBe(1);
    expect(wrapper.find('.zent-progress-state__normal').length).toBe(1);
    expect(wrapper.find('.zent-progress-wrapper').length).toBe(1);
    expect(wrapper.find('.zent-progress-inner').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('0%');
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: undefined,
            width: '0%',
            height: 10,
          }}
        />
      )
    ).toBe(true);
  });

  it('can have a custom classname', () => {
    const wrapper = mount(<Progress className="test" />);
    expect(wrapper.find('div.test').length).toBe(1);
    expect(wrapper.find('.test.zent-progress').length).toBe(1);
  });

  it('can show progress in circle type', () => {
    const wrapper = mount(<Progress type="circle" percent={70} />);
    expect(wrapper.find('.zent-progress').length).toBe(1);
    expect(wrapper.find('.zent-progress-type__circle').length).toBe(1);
    expect(wrapper.find('.zent-progress-wrapper').length).toBe(1);
    expect(wrapper.find('.zent-progress-inner').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(1);
    expect(wrapper.find('svg').length).toBe(1);
  });

  it('can show progress in circle type without info', () => {
    const wrapper = mount(
      <Progress type="circle" percent={70} showInfo={false} />
    );
    expect(wrapper.find('.zent-progress-info').length).toBe(0);
  });

  it('can show progress in circle type with 100 percent', () => {
    const wrapper = mount(<Progress type="circle" percent={100} />);
    expect(wrapper.find('.zenticon-check-circle').length).toBe(0);
    expect(wrapper.find('.zenticon-check').length).toBe(1);
    expect(wrapper.find('circle').length).toBe(1);
  });

  it('can show progress in circle type when exception', () => {
    const wrapper = mount(
      <Progress type="circle" status="exception" percent={80} />
    );
    expect(wrapper.find('.zenticon-close-circle').length).toBe(0);
    expect(wrapper.find('.zenticon-close').length).toBe(1);
  });

  it('can show percent when in progress', () => {
    const wrapper = mount(<Progress percent={70} />);
    expect(wrapper.find('.zent-progress-info').text()).toBe('70%');
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: undefined,
            width: '70%',
            height: 10,
          }}
        />
      )
    ).toBe(true);
  });

  it('can show success status when percent is 100', () => {
    const wrapper = mount(<Progress percent={100} />);
    expect(wrapper.find('.zent-progress-state__success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('');
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-check-circle" />
        )
    ).toBe(true);
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: undefined,
            width: '100%',
            height: 10,
          }}
        />
      )
    ).toBe(true);
  });

  it('can support different status', () => {
    let wrapper = mount(<Progress percent={70} status="success" />);
    expect(wrapper.find('.zent-progress-state__success').length).toBe(1);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-check-circle" />
        )
    ).toBe(true);

    wrapper = mount(<Progress percent={100} status="exception" />);
    expect(wrapper.find('.zent-progress-state__exception').length).toBe(1);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-close-circle" />
        )
    ).toBe(true);

    wrapper = mount(<Progress percent={100} status="normal" />);
    expect(wrapper.find('.zent-progress-state__normal').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('100%');

    wrapper = mount(<Progress percent={100} />);
    expect(wrapper.find('.zent-progress-state__success').length).toBe(1);
  });

  it('can support custom color', () => {
    let wrapper = mount(<Progress percent={70} bgColor="#eee" />);
    expect(
      wrapper.contains(
        <div
          className="zent-progress-wrapper"
          style={{
            background: '#eee',
            width: '100%',
            height: 10,
          }}
        />
      )
    ).toBe(false);

    wrapper = mount(<Progress percent={70} normalColor="#eee" />);
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: '#eee',
            width: '70%',
            height: 10,
          }}
        />
      )
    ).toBe(true);

    wrapper = mount(<Progress percent={100} successColor="#eee" />);
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: '#eee',
            width: '100%',
            height: 10,
          }}
        />
      )
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-check-circle" />
        )
    ).toBe(true);

    wrapper = mount(
      <Progress
        percent={80}
        normalColor="#eee"
        exceptionColor="#000"
        status="exception"
      />
    );
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-progress-inner"
          style={{
            background: '#000',
            width: '80%',
            height: 10,
          }}
        />
      )
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-close-circle" />
        )
    ).toBe(true);
  });

  it('can hide info', () => {
    let wrapper = mount(<Progress percent={70} showInfo={false} />);
    expect(wrapper.find('.zent-progress-state__normal').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);

    wrapper = mount(<Progress percent={100} showInfo={false} />);
    expect(wrapper.find('.zent-progress-state__success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-check-circle" />
        )
    ).toBe(false);

    wrapper = mount(
      <Progress percent={70} status="exception" showInfo={false} />
    );
    expect(wrapper.find('.zent-progress-state__exception').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);
    expect(
      wrapper
        .find('.zent-progress-info')
        .containsMatchingElement(
          <i className="zenticon zenticon-close-circle" />
        )
    ).toBe(false);
  });

  it('can show format info', () => {
    const wrapper = mount(
      <Progress percent={70} format={percent => `进度${percent}%`} />
    );
    expect(wrapper.find('.zent-progress-info').text()).toBe('进度70%');
  });

  it('has animation', () => {
    const wrapper = mount(
      <Progress
        percent={70}
        format={percent => `进度${percent}%`}
        type="circle"
      />
    );

    const arcInstance = wrapper.find('AnimatedArc').instance();
    arcInstance.animationDelayTimerId = 1;
    expect(() => arcInstance.startAnimation()).not.toThrow();
    expect(() => arcInstance.finishAnimation()).not.toThrow();
    arcInstance.transitionEndTimerId = 0;
    expect(() => arcInstance.finishAnimation()).not.toThrow();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
