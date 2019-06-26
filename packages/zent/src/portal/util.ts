export function getNodeFromSelector(selector: string | Element): Element {
  if (selector instanceof Element) {
    return selector;
  }
  if (typeof selector === 'string') {
    const node = document.querySelector(selector);
    if (node) {
      return node;
    }
  }
  throw new Error('Invalid selector');
}

export function createContainerNode(parent: Node, tag = 'div') {
  const div = document.createElement(tag);
  return parent.appendChild(div);
}

export function removeAllChildren(node: Node) {
  while (node && node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function hasScrollbarY(element: Element) {
  if (element === document.body) {
    return element.scrollHeight > window.innerHeight;
  }
  return element.scrollHeight > element.clientHeight;
}
