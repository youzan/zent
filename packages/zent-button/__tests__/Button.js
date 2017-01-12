import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from '../src/Button';

describe('<Button />', () => {
  let button;
  let buttonNode;

  function mount(Component) {
    button = TestUtils.renderIntoDocument(Component);
    buttonNode = ReactDOM.findDOMNode(button);
  }

  afterEach(() => {
    button = null;
    buttonNode = null;
  });

  test('Default Button', () => {
    mount(<Button>OK</Button>);

    expect(buttonNode.className).toContain('zent-btn');
    expect(buttonNode.textContent).toBe('OK');
    expect(buttonNode.tagName.toLowerCase()).toBe('button');
  });

  test('Primary Button', () => {
    mount(<Button type="primary" />);
    expect(buttonNode.classList.contains('zent-btn-primary')).toBe(true);

    mount(<Button type="primary" outline />);
    expect(buttonNode.classList.contains('zent-btn-primary')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-primary-outline')).toBe(true);
  });

  test('Success Button', () => {
    mount(<Button type="success" />);
    expect(buttonNode.classList.contains('zent-btn-success')).toBe(true);

    mount(<Button type="success" outline />);
    expect(buttonNode.classList.contains('zent-btn-success')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-success-outline')).toBe(true);
  });

  test('Danger Button', () => {
    mount(<Button type="danger" />);
    expect(buttonNode.classList.contains('zent-btn-danger')).toBe(true);

    mount(<Button type="danger" outline />);
    expect(buttonNode.classList.contains('zent-btn-danger')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-danger-outline')).toBe(true);
  });

  test('Transparent Border Button', () => {
    mount(<Button bordered={false} />);

    expect(buttonNode.className).toContain('zent-btn-border-transparent');
  })

  test('Large Button', () => {
    mount(<Button size="large" />);

    expect(buttonNode.className).toContain('zent-btn-large');
  });

  test('Small Button', () => {
    mount(<Button size="small" />);

    expect(buttonNode.className).toContain('zent-btn-small');
  });

  test('Custom ClassName', () => {
    mount(<Button className="custom-btn" />);

    expect(buttonNode.className).toContain('zent-btn');
    expect(buttonNode.className).toContain('custom-btn');
  });

  test('Block Button', () => {
    mount(<Button block />);

    expect(buttonNode.className).toContain('zent-btn-block');
  });

  test('Prefix', () => {
    mount(<Button prefix="custom" />);

    expect(buttonNode.classList.contains('zent-btn')).toBe(false);
    expect(buttonNode.classList.contains('custom-btn')).toBe(true);

  });

  test('Link Button', () => {
    mount(<Button href="http://youzan.com/" target="_blank" />);

    expect(buttonNode.tagName.toLowerCase()).toBe('a');
    expect(buttonNode.href).toBe('http://youzan.com/');
    expect(buttonNode.target).toBe('_blank');
  });

  test('onClick', () => {
    let isClicked = false;
    mount(<Button onClick={() => { isClicked = true }} />);

    TestUtils.Simulate.click(buttonNode);
    expect(isClicked).toBe(true);
  });

  test('Disabled Button', () => {
    let isClicked = false;
    mount(<Button disabled onClick={() => { isClicked = true  }} />);

    expect(buttonNode.disabled).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(true);
    TestUtils.Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });

  test('Disabled Link Button', () => {
    let isClicked = false;
    mount(<Button disabled href="http://youzan.com/" onClick={() => { isClicked = true  }} />);

    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(true);
    expect(buttonNode.href).toBe('');
    TestUtils.Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });

  test('Loading Button', () => {
    let isClicked = false;
    mount(<Button loading onClick={() => { isClicked = true  }} />);

    expect(buttonNode.disabled).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-loading')).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(false);
    TestUtils.Simulate.click(buttonNode);

    expect(isClicked).toBe(false);
  });

  test('Loading Link Button', () => {
    let isClicked = false;
    mount(<Button href="http://youzan.com/" loading onClick={() => { isClicked = true  }} />);

    expect(buttonNode.classList.contains('zent-btn-loading')).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(false);
    expect(buttonNode.href).toBe('');
    TestUtils.Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });
});
