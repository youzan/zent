import React from 'react';
import { shallow } from 'enzyme';
import ZentForm from 'form';

describe('Form', () => {
  const { Form } = ZentForm;

  it('Form will render an empty form element without any props or children', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.type()).toBe('form');
    expect(wrapper.children().length).toBe(0);
    expect(wrapper.hasClass('zent-form')).toBe(true);
    expect(wrapper.props().onSubmit()).toBe(undefined);
  });

  it('Form can have custom prefix, className, horizontal, inline and style props', () => {
    const style = { color: 'red' };
    const wrapper = shallow(
      <Form className="foo" prefix="bar" horizontal inline style={style} />
    );
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('bar-form')).toBe(true);
    expect(wrapper.hasClass('bar-form--horizontal')).toBe(true);
    expect(wrapper.hasClass('bar-form--inline')).toBe(true);
    expect(wrapper.props().style).toBe(style);
  });

  it('Form can have custom children and onSubmit function', () => {
    const submitMock = jest.fn();
    const wrapper = shallow(
      <Form onSubmit={submitMock}>
        <span className="zent-form-child">childSpan_1</span>
        <span className="zent-form-child">childSpan_2</span>
      </Form>
    );
    expect(submitMock.mock.calls.length).toBe(0);
    wrapper.find('form').simulate('submit');
    expect(submitMock.mock.calls.length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(
      wrapper
        .find('span')
        .at(0)
        .hasClass('zent-form-child')
    ).toBe(true);
    expect(
      wrapper
        .find('span')
        .at(1)
        .text()
    ).toBe('childSpan_2');
  });
});
