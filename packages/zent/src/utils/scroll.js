/**
 * Adapted from https://github.com/alicelieutier/smoothScroll
 */

import raf from 'raf';

import isBrowser from './isBrowser';

const SCROLL_TIME = 250;
const w = isBrowser ? window : {};
const d = isBrowser ? document : {};
const originalScroll = w.scroll || w.scrollTo;
const now =
  w.performance && w.performance.now
    ? w.performance.now.bind(w.performance)
    : Date.now;

/**
 * changes scroll position inside an element
 * @method scrollElement
 * @param {Number} x
 * @param {Number} y
 */
function scrollElement(x, y) {
  this.scrollLeft = x;
  this.scrollTop = y;
}

/**
 * returns result of applying ease math function to a number
 * @method ease
 * @param {Number} k
 * @returns {Number}
 */
function ease(k) {
  return 0.5 * (1 - Math.cos(Math.PI * k));
}

/**
 * self invoked function that, given a context, steps through scrolling
 * @method step
 * @param {Object} context
 */
function step(context) {
  const time = now();
  let elapsed = (time - context.startTime) / context.duration;

  // avoid elapsed times higher than one
  elapsed = elapsed > 1 ? 1 : elapsed;

  // apply easing to elapsed time
  const value = ease(elapsed);
  const currentX = context.startX + (context.x - context.startX) * value;
  const currentY = context.startY + (context.y - context.startY) * value;

  context.method.call(context.scrollable, currentX, currentY);

  // scroll more if we have not reached our destination
  if (currentX !== context.x || currentY !== context.y) {
    raf(step.bind(w, context));
  }
}

/**
 * scrolls element with a smooth behavior
 * @method smoothScroll
 * @param {Object|Node} el element to scroll
 * @param {Number} x target position x
 * @param {Number} y target position y
 * @param {Number} duration animation duration
 */
export default function smoothScroll(el, x, y, duration = SCROLL_TIME) {
  if (!isBrowser) {
    return;
  }

  let scrollable;
  let startX;
  let startY;
  let method;
  const startTime = now();

  // define scroll context
  if (el === d.body || el === w) {
    scrollable = w;
    startX = w.scrollX || w.pageXOffset;
    startY = w.scrollY || w.pageYOffset;
    method = originalScroll;
  } else {
    scrollable = el;
    startX = el.scrollLeft;
    startY = el.scrollTop;
    method = scrollElement;
  }

  // scroll looping over a frame
  step({
    duration,
    scrollable,
    method,
    startTime,
    startX,
    startY,
    x,
    y,
  });
}
