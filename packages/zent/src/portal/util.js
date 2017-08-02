import cx from 'classnames';
import { Children } from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

function createContainerNode(parent) {
  const div = document.createElement('div');
  return parent.appendChild(div);
}

function removeNodeFromDOMTree(node) {
  const { parentNode } = node;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}

export function getNodeFromSelector(selector) {
  const node =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node || document.body;
}

export function prepareNode(node, prefix, className, css) {
  node.className = cx(`${prefix}-portal`, className);
  node.style.cssText = Object.keys(css || {})
    .map(k => `${k}: ${css[k]}`)
    .join('; ');
}

export function openPortal(props) {
  props = props || this.props;

  // 确保container存在，这个container是必须的，因为React的render会覆盖这个节点下的所有东西。
  let node = this.node;
  if (!node) {
    const { selector, prefix, className, css } = props;
    const parentNode = getNodeFromSelector(selector);
    this.node = node = createContainerNode(parentNode);
    prepareNode(node, prefix, className, css);
  }

  // 这个API虽然是unstable，但是现在实现portal只能用它，如果用ReactDOM.render会导致
  // context失效。
  const { children } = props;
  ReactDOM.unstable_renderSubtreeIntoContainer(
    this,
    Children.only(children),
    node
  );
}

export function destroyPortal(callback) {
  const node = this.node;
  if (node) {
    // React不支持在event handler中unmount组件，会引起问题。Portal的使用场景很容易出现
    // 这种情况，比如在portal内部按了关闭按钮关掉portal。setTimeout的作用是把unmount放到下一个tick
    // 中去做。
    //
    // Invariant Violation: React DOM tree root should always have a node reference.
    // https://github.com/facebook/react/issues/2605
    // https://github.com/facebook/react/issues/3298
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(node);
      removeNodeFromDOMTree(node);
      this.node = undefined;

      isFunction(callback) && callback();
    }, 0);
  }
}
