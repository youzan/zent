import { unboxDOMNode } from '../alcatraz';

function contains(parent: Node, child: Node) {
  const unboxedParent = unboxDOMNode(parent);
  const unboxedChild = unboxDOMNode(child);
  return unboxedParent.contains(unboxedChild);
}

export default contains;
