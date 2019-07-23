import React from 'react';
import Enzyme, { mount } from 'enzyme';
import BlockHeader from 'block-header';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('BlockHeader', () => {
  it('BlockHeader has title', () => {
    const wrapper = mount(<BlockHeader title="title" />);
    expect(wrapper.find('.zent-block-header').length).toBe(1);
    expect(wrapper.find('.zent-block-header__title').length).toBe(1);
    expect(wrapper.find('.zent-block-header__pop').length).toBe(0);
    expect(wrapper.find('.zent-block-header__content').length).toBe(0);
  });

  it('BlockHeader has tooltip', () => {
    const wrapper = mount(
      <BlockHeader title="title" tooltip={<span>tooltip</span>} />
    );
    expect(wrapper.find('.zent-block-header__pop').length).toBe(1);
    expect(wrapper.find('.zent-block-header__tooltip-trigger').length).toBe(1);
  });

  it('BlockHeader has left content', () => {
    const wrapper = mount(
      <BlockHeader title="title" leftContent={<span>left content</span>} />
    );
    expect(wrapper.find('.zent-block-header__content').length).toBe(1);
    expect(wrapper.find('.zent-block-header__content-left').length).toBe(1);
  });

  it('BlockHeader has right content', () => {
    const wrapper = mount(
      <BlockHeader title="title" rightContent={<span>right content</span>} />
    );
    expect(wrapper.find('.zent-block-header__content').length).toBe(1);
    expect(wrapper.find('.zent-block-header__content-right').length).toBe(1);
  });
});
