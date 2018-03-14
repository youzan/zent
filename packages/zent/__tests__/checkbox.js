import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Checkbox from 'checkbox';

describe('Controlled Checkbox', () => {
  it('checked', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox checked />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).toContain('zent-checkbox-checked');
  });

  it('unchecked', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).not.toContain('zent-checkbox-checked');
  });

  it('onChange', () => {
    let checked = false;
    let preventDefaultCalled = false;
    let stopPropagationCalled = false;

    const handleChange = e => {
      expect(e.target.value).toBe(1);

      checked = e.target.checked;

      expect(preventDefaultCalled).toBe(false);
      expect(stopPropagationCalled).toBe(false);

      e.preventDefault();
      e.stopPropagation();

      expect(preventDefaultCalled).toBe(true);
      expect(stopPropagationCalled).toBe(true);
    };
    const checkbox = TestUtils.renderIntoDocument(
      <Checkbox checked={false} onChange={handleChange} value={1} />
    );

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(
      checkbox,
      'input'
    );

    TestUtils.Simulate.change(inputNode, {
      target: { checked: true },
      preventDefault() {
        preventDefaultCalled = true;
      },
      stopPropagation() {
        stopPropagationCalled = true;
      },
    });
    expect(checked).toBe(true);
  });

  it('disabled', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox disabled />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).toContain('zent-checkbox-disabled');
  });

  it('readOnly', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox readOnly />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).toContain('zent-checkbox-disabled');
  });

  it('indeterminate', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox indeterminate />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).toContain('zent-checkbox-indeterminate');
  });

  it('className', () => {
    const checkbox = TestUtils.renderIntoDocument(
      <Checkbox className="customClassName" />
    );

    const checkboxNode = ReactDOM.findDOMNode(checkbox);
    expect(checkboxNode.className).toContain('customClassName');
  });

  it('prefix', () => {
    const checkbox = TestUtils.renderIntoDocument(<Checkbox prefix="custom" />);

    const checkboxNode = ReactDOM.findDOMNode(checkbox);

    // 使用自定义前缀后，zent的前缀应该被覆盖掉
    expect(checkboxNode.className).not.toContain('zent-checkbox-wrap');
    expect(checkboxNode.className).toContain('custom-checkbox-wrap');

    // 内部样式名称应该也会变成自定义前缀的
    expect(
      TestUtils.findRenderedDOMComponentWithClass.bind(
        TestUtils,
        checkbox,
        'custom-checkbox'
      )
    ).not.toThrow();
    expect(
      TestUtils.findRenderedDOMComponentWithClass.bind(
        TestUtils,
        checkbox,
        'custom-checkbox-inner'
      )
    ).not.toThrow();
  });

  it('with label', () => {
    const checkbox = TestUtils.renderIntoDocument(
      <Checkbox>Checkbox</Checkbox>
    );

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(checkbox, 'span');
    const textLabel = spans[spans.length - 1];

    expect(TestUtils.isDOMComponent(textLabel)).toBe(true);
    expect(textLabel.textContent).toEqual('Checkbox');
  });
});
