import { addEventListener } from '../component/event-handler';
import isBrowser from '../isBrowser';

function getWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth);
}
function getHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight);
}

let viewportHeight = 0;
let viewportWidth = 0;
if (isBrowser) {
  viewportHeight = getHeight();
  viewportWidth = getWidth();

  addEventListener(
    window,
    'resize',
    () => {
      viewportHeight = getHeight();
      viewportWidth = getWidth();
    },
    { passive: true }
  );
}
export function getViewportHeight() {
  return viewportHeight;
}
export function getViewportWidth() {
  return viewportWidth;
}

/**
 * 获取viewport的宽高
 */
export function getViewportSize() {
  return {
    width: viewportWidth,
    height: viewportHeight,
  };
}

export default getViewportSize;
