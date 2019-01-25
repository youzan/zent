import isString from 'lodash/isString';

export function getNodeFromSelector(selector) {
  const node =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node || document.body;
}

export function getDOMNode(container, selector) {
  if (container) {
    return container;
  }

  // selector 是老的 API，不再支持字符串形式的 selector
  if (isString(selector)) {
    return document.body;
  }

  if (selector) {
    return selector;
  }

  return document.body;
}

export function createContainerNode(parent, tag = 'div') {
  const div = document.createElement(tag);
  return parent.appendChild(div);
}

export function removeNodeFromDOMTree(node) {
  const { parentNode } = node;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}

export function isDescendant(parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
}
