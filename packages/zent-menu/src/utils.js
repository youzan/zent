import { Trigger } from 'zent-popover';

const { Hover } = Trigger;

export class MultiHover extends Hover {
  isOutSide = (node) => {
    const { getTriggerNode, isOutside } = this.props;

    if (isOutside && isOutside(node)) {
      return true;
    }

    const triggerNode = getTriggerNode();
    const popoverNodes = [].slice.call(document.querySelectorAll('.zent-multihover-popover'));

    if (popoverNodes && popoverNodes.some(popover => popover.contains(node)) || triggerNode && triggerNode.contains(node)) {
      return false;
    }

    return true;
  }
};

export function getKeyFromChildrenIndex(child, index) {
  return child.key || `item_${index}`;
};
