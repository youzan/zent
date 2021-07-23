import { Component } from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate,
} from 'react-dom/test-utils';

import { Button, ButtonGroup, ButtonDirective } from '../src/button';
import Icon from '../src/icon';

class Wrapper extends Component {
  render() {
    return this.props.children;
  }
}

describe('<Button />', () => {
  test('Default Button', () => {
    const tree = renderIntoDocument(<Button>OK</Button>);
    const a = findRenderedDOMComponentWithTag(tree, 'button');
    expect(a.classList).toContain('zent-btn');
    expect(a.textContent).toBe('OK');
  });

  test('Primary Button', () => {
    const tree = renderIntoDocument(<Button type="primary" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');

    expect(buttonNode.classList.contains('zent-btn-primary')).toBe(true);
  });

  test('Primary Button Outline', () => {
    const tree = renderIntoDocument(<Button type="primary" outline />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.classList.contains('zent-btn-primary')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-primary-outline')).toBe(
      true
    );
  });

  test('Success Button', () => {
    const tree = renderIntoDocument(<Button type="success" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.classList.contains('zent-btn-success')).toBe(true);
  });

  test('Success Button Outline', () => {
    const tree = renderIntoDocument(<Button type="success" outline />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.classList.contains('zent-btn-success')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-success-outline')).toBe(
      true
    );
  });

  test('Danger Button', () => {
    const tree = renderIntoDocument(<Button type="danger" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.classList.contains('zent-btn-danger')).toBe(true);
  });

  test('Danger Button Outline', () => {
    const tree = renderIntoDocument(<Button type="danger" outline />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.classList.contains('zent-btn-danger')).toBe(false);
    expect(buttonNode.classList.contains('zent-btn-danger-outline')).toBe(true);
  });

  test('Transparent Border Button', () => {
    const tree = renderIntoDocument(<Button bordered={false} />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.className).toContain('zent-btn-border-transparent');
  });

  test('Large Button', () => {
    const tree = renderIntoDocument(<Button size="large" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.className).toContain('zent-btn-large');
  });

  test('Small Button', () => {
    const tree = renderIntoDocument(<Button size="small" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.className).toContain('zent-btn-small');
  });

  test('Custom ClassName', () => {
    const tree = renderIntoDocument(<Button className="custom-btn" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.className).toContain('zent-btn');
    expect(buttonNode.className).toContain('custom-btn');
  });

  test('Block Button', () => {
    const tree = renderIntoDocument(<Button block />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.className).toContain('zent-btn-block');
  });

  test('Link Button', () => {
    const tree = renderIntoDocument(
      <Button href="http://youzan.com/" target="_blank" />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'a');
    expect(buttonNode.href).toBe('http://youzan.com/');
    expect(buttonNode.target).toBe('_blank');
  });

  test('Button target', () => {
    const tree = renderIntoDocument(<Button target="_blank" />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'a');
    expect(buttonNode.href).toBe(window.location.href);
    expect(buttonNode.target).toBe('_blank');
  });

  test('onClick', () => {
    let isClicked = false;
    const tree = renderIntoDocument(
      <Button
        onClick={() => {
          isClicked = true;
        }}
      />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    Simulate.click(buttonNode);
    expect(isClicked).toBe(true);
  });

  test('Disabled Button', () => {
    let isClicked = false;
    const tree = renderIntoDocument(
      <Button
        disabled
        onClick={() => {
          isClicked = true;
        }}
      />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.disabled).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(true);
    Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });

  test('Disabled Link Button', () => {
    let isClicked = false;
    const tree = renderIntoDocument(
      <Button
        disabled
        href="http://youzan.com/"
        onClick={() => {
          isClicked = true;
        }}
      />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'a');
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(true);
    /** call event.preventDefault within `onClick` callback */
    expect(buttonNode.href).toBe('http://youzan.com/');
    Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });

  test('Loading Button', () => {
    let isClicked = false;
    const tree = renderIntoDocument(
      <Button
        loading
        onClick={() => {
          isClicked = true;
        }}
      />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.disabled).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-loading')).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(false);
    Simulate.click(buttonNode);

    expect(isClicked).toBe(false);
  });

  test('Loading Link Button', () => {
    let isClicked = false;
    const tree = renderIntoDocument(
      <Button
        href="http://youzan.com/"
        loading
        onClick={() => {
          isClicked = true;
        }}
      />
    );
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'a');
    expect(buttonNode.classList.contains('zent-btn-loading')).toBe(true);
    expect(buttonNode.classList.contains('zent-btn-disabled')).toBe(false);
    /** call event.preventDefault within `onClick` callback */
    expect(buttonNode.href).toBe('http://youzan.com/');
    Simulate.click(buttonNode);
    expect(isClicked).toBe(false);
  });

  test('Button htmlType', () => {
    {
      const tree = renderIntoDocument(<Button />);
      const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
      expect(buttonNode.type).toBe('button');
    }

    {
      const tree = renderIntoDocument(<Button htmlType="submit" />);
      const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
      expect(buttonNode.type).toBe('submit');
    }

    {
      const tree = renderIntoDocument(<Button htmlType="reset" />);
      const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
      expect(buttonNode.type).toBe('reset');
    }

    {
      const tree = renderIntoDocument(<Button htmlType="button" />);
      const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
      expect(buttonNode.type).toBe('button');
    }

    {
      const tree = renderIntoDocument(<Button htmlType={null} />);
      const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
      expect(buttonNode.type).toBe('submit');
    }
  });

  test('Custom inline style', () => {
    const tree = renderIntoDocument(<Button style={{ fontSize: '20px' }} />);
    const buttonNode = findRenderedDOMComponentWithTag(tree, 'button');
    expect(buttonNode.style.fontSize).toBe('20px');
  });

  test('Directive', () => {
    function MyLink({ to, children, ...rest }) {
      return (
        <a href={`/#${to}`} {...rest}>
          {children}
        </a>
      );
    }
    const tree = renderIntoDocument(
      <Wrapper>
        <ButtonDirective>
          <MyLink to="/path" />
        </ButtonDirective>
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'a');
    expect(node.href).toBe(`${window.location.origin}/#/path`);
    expect(node.classList.contains('zent-btn')).toBe(true);
  });

  test('Link with additional props', () => {
    const tree = renderIntoDocument(
      <Button href="http://www.youzan.com" download="foobar" />
    );
    const node = findRenderedDOMComponentWithTag(tree, 'a');
    expect(node.download).toBe('foobar');
  });

  test('with icon props', () => {
    const tree = renderIntoDocument(<Button icon="check" />);
    const node = findRenderedDOMComponentWithTag(tree, 'i');
    expect(node.className).toBe('zenticon zenticon-check');
  });

  test('placing an Icon component within the Button', () => {
    const tree = renderIntoDocument(
      <Button>
        <Icon type="check" />
        Check
      </Button>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'i');
    const button = findRenderedDOMComponentWithTag(tree, 'button');
    expect(node.className).toBe('zenticon zenticon-check');
    expect(button.childNodes[1].textContent).toBe('Check');
  });
});

describe('<ButtonGroup />', () => {
  test('Default ButtonGroup', () => {
    const tree = renderIntoDocument(
      <Wrapper>
        <ButtonGroup />
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'div');
    expect(node.classList.contains('zent-btn-group')).toBe(true);
  });

  test('Custom ClassName', () => {
    const tree = renderIntoDocument(
      <Wrapper>
        <ButtonGroup className="custom-group" />
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'div');
    expect(node.classList.contains('custom-group')).toBe(true);
  });

  test('Custom inline style', () => {
    const tree = renderIntoDocument(
      <Wrapper>
        <ButtonGroup style={{ fontSize: '20px' }} />
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'div');
    expect(node.style.fontSize).toBe('20px');
  });
});
