import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Tag from '../src/tag';

Enzyme.configure({ adapter: new Adapter() });

describe('Tag', () => {
  it('render a default tag', () => {
    const wrapper = mount(<Tag>tag</Tag>);
    expect(wrapper.find('.zent-tag').length).toBe(1);
    expect(wrapper.find('.zent-tag-rounded').length).toBe(1);
    expect(wrapper.find('.zent-tag-style-red').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').length).toBe(1);
    expect(wrapper.find('.zent-tag-content').text()).toBe('tag');
    expect(
      wrapper.containsMatchingElement(
        <i className="zenticon zenticon-close zent-tag-close-btn" />
      )
    ).toBe(false);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Tag className="label" />);
    expect(wrapper.find('.zent-tag.label').length).toBe(1);
  });

  it('can have close button', () => {
    const wrapper = mount(
      <Tag closable>
        <span>tag</span>
      </Tag>
    );
    expect(wrapper.find('ZentIcon').length).toBe(1);
  });

  it('can have a onClose callback', () => {
    const onClose = jest.fn();
    let wrapper = mount(<Tag closable onClose={onClose} />);
    wrapper.find('ZentIcon').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);

    wrapper = mount(<Tag closable onClose={null} />);
    expect(() => wrapper.find('ZentIcon').simulate('click')).not.toThrow();
  });

  it('has red theme', () => {
    const wrapper = mount(<Tag theme="red" />);
    expect(wrapper.find('.zent-tag-style-red').length).toBe(1);
  });

  it('has green theme', () => {
    const wrapper = mount(<Tag theme="green" />);
    expect(wrapper.find('.zent-tag-style-green').length).toBe(1);
  });

  it('has yellow theme', () => {
    const wrapper = mount(<Tag theme="yellow" />);
    expect(wrapper.find('.zent-tag-style-yellow').length).toBe(1);
  });

  it('has blue theme', () => {
    const wrapper = mount(<Tag theme="blue" />);
    expect(wrapper.find('.zent-tag-style-blue').length).toBe(1);
  });

  it('has grey theme', () => {
    const wrapper = mount(<Tag theme="grey" />);
    expect(wrapper.find('.zent-tag-style-grey').length).toBe(1);
  });

  it('has outline style', () => {
    const wrapper = mount(<Tag outline />);
    expect(wrapper.find('.zent-tag-style-red-outline').length).toBe(1);
  });

  it('can have custom style', () => {
    const wrapper = mount(
      <Tag
        style={{
          backgroundColor: '#ff1493',
          borderColor: '#ff1493',
        }}
      >
        #ff1493
      </Tag>
    );
    expect(
      wrapper.containsMatchingElement(
        <div
          className="zent-tag zent-tag-style-red zent-tag-rounded"
          style={{ backgroundColor: '#ff1493', borderColor: '#ff1493' }}
        >
          <div className="zent-tag-content">#ff1493</div>
        </div>
      )
    ).toBe(true);
    expect(wrapper.find('.zent-tag-close-btn').length).toBe(0);
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
    expect(
      wrapper.containsMatchingElement(
        <a href="https://www.youzan.com">youzan</a>
      )
    ).toBe(true);
  });
});
