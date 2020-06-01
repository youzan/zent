import { unbox } from '../alcatraz';

function getComputedStyle(
  el: Element,
  pseudoElt?: string
): CSSStyleDeclaration {
  el = unbox(el);
  if (window.getComputedStyle) {
    const styleDeclaration = window.getComputedStyle(el, pseudoElt);
    return styleDeclaration;
  } else {
    // currentStyle for IE < 9
    return (el as any).currentStyle;
  }
}

export default getComputedStyle;
