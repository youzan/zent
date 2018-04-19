export function getNodeFromSelector(selector) {
  const node =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node || document.body;
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
