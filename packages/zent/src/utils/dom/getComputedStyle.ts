import { unboxDOMNode } from '../alcatraz';

function getComputedStyle(
  el: Element,
  pseudoElt?: string
): CSSStyleDeclaration {
  el = unboxDOMNode(el);
  const styleDeclaration = window.getComputedStyle(el, pseudoElt);
  return styleDeclaration;
}

export default getComputedStyle;
