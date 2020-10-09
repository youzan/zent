/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Jack Moore
 *
 * A fork of https://github.com/jackmoore/autosize for these reasons:
 *
 * 1. Project has no update since late 2018
 * 2. TypeScript definition is buggy
 */

import { addEventListener } from '../component/event-handler';

interface IMethods {
  update: () => void;
  destroy: () => void;
}

interface IStyles {
  [key: string]: string; // make tsc happy: ts(7053)

  height: string;
  resize: string;
  overflowX: string;
  overflowY: string;
  wordWrap: string;
}

const map = new Map<HTMLTextAreaElement, IMethods>();

const createEvent = (name: string) => new Event(name, { bubbles: true });

function assign(ta: HTMLTextAreaElement) {
  if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

  let heightOffset = NaN;
  let clientWidth = NaN;
  let cachedHeight = NaN;

  function init() {
    const style = window.getComputedStyle(ta, null);

    if (style.resize === 'vertical') {
      ta.style.resize = 'none';
    } else if (style.resize === 'both') {
      ta.style.resize = 'horizontal';
    }

    if (style.boxSizing === 'content-box') {
      heightOffset = -(
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
      );
    } else {
      heightOffset =
        parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    }
    // Fix when a textarea is not on document body and heightOffset is Not a Number
    if (isNaN(heightOffset)) {
      heightOffset = 0;
    }

    update();
  }

  function changeOverflow(value: string) {
    {
      // Chrome/Safari-specific fix:
      // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
      // made available by removing the scrollbar. The following forces the necessary text reflow.
      const width = ta.style.width;
      ta.style.width = '0px';
      // Force reflow:
      /* jshint ignore:start */
      ta.offsetWidth;
      /* jshint ignore:end */
      ta.style.width = width;
    }

    ta.style.overflowY = value;
  }

  function getParentOverflows(el: Element) {
    const arr = [];

    while (el && el.parentNode && el.parentNode instanceof Element) {
      if (el.parentNode.scrollTop) {
        arr.push({
          node: el.parentNode,
          scrollTop: el.parentNode.scrollTop,
        });
      }
      el = el.parentNode;
    }

    return arr;
  }

  function resize() {
    if (ta.scrollHeight === 0) {
      // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
      return;
    }

    const overflows = getParentOverflows(ta);
    const docTop =
      document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

    ta.style.height = '';
    ta.style.height = ta.scrollHeight + heightOffset + 'px';

    // used to check if an update is actually necessary on window.resize
    clientWidth = ta.clientWidth;

    // prevents scroll-position jumping
    overflows.forEach(el => {
      el.node.scrollTop = el.scrollTop;
    });

    if (docTop) {
      document.documentElement.scrollTop = docTop;
    }
  }

  function update() {
    resize();

    const styleHeight = Math.round(parseFloat(ta.style.height));
    const computed = window.getComputedStyle(ta, null);

    // Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
    let actualHeight =
      computed.boxSizing === 'content-box'
        ? Math.round(parseFloat(computed.height))
        : ta.offsetHeight;

    // The actual height not matching the style height (set via the resize method) indicates that
    // the max-height has been exceeded, in which case the overflow should be allowed.
    if (actualHeight < styleHeight) {
      if (computed.overflowY === 'hidden') {
        changeOverflow('scroll');
        resize();
        actualHeight =
          computed.boxSizing === 'content-box'
            ? Math.round(parseFloat(window.getComputedStyle(ta, null).height))
            : ta.offsetHeight;
      }
    } else {
      // Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
      if (computed.overflowY !== 'hidden') {
        changeOverflow('hidden');
        resize();
        actualHeight =
          computed.boxSizing === 'content-box'
            ? Math.round(parseFloat(window.getComputedStyle(ta, null).height))
            : ta.offsetHeight;
      }
    }

    if (cachedHeight !== actualHeight) {
      cachedHeight = actualHeight;
      const evt = createEvent('autosize:resized');
      try {
        ta.dispatchEvent(evt);
      } catch (err) {
        // Firefox will throw an error on dispatchEvent for a detached element
        // https://bugzilla.mozilla.org/show_bug.cgi?id=889376
      }
    }
  }

  const pageResize = () => {
    if (ta.clientWidth !== clientWidth) {
      update();
    }
  };

  const eventCancelList: Array<() => void> = [];

  const destroy = ((style: IStyles) => {
    eventCancelList.forEach(unsubscribe => unsubscribe());
    eventCancelList.splice(0, eventCancelList.length);

    Object.keys(style).forEach(key => {
      ((ta.style as unknown) as { [key: string]: string })[key] = style[key];
    });

    map.delete(ta);
  }).bind(ta, {
    height: ta.style.height,
    resize: ta.style.resize,
    overflowY: ta.style.overflowY,
    overflowX: ta.style.overflowX,
    wordWrap: ta.style.wordWrap,
  });

  eventCancelList.push(addEventListener(ta, 'autosize:destroy', destroy));

  // IE9 does not fire onpropertychange or oninput for deletions,
  // so binding to onkeyup to catch most of those events.
  // There is no way that I know of to detect something like 'cut' in IE9.
  if ('onpropertychange' in ta && 'oninput' in ta) {
    eventCancelList.push(addEventListener(ta, 'keyup', update));
  }

  eventCancelList.push(addEventListener(window, 'resize', pageResize));
  eventCancelList.push(addEventListener(ta, 'input', update));
  eventCancelList.push(addEventListener(ta, 'autosize:update', update));
  ta.style.overflowX = 'hidden';
  ta.style.wordWrap = 'break-word';

  map.set(ta, {
    destroy,
    update,
  });

  init();
}

function _destroy(ta: HTMLTextAreaElement) {
  const methods = map.get(ta);
  if (methods) {
    methods.destroy();
  }
}

function _update(ta: HTMLTextAreaElement) {
  const methods = map.get(ta);
  if (methods) {
    methods.update();
  }
}

function isNodeList(
  el: HTMLTextAreaElement | NodeListOf<HTMLTextAreaElement>
): el is NodeListOf<HTMLTextAreaElement> {
  return 'length' in el;
}

export function autosize(el: HTMLTextAreaElement): HTMLTextAreaElement;
export function autosize(
  el: NodeListOf<HTMLTextAreaElement>
): NodeListOf<HTMLTextAreaElement>;
export function autosize(
  el: HTMLTextAreaElement | NodeListOf<HTMLTextAreaElement>
) {
  if (el) {
    Array.prototype.forEach.call(isNodeList(el) ? el : [el], x => assign(x));
  }
  return el;
}

export function destroy(el: HTMLTextAreaElement): HTMLTextAreaElement;
export function destroy(
  el: NodeListOf<HTMLTextAreaElement>
): NodeListOf<HTMLTextAreaElement>;
export function destroy(
  el: HTMLTextAreaElement | NodeListOf<HTMLTextAreaElement>
) {
  if (el) {
    Array.prototype.forEach.call(isNodeList(el) ? el : [el], _destroy);
  }
  return el;
}

export function update(el: HTMLTextAreaElement): HTMLTextAreaElement;
export function update(
  el: NodeListOf<HTMLTextAreaElement>
): NodeListOf<HTMLTextAreaElement>;
export function update(
  el: HTMLTextAreaElement | NodeListOf<HTMLTextAreaElement>
) {
  if (el) {
    Array.prototype.forEach.call(isNodeList(el) ? el : [el], _update);
  }
  return el;
}
