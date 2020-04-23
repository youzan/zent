import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextMark from 'text-mark';

Enzyme.configure({ adapter: new Adapter() });

describe('<TextMark />', () => {
  it('textmark basic', () => {
    const wrapper = mount(
      <TextMark
        activeIndex={1}
        activeStyle={{ backgroundColor: '#f48f42' }}
        highlightStyle={{ backgroundColor: '#ffd54f' }}
        caseSensitive
        searchWords={['abc']}
        textToHighlight="abc先生测试ABC123"
      />
    );
    expect(wrapper.find('mark').length).toBe(1);
  });

  it('textmark custom class', () => {
    const wrapper = mount(
      <TextMark
        activeIndex={1}
        activeClassName="zent-demo-text-mark-active"
        highlightClassName="zent-demo-text-mark-highlight"
        searchWords={['abc']}
        textToHighlight="abc先生测试ABC123"
      />
    );
    expect(wrapper.find('mark').length).toBe(2);
    expect(wrapper.find('.zent-demo-text-mark-active').length).toBe(1);
    expect(wrapper.find('.zent-demo-text-mark-highlight').length).toBe(2);
  });
});
