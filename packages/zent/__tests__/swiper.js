import React from 'react';
import { mount, shallow } from 'enzyme';
import Swiper from 'swiper';

describe('Swiper', () => {
  it('className default to zent-swiper ', () => {
    const wrapper = shallow(<Swiper />);
    expect(wrapper.hasClass('zent-swiper')).toBe(true);
  });

  it('can have custom prefix', () => {
    const wrapper = shallow(<Swiper prefix="dwb" />);
    expect(wrapper.hasClass('dwb-swiper')).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = shallow(<Swiper className="dengwenbo" />);
    expect(wrapper.hasClass('dengwenbo')).toBe(true);
  });

  it('can have one children', () => {
    const wrapper = mount(
      <Swiper>
        <div className="swiper-test-child">1</div>
      </Swiper>
    );
    expect(wrapper.hasClass('zent-swiper')).toBe(true);
    expect(wrapper.find('.zent-swiper__container').length).toBe(1);
    expect(wrapper.find('.zent-swiper__arrow').length).toBe(0);
    expect(wrapper.find('.zent-swiper__dots').length).toBe(0);
    expect(wrapper.find('.swiper-test-child').length).toBe(1);
    wrapper.unmount();
  });

  it('can change page', () => {
    const childs = [1, 2, 3];
    class Test extends React.Component {
      state = {
        currentIndex: null,
        prevIndex: null
      };

      handleChange = (currentIndex, prevIndex) => {
        this.setState({ currentIndex, prevIndex });
      };

      render() {
        return (
          <Swiper arrows onChange={this.handleChange}>
            {childs.map((item, index) => (
              <div key={index} className="swiper-text-child">
                {item}
              </div>
            ))}
          </Swiper>
        );
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.find('.zent-swiper__dots-item').length).toBe(3);
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(0)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
    expect(wrapper.find('.swiper-text-child').length).toBe(5);
    wrapper
      .find('.zent-swiper__arrow')
      .at(0)
      .simulate('click');
    jest.runAllTimers();
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(2)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
    wrapper
      .find('.zent-swiper__dots-item')
      .at(2)
      .simulate('click');
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(2)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
    wrapper
      .find('.zent-swiper__arrow')
      .at(1)
      .simulate('click');
    jest.runAllTimers();
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(0)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
    wrapper
      .find('.zent-swiper__dots-item')
      .at(2)
      .simulate('click');
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(2)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
  });

  it('can set props', () => {
    const childs = [1, 2, 3];
    class Test extends React.Component {
      render() {
        return (
          <Swiper
            dotsColor="red"
            dotsSize="large"
            autoplay
            autoplayIterval={5000}
            arrows
            arrowsType="light"
          >
            {childs.map((item, index) => (
              <div key={index} className="swiper-text-child">
                {item}
              </div>
            ))}
          </Swiper>
        );
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.find('.zent-swiper__arrow').length).toBe(2);
    expect(wrapper.hasClass('zent-swiper-light')).toBe(true);
    expect(
      wrapper.find('.zent-swiper__dots').hasClass('zent-swiper__dots-red')
    ).toBe(true);
    expect(
      wrapper.find('.zent-swiper__dots').hasClass('zent-swiper__dots-large')
    ).toBe(true);
    wrapper.simulate('mouseEnter');
    wrapper.simulate('mouseLeave');
    wrapper
      .find('.zent-swiper__dots-item')
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('.zent-swiper__dots-item')
        .at(1)
        .hasClass('zent-swiper__dots-item-active')
    ).toBe(true);
  });

  it('can have customize dotsColor', () => {
    const childs = [1, 2, 3];
    class Test extends React.Component {
      render() {
        return (
          <Swiper dotsColor="#fff">
            {childs.map((item, index) => (
              <div key={index} className="swiper-text-child">
                {item}
              </div>
            ))}
          </Swiper>
        );
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.hasClass('zent-swiper')).toBe(true);
  });
});
