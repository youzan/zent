import { Component } from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate,
} from 'react-dom/test-utils';

import { Link } from '../src/link';

class Wrapper extends Component {
  render() {
    return this.props.children;
  }
}

describe('Link', () => {
  test('Link', () => {
    const url = 'https://www.youzan.com/404';
    const target = '_blank';
    const tree = renderIntoDocument(
      <Wrapper>
        <Link href={url} target={target} className="my-link">
          link
        </Link>
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'a');
    expect(node.href).toBe(url);
    expect(node.target).toBe(target);
    expect(node.classList.contains('my-link')).toBe(true);
  });

  test('Link disabled', () => {
    const tree = renderIntoDocument(
      <Wrapper>
        <Link href="http://www.youzan.com" disabled>
          link
        </Link>
      </Wrapper>
    );
    const node = findRenderedDOMComponentWithTag(tree, 'a');
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    Simulate.click(node, { preventDefault, stopPropagation });
    expect(stopPropagation.mock.calls.length).toBe(1);
    expect(preventDefault.mock.calls.length).toBe(1);
  });
});
