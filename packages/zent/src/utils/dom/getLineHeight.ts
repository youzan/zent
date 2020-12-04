/**
 * Adapted from https://github.com/twolfson/line-height/blob/master/lib/line-height.js
 */
import createElement from './createElement';

export function getLineHeight(node: HTMLElement, chars = '&nbsp;'): number {
  // Grab the line-height via style
  let lnHeightStr = computedStyle(node, 'line-height');
  let lnHeight = parseFloat(lnHeightStr);

  // If the lineHeight did not contain a unit (i.e. it was numeric), convert it to ems (e.g. '2.3' === '2.3em')
  if (lnHeightStr === lnHeight + '') {
    // Save the old lineHeight style and update the em unit to the element
    const lnHeightStyle = node.style.lineHeight;
    node.style.lineHeight = lnHeightStr + 'em';

    // Calculate the em based height
    lnHeightStr = computedStyle(node, 'line-height');
    lnHeight = parseFloat(lnHeightStr);

    // Revert the lineHeight style
    if (lnHeightStyle) {
      node.style.lineHeight = lnHeightStyle;
    } else {
      delete node.style.lineHeight;
    }
  }

  // If the lineHeight is in `pt`, convert it to pixels (4px for 3pt)
  // DEV: `em` units are converted to `pt` in IE6
  // Conversion ratio from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  if (lnHeightStr.indexOf('pt') !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
    // Otherwise, if the lineHeight is in `mm`, convert it to pixels (96px for 25.4mm)
  } else if (lnHeightStr.indexOf('mm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 25.4;
    // Otherwise, if the lineHeight is in `cm`, convert it to pixels (96px for 2.54cm)
  } else if (lnHeightStr.indexOf('cm') !== -1) {
    lnHeight *= 96;
    lnHeight /= 2.54;
    // Otherwise, if the lineHeight is in `in`, convert it to pixels (96px for 1in)
  } else if (lnHeightStr.indexOf('in') !== -1) {
    lnHeight *= 96;
    // Otherwise, if the lineHeight is in `pc`, convert it to pixels (12pt for 1pc)
  } else if (lnHeightStr.indexOf('pc') !== -1) {
    lnHeight *= 16;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === 'normal') {
    // Create a temporary node
    const nodeName = node.nodeName;
    const offScreenNode = createElement(nodeName);
    offScreenNode.innerHTML = `<span>${chars}</span>`;

    // If we have a text area, reset it to only 1 row
    // https://github.com/twolfson/line-height/issues/4
    if (nodeName.toUpperCase() === 'TEXTAREA') {
      offScreenNode.setAttribute('rows', '1');
    }

    // Set the font-size of the element
    const fontSizeStr = computedStyle(node, 'font-size');
    const { style } = offScreenNode;
    style.fontSize = fontSizeStr;

    // Remove default padding/border which can affect offset height
    // https://github.com/twolfson/line-height/issues/4
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    style.padding = '0px';
    style.border = '0px';

    style.color = 'transparent';
    style.background = 'transparent';
    style.position = 'absolute';
    style.top = '-10000px';
    style.left = '-10000px';

    // Append it to the body
    const body = document.body;
    body.appendChild(offScreenNode);

    // Assume the line height of the element is the height
    const height = offScreenNode.offsetHeight;
    lnHeight = height;

    // Remove our child from the DOM
    body.removeChild(offScreenNode);
  }

  // Return the calculated height
  return lnHeight;
}

function computedStyle(el: Element, prop: string) {
  const style = getComputedStyle(el);
  return style.getPropertyValue(prop);
}
