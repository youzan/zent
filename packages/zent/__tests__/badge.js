import React from 'react';
import { mount } from 'enzyme';
import Badge from 'badge';

describe('Badge', () => {
  it('render a normal badge', () => {
    const wrapper = mount(<Badge count={5}>news</Badge>);
    expect(wrapper.find('.zent-badge').length).toBe(1);
    expect(wrapper.find('.zent-badge-dot').length).toBe(0);
    expect(wrapper.find('.zent-badge-content').length).toBe(1);
    expect(wrapper.find('.zent-badge-content').text()).toBe('news');
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('5');
  });

  it('can have custom className', () => {
    const wrapper = mount(<Badge className="news-badge">news</Badge>);
    expect(wrapper.find('.zent-badge.news-badge').length).toBe(1);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Badge prefix="book">book</Badge>);
    expect(wrapper.find('.book-badge').length).toBe(1);
  });

  it('show diaplay max count when count exceed max count', () => {
    const wrapper = mount(<Badge count={100}>news</Badge>);
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('99+');
  });

  it('can set custom max count', () => {
    const wrapper = mount(
      <Badge count={100} maxCount={999}>
        news
      </Badge>
    );
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('100');
  });

  it('will not show count when count is zero', () => {
    const wrapper = mount(<Badge count={0}>news</Badge>);
    expect(wrapper.find('.zent-badge-count').length).toBe(0);
  });

  it('will not show count when count is less than zero', () => {
    const wrapper = mount(<Badge count={-1}>news</Badge>);
    expect(wrapper.find('.zent-badge-count').length).toBe(0);
  });

  it('can show count when setting showZero', () => {
    const wrapper = mount(
      <Badge count={0} showZero>
        news
      </Badge>
    );
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('0');
  });

  it('can show a red dot when setting dot', () => {
    const wrapper = mount(<Badge dot>news</Badge>);
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-dot').length).toBe(1);
  });

  it('can show alone without content', () => {
    const wrapper = mount(<Badge count={5} />);
    expect(wrapper.find('.zent-badge.zent-badge-none-cont').length).toBe(1);
    expect(wrapper.find('.zent-badge-content').length).toBe(0);
    expect(wrapper.find('.zent-badge-dot').length).toBe(0);
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('5');
  });

  it('can show a red dot alone without content', () => {
    const wrapper = mount(<Badge dot />);
    expect(wrapper.find('.zent-badge.zent-badge-none-cont').length).toBe(1);
    expect(wrapper.find('.zent-badge-content').length).toBe(0);
    expect(wrapper.find('.zent-badge-dot').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').length).toBe(1);
    expect(wrapper.find('.zent-badge-count').text()).toBe('');
  });
});
