import { Component } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Checkbox from '../src/checkbox';

class Wrapper extends Component {
  render() {
    return this.props.children;
  }
}

describe('Controlled Checkbox', () => {
  it('checked', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox checked />, div);

    const checkboxNode = div.firstChild;
    expect(checkboxNode.className).toContain('zent-checkbox-checked');
  });

  it('unchecked', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox checked={false} />, div);

    const checkboxNode = div.firstChild;
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

    const wrapper = TestUtils.renderIntoDocument(
      <Wrapper>
        <Checkbox checked={false} onChange={handleChange} value={1} />
      </Wrapper>
    );

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(
      wrapper,
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
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox disabled />, div);

    const checkboxNode = div.firstChild;
    expect(checkboxNode.className).toContain('zent-checkbox-disabled');
  });

  it('readOnly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox readOnly />, div);

    const checkboxNode = div.firstChild;
    expect(checkboxNode.className).toContain('zent-checkbox-disabled');
  });

  it('indeterminate', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox indeterminate />, div);

    const checkboxNode = div.firstChild;
    expect(checkboxNode.className).toContain('zent-checkbox-indeterminate');
  });

  it('className', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Checkbox className="customClassName" />, div);

    const checkboxNode = div.firstChild;
    expect(checkboxNode.className).toContain('customClassName');
  });

  it('with label', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Wrapper>
        <Checkbox>Checkbox</Checkbox>
      </Wrapper>
    );

    const textLabel = TestUtils.findRenderedDOMComponentWithClass(
      wrapper,
      'zent-checkbox-label'
    );

    expect(TestUtils.isDOMComponent(textLabel)).toBe(true);
    expect(textLabel.textContent).toEqual('Checkbox');
  });
});
