import getScrollPosition from './getScollPosition';

/**
 * Set focus to `node` without scroll
 */
export default function focusWithoutScroll(node: HTMLElement) {
  if (node) {
    const lastScrollPos = getScrollPosition();
    node.focus();
    window.scroll(lastScrollPos.x, lastScrollPos.y);
  }
}
