import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Radio from '../src/Radio'

describe('Controlled Radio', () => {
  it('checked', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio checked />
    )

    const radioNode = ReactDOM.findDOMNode(radio)
    expect(radioNode.className).toContain('zent-radio-checked')

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(radio, 'input')
    expect(inputNode.checked).toBe(true)
  })

  it('unchecked', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio />
    )

    const radioNode = ReactDOM.findDOMNode(radio)
    expect(radioNode.className).not.toContain('zent-radio-checked')

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(radio, 'input')
    expect(inputNode.checked).toBe(false)
  })

  it('disabled', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio disabled />
    )

    const radioNode = ReactDOM.findDOMNode(radio)
    expect(radioNode.className).toContain('zent-radio-disabled')

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(radio, 'input')
    expect(inputNode.disabled).toBe(true)
  })

  it('readOnly', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio readOnly />
    )

    const radioNode = ReactDOM.findDOMNode(radio)
    expect(radioNode.className).toContain('zent-radio-disabled')

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(radio, 'input')
    expect(inputNode.readOnly).toBe(true)
  })

  it('className', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio className="customClassName" />
    )

    const radioNode = ReactDOM.findDOMNode(radio)
    expect(radioNode.className).toContain('customClassName')
    expect(radioNode.className).toContain('zent-radio-wrap')
  })

  it('prefix', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio prefix="custom" />
    )

    const radioNode = ReactDOM.findDOMNode(radio)

    // 使用自定义前缀后，zent的前缀应该被覆盖掉
    expect(radioNode.className).not.toContain('zent-radio-wrap')
    expect(radioNode.className).toContain('custom-radio-wrap')

    // 内部样式名称应该也会变成自定义前缀的
    expect(TestUtils.findRenderedDOMComponentWithClass.bind(TestUtils, radio, 'custom-radio')).not.toThrow()
    expect(TestUtils.findRenderedDOMComponentWithClass.bind(TestUtils, radio, 'custom-radio-inner')).not.toThrow()
  })

  it('with label', () => {
    const radio = TestUtils.renderIntoDocument(
      <Radio>Radio Label</Radio>
    )

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(radio, 'span')
    const textLabel = spans[spans.length - 1]

    expect(textLabel.textContent).toEqual('Radio Label')
  })

  it('can have any value type', () => {
    const onChange = (evt) => {
      expect(evt.target.value).toBe(1);
      expect(evt.target.checked).toBe(false);
    };
    const radio = TestUtils.renderIntoDocument(
      <Radio value={1} onChange={onChange}>radio</Radio>
    );
    const node = ReactDOM.findDOMNode(radio);
    const input = node.querySelector('input');
    TestUtils.Simulate.change(input);
  })
})
