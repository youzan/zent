import React from 'react';
import { mount } from 'enzyme';
import Tag from 'tag';

describe('Tag', () => {
  it('render a default tag', () => {
    const wrapper = mount(<Tag>tag</Tag>);
    expect(wrapper.find('.zent-tag').length).toBe(1);
    expect(wrapper.find('.zent-tag-style-red').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').text()).toBe('tag');
    expect(
      wrapper.contains(<span className="zent-tag-close-btn">×</span>)
    ).toBe(false);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Tag className="label" />);
    expect(wrapper.find('.zent-tag.label').length).toBe(1);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Tag prefix="label" />);
    expect(wrapper.find('.label-tag').length).toBe(1);
  });

  it('can have close button', () => {
    const wrapper = mount(<Tag closable><span>tag</span></Tag>);
    expect(wrapper.find('.zent-tag-close-btn').length).toBe(1);
  });

  it('can have a onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Tag closable onClose={onClose} />);
    wrapper.find('.zent-tag-close-btn').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);

    wrapper = mount(<Tag closable onClose={null} />);
    expect(() =>
      wrapper.find('.zent-tag-close-btn').simulate('click')
    ).not.toThrow();
  });

  it('has red style', () => {
    const wrapper = mount(<Tag color="red" />);
    expect(wrapper.find('.zent-tag-style-red').length).toBe(1);
  });

  it('has green style', () => {
    const wrapper = mount(<Tag color="green" />);
    expect(wrapper.find('.zent-tag-style-green').length).toBe(1);
  });

  it('has yellow style', () => {
    const wrapper = mount(<Tag color="yellow" />);
    expect(wrapper.find('.zent-tag-style-yellow').length).toBe(1);
  });

  it('has blue style', () => {
    const wrapper = mount(<Tag color="blue" />);
    expect(wrapper.find('.zent-tag-style-blue').length).toBe(1);
  });

  it('has darkgreen style', () => {
    const wrapper = mount(<Tag color="darkgreen" />);
    expect(wrapper.find('.zent-tag-style-darkgreen').length).toBe(1);
  });

  it('has outline style', () => {
    const wrapper = mount(<Tag outline />);
    expect(wrapper.find('.zent-tag-style-red-outline').length).toBe(1);
  });

  it('can have a custom color style', () => {
    const wrapper = mount(<Tag color="#ff1493">#ff1493</Tag>);
    expect(
      wrapper.contains(
        <div
          className="zent-tag zent-tag-style"
          style={{ background: '#ff1493', borderColor: '#ff1493' }}
        >
          <div className="zent-tag-content">#ff1493</div>
        </div>
      )
    ).toBe(true);
    expect(
      wrapper.contains(<span className="zent-tag-close-btn">×</span>)
    ).toBe(false);
  });

  it('can have a custom color outline style', () => {
    const wrapper = mount(<Tag color="#ff1493" outline>#ff1493</Tag>);
    expect(
      wrapper.contains(
        <div
          className="zent-tag zent-tag-style-outline"
          style={{ color: '#ff1493', borderColor: '#ff1493' }}
        >
          <div className="zent-tag-content">#ff1493</div>
        </div>
      )
    ).toBe(true);
    expect(wrapper.find('.zent-tag').length).toBe(1);
  });

  it('can have children element', () => {
    const wrapper = mount(
      <Tag><a href="https://www.youzan.com">youzan</a></Tag>
    );
    expect(wrapper.find('.zent-tag').length).toBe(1);
    expect(wrapper.contains(<a href="https://www.youzan.com">youzan</a>)).toBe(
      true
    );
  });
});
