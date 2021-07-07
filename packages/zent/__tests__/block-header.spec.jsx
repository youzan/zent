import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import BlockHeader from '../src/block-header';

Enzyme.configure({ adapter: new Adapter() });

describe('BlockHeader', () => {
  it('BlockHeader has title', () => {
    const wrapper = mount(<BlockHeader title="title" />);
    expect(wrapper.find('.zent-block-header').length).toBe(1);
    expect(wrapper.find('.zent-block-header__title').length).toBe(1);
    expect(wrapper.find('.zent-block-header__pop').length).toBe(0);
    expect(wrapper.find('.zent-block-header__content').length).toBe(0);
  });

  it('BlockHeader of ribbon type', () => {
    const wrapper = mount(<BlockHeader title="title" type="ribbon" />);
    expect(
      wrapper.find('.zent-block-header.zent-block-header-ribbon').length
    ).toBe(1);
    expect(
      wrapper.find('.zent-block-header__title.zent-block-header__title-ribbon')
        .length
    ).toBe(1);
  });

  it('BlockHeader of minimum type', () => {
    const wrapper = mount(<BlockHeader title="title" type="minimum" />);
    expect(
      wrapper.find('.zent-block-header.zent-block-header-minimum').length
    ).toBe(1);
    expect(wrapper.find('.zent-block-header__title').length).toBe(1);
    expect(wrapper.find('.zent-block-header__title-ribbon').length).toBe(0);
  });

  it('BlockHeader has tooltip', () => {
    const wrapper = mount(
      <BlockHeader title="title" tooltip={<span>tooltip</span>} />
    );
    expect(wrapper.find('.zent-block-header__pop').length).toBe(1);
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
