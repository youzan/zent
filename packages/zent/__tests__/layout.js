import React from 'react';
import { shallow } from 'enzyme';
import Layout from 'layout';

const { Row, Col } = Layout;

/**
 * 只开了一个 Section 因为这个组件结构简单，主要功能做在css上
 */

describe('Layout', () => {
  it('Row will render an empty div without any props', () => {
    const wrapper = shallow(<Row />);
    expect(wrapper.contains(<div className="zent-row" />)).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  it('Row can have custom prefix and className', () => {
    const wrapper = shallow(<Row prefix="bar" className="foo" />);
    expect(wrapper.hasClass('bar-row')).toBe(true);
    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('Row can load other custom props', () => {
    const wrapper = shallow(<Row foo="bar" />);
    expect(wrapper.props().foo).toBe('bar');
  });

  it('Row can load custom children element or component', () => {
    const wrapper = shallow(
      <Row>
        <div className="content-div" />
        <span className="content-span" />
        <Col />
      </Row>
    );
    expect(wrapper.find('div > .content-div').length).toBe(1);
    expect(wrapper.find('div > .content-span').length).toBe(1);
    expect(wrapper.find(Col).length).toBe(1);
  });

  it('Col will render an empty div without any props', () => {
    const wrapper = shallow(<Col />);
    expect(wrapper.contains(<div className="zent-col" />)).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  it('Col can have custom prefix and className', () => {
    const wrapper = shallow(<Col prefix="bar" className="foo" />);
    expect(wrapper.hasClass('bar-col')).toBe(true);
    expect(wrapper.hasClass('foo')).toBe(true);
  });

  it('Col have span and offset prop(number)', () => {
    const wrapper = shallow(<Col span={8} offset={4} />);
    expect(wrapper.hasClass('zent-col-8')).toBe(true);
    expect(wrapper.hasClass('zent-col-offset-4')).toBe(true);
  });

  it('Col can load custom children element or component', () => {
    const wrapper = shallow(
      <Col>
        <div className="content-div" />
        <span className="content-span" />
        <Row />
      </Col>
    );
    expect(wrapper.find('div > .content-div').length).toBe(1);
    expect(wrapper.find('div > .content-span').length).toBe(1);
    expect(wrapper.find(Row).length).toBe(1);
  });
});
