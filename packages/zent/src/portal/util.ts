import { SCROLLBAR_WIDTH } from '../utils/getScrollbarWidth';

export function getNodeFromSelector(selector: string | Element): Element {
  const node =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node || document.body;
}

export function createContainerNode(parent: Node, tag = 'div') {
  const div = document.createElement(tag);
  return parent.appendChild(div);
}

export function removeNodeFromDOMTree(node: Node) {
  const { parentNode } = node;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}

export function isDescendant(parent: Node, child: Node) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
}

export function removeAllChildren(node: Node) {
  while (node && node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function hasScrollbarY(element: Element) {
  if (!SCROLLBAR_WIDTH) {
    return false;
  }
  if (element === document.body) {
    return element.scrollHeight > window.innerHeight;
  }
  return element.scrollHeight > element.clientHeight;
}
