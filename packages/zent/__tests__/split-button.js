import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SplitButton from 'split-button';

Enzyme.configure({ adapter: new Adapter() });

describe('SplitButton', () => {
  it('className default to zent-split-button', () => {
    const wrapper = mount(<SplitButton />);
    expect(wrapper.children().hasClass('zent-split-button')).toBe(true);
  });

  it('can hav custom prefix', () => {
    const wrapper = mount(<SplitButton prefix="arvin" />);
    expect(wrapper.children().hasClass('arvin-split-button')).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = mount(<SplitButton className="arvin" />);
    expect(wrapper.children().hasClass('arvin')).toBe(true);
  });

  it('can be disabled', () => {
    const wrapper = mount(<SplitButton disabled />);
    expect(wrapper.find('.zent-btn-disabled')).toBeTruthy();
  });

  it('can have dropdownMenu and onSelect', () => {
    const data = [
      {
        value: 1,
        text: '1',
      },
      {
        value: 2,
        text: '2',
      },
    ];

    const handleSelect = () => {
      data.push({
        value: 3,
        text: '3',
      });
    };

    const wrapper = mount(
      <SplitButton dropdownData={data} onSelect={handleSelect} />
    );
    wrapper
      .find('.zent-split-button__dropdown')
      .at(0)
      .simulate('click');
    wrapper.instance().handleSelect();
    expect(data.length).toBe(3);
  });
});
