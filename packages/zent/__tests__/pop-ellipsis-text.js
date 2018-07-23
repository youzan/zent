import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopEllipsisText from 'pop-ellipsis-text';

Enzyme.configure({ adapter: new Adapter() });

const firstSentence = '你站在桥上看风景';
const secondSentence = '看风景的人在楼上看你';
const thirdSentence = (
  <span>
    <span style={{ color: 'red' }}>黄河</span>
  </span>
);
const forthSentence = (
  <span>
    君不见<span style={{ color: 'red' }}>黄河</span>之水天上来，奔流到海不复回
  </span>
);

describe('testing <PopEllipsisText >', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly when pass count larger then text length', () => {
    wrapper = mount(<PopEllipsisText count={10} text={firstSentence} />);
    expect(wrapper.html()).toBe(
      `<div class=\"zent-pop-ellipsis\">${firstSentence}</div>`
    );
  });

  it('should render correctly when pass percentage to width', () => {
    wrapper = mount(
      <div style={{ width: 100 }}>
        <PopEllipsisText
          type="line"
          line={2}
          width="100%"
          text={firstSentence}
        />
      </div>
    );
    expect(wrapper.find(PopEllipsisText).length).toBe(1);
  });

  it('should render correctly when pass html to props.text and pass digital to props.width', () => {
    wrapper = mount(
      <PopEllipsisText
        line={2}
        width={100}
        text={forthSentence}
        position="bottom-left"
      />
    );
    expect(wrapper.find(PopEllipsisText).length).toBe(1);
    expect(
      wrapper.find(PopEllipsisText).prop('text').props.children[1].props.style
        .color
    ).toBe('red');
  });

  it('should render correctly when pass html', () => {
    wrapper = mount(
      <PopEllipsisText line={2} width={100} text={thirdSentence} />
    );
    expect(wrapper.find(PopEllipsisText).length).toBe(1);
  });

  it('should render correctly when pass count less then or equal to text length', () => {
    wrapper = mount(<PopEllipsisText count={5} text={secondSentence} />);
    expect(wrapper.text()).toBe(`${secondSentence.slice(0, 5)}...`);
    expect(wrapper.find('.zent-popover-wrapper').length).toBe(1);
  });

  it('should render correctly when pass width', () => {
    wrapper = mount(<PopEllipsisText text={secondSentence} width={1} />);
    expect(wrapper.find(PopEllipsisText).length).toBe(1);
  });
});
