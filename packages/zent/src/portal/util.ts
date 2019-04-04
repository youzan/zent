export function getNodeFromSelector(
  selector: string | Element
): Element | null {
  const node =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node;
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
