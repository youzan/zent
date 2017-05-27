/**
 * DOM utility functions.
 *
 * These are rarely needed in React, it provides basic DOM manipulation functionalities without resort to jQuery/Zepto.
 */

export { default as findPositionedParent } from './findPositionedParent';
export { default as getViewportSize } from './getViewportSize';
/**
 * 下面这些有需要的话可以按每个函数一个文件放到当前目录下，在index.js里重新导出即可。
 *
 * 现在没有地方用，所以都注释掉了。
 */

// export function hasClass(el, className) {
//   if (el.classList) {
//     return el.classList.contains(className);
//   }
//   return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
// }

// export function removeClass(el, className) {
//   if (hasClass(el, className)) {
//     if (el.classList) {
//       el.classList.remove(className);
//     } else {
//       el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
//     }
//   }
// }

// export function addClass(el, className) {
//   if (!hasClass(el, className)) {
//     if (el.classList) {
//       el.classList.add(className);
//     } else {
//       el.className += ` ${className}`;
//     }
//   }
// }

// export function toggleClass(el, className) {
//   if (hasClass(el, className)) {
//     removeClass(el, className);
//   } else {
//     addClass(el, className);
//   }
// }

// export function text(el, textContent) {
//   // get
//   if (textContent === undefined) {
//     return el.textContent || el.innerText;
//   }

//   // set
//   if (el.textContent !== undefined) {
//     el.textContent = textContent;
//   } else {
//     el.innerText = textContent;
//   }
// }

// export function each(elList, fn) {
//   if (elList) {
//     for (let i = 0; i < elList.length; i++) {
//       fn(elList[i], i);
//     }
//   }
// }

// export function fromString(str) {
//   const div = document.createElement('div');
//   div.innerHTML = str;
//   const children = div.children;
//   return children.length > 1 ? children : children[0];
// }

// export function remove(elem) {
//   if (!elem) {
//     return;
//   }

//   const parent = elem.parentNode;
//   if (parent) {
//     parent.removeChild(elem);
//   }
// }

// export function scrollIntoViewIfNeeded(node, { alignTop = true } = {}) {
//   const { top, bottom } = node.getBoundingClientRect();
//   const inView = alignTop ? (top >= 0) : (bottom <= document.documentElement.clientHeight);
//   if (!inView) {
//     node.scrollIntoView(alignTop);
//   }
// }

// export function getScrollOffset() {
//   // http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
//   const doc = document.documentElement;
//   return {
//     x: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
//     y: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
//   };
// }
