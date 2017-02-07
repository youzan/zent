/**
 * DOM utility functions.
 *
 * These are rarely needed in React, it provides basic DOM manipulation functionalities without resort to jQuery/Zepto.
 */

export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

export function removeClass(el, className) {
  if (hasClass(el, className)) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  }
}

export function addClass(el, className) {
  if (!hasClass(el, className)) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ` ${className}`;
    }
  }
}

export function toggleClass(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

export function text(el, textContent) {
  // get
  if (textContent === undefined) {
    return el.textContent || el.innerText;
  }

  // set
  if (el.textContent !== undefined) {
    el.textContent = textContent;
  } else {
    el.innerText = textContent;
  }
}

export function each(elList, fn) {
  if (elList) {
    for (let i = 0; i < elList.length; i++) {
      fn(elList[i], i);
    }
  }
}

export function fromString(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  const children = div.children;
  return children.length > 1 ? children : children[0];
}

export function remove(elem) {
  if (!elem) {
    return;
  }

  const parent = elem.parentNode;
  if (parent) {
    parent.removeChild(elem);
  }
}

export function scrollIntoViewIfNeeded(node, { alignTop = true } = {}) {
  const { top, bottom } = node.getBoundingClientRect();
  const inView = alignTop ? (top >= 0) : (bottom <= document.documentElement.clientHeight);
  if (!inView) {
    node.scrollIntoView(alignTop);
  }
}

export function getScrollOffset() {
  // http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
  const doc = document.documentElement;
  return {
    x: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    y: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
  };
}

export function getViewportSize() {
  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  const doc = document.documentElement;
  return {
    width: Math.max(doc.clientWidth, window.innerWidth || 0),
    height: Math.max(doc.clientHeight, window.innerHeight || 0)
  };
}

/**
 * Find the first positioned ancestor up in the DOM tree.
 *
 * @param {Node} elem   dom element to search from
 * @param {boolean} inclusive   true if elem is considered an ancestor of itself
 *
 * @return {Node} the first positioned ancestor node
 */
export function findPositionedParent(elem, inclusive = false) {
  function isPositioned(node) {
    const cs = getComputedStyle(node);
    const pos = cs.getPropertyValue('position');
    return pos !== 'static';
  }

  if (!elem) {
    return null;
  }

  if (inclusive && isPositioned(elem)) {
    return elem;
  }

  for (let parent = elem.parentElement; parent !== null; parent = parent.parentElement) {
    if (isPositioned(parent)) {
      return parent;
    }
  }

  return document.documentElement;
}
