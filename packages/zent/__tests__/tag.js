import React from 'react';
import { mount } from 'enzyme';
import Tag from 'tag';

describe('Tag', () => {
  it('render a default tag', () => {
    const wrapper = mount(<Tag>tag</Tag>);
    expect(wrapper.find('.zent-tag').length).toBe(1);
    expect(wrapper.find('.zent-tag-rounded').length).toBe(1);
    expect(wrapper.find('.zent-tag-style-red').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').text()).toBe('tag');
    expect(
      wrapper.contains(
        <i className="zenticon zenticon-close zent-tag-close-btn" />
      )
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
    const wrapper = mount(
      <Tag closable>
        <span>tag</span>
      </Tag>
    );
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

  it('can have custom color style', () => {
    const wrapper = mount(<Tag color="#ff1493">#ff1493</Tag>);
    expect(
      wrapper.contains(
        <div
          className="zent-tag zent-tag-style zent-tag-rounded"
          style={{ background: '#ff1493', borderColor: '#ff1493' }}
        >
          <div className="zent-tag-content">#ff1493</div>
        </div>
      )
    ).toBe(true);
    expect(wrapper.find('.zent-tag-close-btn').length).toBe(0);
  });

  it('can have custom color outline style', () => {
    const wrapper = mount(
      <Tag color="#ff1493" outline>
        #ff1493
      </Tag>
    );
    expect(
      wrapper.contains(
        <div
          className="zent-tag zent-tag-style-outline zent-tag-rounded"
          style={{ color: '#ff1493', borderColor: '#ff1493' }}
        >
          <div className="zent-tag-content">#ff1493</div>
        </div>
      )
    ).toBe(true);
    expect(wrapper.find('.zent-tag').length).toBe(1);
  });

  it('can have custom border color, backgound color, font color', () => {
    const wrapper = mount(
      <Tag color="#ff1493" borderColor="#eee" bgColor="#fff" fontColor="#000">
        custom
      </Tag>
    );
    expect(
      wrapper.contains(
        <div
          className="zent-tag zent-tag-style zent-tag-rounded"
          style={{ borderColor: '#eee', background: '#fff', color: '#000' }}
        >
          <div className="zent-tag-content">custom</div>
        </div>
      )
    ).toBe(true);
    expect(wrapper.find('.zent-tag').length).toBe(1);
  });

  it('can show none rounded corner', () => {
    const wrapper = mount(<Tag rounded={false}>custom</Tag>);
    expect(wrapper.find('.zent-tage-rounded').length).toBe(0);
  });

  it('can have children element', () => {
    const wrapper = mount(
      <Tag>
        <a href="https://www.youzan.com">youzan</a>
      </Tag>
    );
    expect(wrapper.find('.zent-tag').length).toBe(1);
    expect(wrapper.contains(<a href="https://www.youzan.com">youzan</a>)).toBe(
      true
    );
  });

  it('visibility can be controlled from props', () => {
    let visible = true;
    const onVisibleChange = jest.fn().mockImplementation(value => {
      visible = value;
    });
    const onClose = jest.fn();

    const wrapper = mount(
      <Tag
        closable
        visible={visible}
        onVisibleChange={onVisibleChange}
        onClose={onClose}
      />
    );
    wrapper.find('.zent-tag-close-btn').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
    expect(onVisibleChange.mock.calls.length).toBe(1);
    expect(visible).toBe(false);

    // Hidden tag
    const wrapper2 = mount(<Tag visible={false} />);
    expect(wrapper2.find('.zent-tag').length).toBe(0);
  });
});
