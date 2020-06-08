import { unboxDOMNode } from '../alcatraz';

/** 判断是否为同一个 DOM 节点 */
function isSameNode(a: Node, b: Node) {
  return unboxDOMNode(a) === unboxDOMNode(b);
}

export default isSameNode;
