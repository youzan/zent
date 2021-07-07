import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import TextMark from '../src/text-mark';

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

  it('textmark highlight className is object', () => {
    const wrapper = mount(
      <TextMark
        activeIndex={1}
        activeClassName="zent-demo-text-mark-active"
        highlightClassName={{
          abc: 'zent-demo-text-mark-highlight-abc',
          123: 'zent-demo-text-mark-highlight-123',
        }}
        searchWords={['abc', '123']}
        textToHighlight="abc先生测试ABC的123"
      />
    );
    expect(wrapper.find('mark').length).toBe(3);
    expect(wrapper.find('.zent-demo-text-mark-active').length).toBe(1);
    expect(wrapper.find('.zent-demo-text-mark-highlight-abc').length).toBe(2);
    expect(wrapper.find('.zent-demo-text-mark-highlight-123').length).toBe(1);
  });
});
